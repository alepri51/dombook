'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto2');
const generate = require('nanoid/generate');

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

        if(!token) {
            let user = new User({
                name: req.headers['user-agent']
            });

            user = user.projection();
            user.insecure = true;
            user.key = generate('abcdefghijklmnopqrstuvwxyz', 10);

            this.token = this.signJWT(user, user.key, {});
        }
        else this.payload = this.verifyJWT(this.token);
    

        let self = this;

        const handler = {
            get(target, propKey, receiver) {
                const origMethod = target[propKey];
                if(typeof origMethod === 'function') {

                    let method = self.security(propKey, origMethod);
                    
                    return function (...args) {
                        const result = method.apply(self, args);
                        return result;
                    };
                }
                else return origMethod;
            }
        };

        return new Proxy(this, handler);
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

    async createPassword(precision) {
        let salt = bcrypt.genSaltSync(10);
        return await crypto.createPassword(salt, precision || 32);
    }

    async generateJWT(payload, private_key) {
        //let jwtid = await this.createPassword(32)

        /* let payload = {
            jwtid,
            member: member._id,
            auth: {
                member: member._id,
                email: member.email,
                name: member.name,
                ref: member.ref,
                group: member.group
            },
            key: member.wallet.publicKey
        }; */

        return this.signJWT(payload, private_key);
    }

    signJWT(payload, private_key, options = {algorithm: 'RS256', expiresIn: '1000s'}) {
        delete payload.iat;
        delete payload.exp;

        this.payload = payload;
        return jwt.sign(payload, private_key, options);
    }

    verifyJWT(token) {
        let payload = jwt.decode(token);

        try {
            jwt.verify(token, payload.key);

            //REFRESH TOKEN
            this.token = this.signJWT(payload, private_key);

            return payload;
        }
        catch(err) {
            console.log('ERROR:', err);
            this.revokeJWT(payload.jwtid);
        };
    }

    async revokeJWT(id) {
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

    }

    checkSecurity(name, method) {
        let authError = function(...args) {
            this.generateError({ code: 403, message: 'Отказано в доступе. Возможно Ваша сессия завершилась.', data: { expired: true, class: this.constructor.name }});
        };

        return !this.auth && authError;
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