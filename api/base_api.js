'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto2');


const { User } = require('../db');

let KEYS_CACHE = {};

class APIError extends Error {
    constructor(code, message) {
        super();
        this.code = code;
        this.message = message;
    }
}

class API {
    constructor({ token, id, io, req, res }) {

        this.io = io;
        this.token = token;
        this.id = id;

        this.error = void 0;

        token && (this.payload = this.verifyJWT(this.token));
    

        let self = this;

        const handler = {
            get(target, propKey, receiver) {
                const origMethod = target[propKey];
                if(typeof origMethod === 'function') {

                    let method = self.security(propKey, origMethod);
                    
                    return function (...args) {
                        let result = method.apply(self, args);
                        result = self.onExecuted ? self.onExecuted(propKey, result) : result;
                        return result;
                    };
                }
                else return origMethod;
            }
        };

        return new Proxy(this, handler);
    }

    get auth() {
        return this.payload && this.payload.auth;
    }

    get class_name() {
        return this.constructor.name.toLowerCase();
    }

    security(name, method) {
        return method;
    }

    /* generateError({ code, message, data, system }) {
        let error = this.error;
        //data = data || this.error.data;
        this.error = new APIError(code, message);
        this.error.class = this.class_name;
        this.error.data = data;
        this.error.history = this.error.history || [];
        error && this.error.history.push(error);

        this.error.system = system;
    } */

    hash(value) {
        let salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(value, salt);
    }

    async keys() {
        let { privateKey, publicKey } = await crypto.createKeyPair();

        return { private_key: privateKey, public_key: publicKey };
    }

    async createPassword(precision) {
        let salt = bcrypt.genSaltSync(10);
        return await crypto.createPassword(salt, precision || 32);
    }

    signJWT(payload, private_key, options = {algorithm: 'RS256', expiresIn: '10s'}) {
        //console.log('IAT:', payload.iat);
        delete payload.iat;
        delete payload.exp;

        this.payload = payload;
        return jwt.sign(payload, private_key, options);
    }

    verifyJWT(token) {
        let payload = jwt.decode(token);

        try {
            jwt.verify(token, payload.key);

            return payload;
        }
        catch(err) {
            console.log('ERROR:', err);
            //this.revokeJWT();
            this.error = err;
             
            if(err.name === 'TokenExpiredError') {
                this.error.expired = true;
                this.error.system = true;

                payload.auth.signed === 1 ? payload.auth.signed = 2 : payload.auth.signed = 0;
                return payload;
            }
        };
    }

    async refreshJWT() {
        let payload = this.payload;
        if(payload) {
            //REFRESH TOKEN
            let private_key = KEYS_CACHE[payload.id];

            payload.insecure && (private_key = payload.key);

            if(!private_key) {
                let user = await User.findOne({ _id: payload.id });

                private_key = user.account.private_key;
                KEYS_CACHE[payload.id] = private_key;
            }

            this.token = this.signJWT(payload, private_key, payload.insecure ? {} : void 0);
        }
    }

    async revokeJWT() {
        this.token = void 0;
        this.payload = void 0;
    }

    default(params) {
        return { params }
    }
};

class Unknown extends API {
    constructor(...args) {
        super(...args);
    }

    async defaults() {
        return {empty: true}
    }
}

class SecuredAPI extends API {
    constructor(...args) {
        super(...args);

        this.error = void 0;
    }

    checkSecurity(name, method) {
        let authError = function(...args) {
            this.error = {
                code: 403,
                message: 'Отказано в доступе. Возможно Ваша сессия завершилась.'
            };

            //this.generateError({ code: 403, message: 'Отказано в доступе. Возможно Ваша сессия завершилась.', data: { expired: true, class: this.constructor.name }});
        };

        return this.auth.signed !== 1 && authError;
    }

    security(name, method) {
        let exceptions = ['generateError'];
        let except = exceptions.includes(name); //AVOID STACK OVERFLOW DUE RECURSION

        let self = this;
        if(!except) {
            let redirect = this.checkSecurity(name, method);
            method = redirect || method;
        }

        /* if(!except && !this.checkSecurity(name, method)) {
            return function(...args) {
                self.generateError({ code: 403, message: 'Отказано в доступе. Пожалуйста аутентифицируйтесь.', data: { expired: true, class: self.constructor.name }});
            };
        } */

        return method;
    }
}

module.exports = {
    APIError,
    API,
    SecuredAPI,
    Unknown
}