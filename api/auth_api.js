'use strict';

const bcrypt = require('bcryptjs');
const generate = require('nanoid/generate');
const uaParser = require('ua-parser-js');

const { API } = require('./base_api');
const db = require('./models');
let { User } = db;

class SignIn extends API {
    constructor(...args) {
        super(...args);

        this.error = void 0;
    }

    async submit({ email, password }) {
        //await User.deleteMany();
        let users = await User.find();

        let current_user = await User.findOne({ _id: this.payload.id });
        let user = await User.findOne({ 'account.email': email });

        let auth = user && user.account && await bcrypt.compare(`${email}:${password}`, user.account.hash);

        if(auth) {
            !current_user.account && current_user.id !== user.id && await current_user.remove();

            this.payload = user.projection();
            this.payload.key = user.account.public_key;

            this.payload.auth = {
                id: user.id,
                email: user.account.email,
                name: user.name,
                signed: 1
            };
        }
        else {
            this.error = {
                code: 404,
                message: 'Пользователь не найден'
            }
        }
    }
}

class SignOut extends API {
    constructor(...args) {
        super(...args);

        this.error = void 0;
    }

    async submit({ email, password }) {
        this.payload.auth = {
            id: this.payload.auth.id,
            signed: 0
        };
    }
}

class SignUp extends API {
    constructor(...args) {
        super(...args);
    }

    async submit(params, req) {
        let { name, email, password } = params;
        let current_user = await User.findOne({ _id: this.payload.id });

        let user = await User.findOne({ 'account.email': email });

        if(user) {
            this.error = {
                code: 403,
                message: 'Данное имя уже используется. Попробуйте восстановить пароль.'
            }
        }
        else {
            user = !current_user.account ? current_user : new User({});

            let { private_key, public_key } = await this.keys();

            let account = {
                email,
                hash: this.hash(email + ':' + password),
                private_key, 
                public_key
            };

            user.account = account;
            user.name = name;

            await user.save();

            let payload = this.payload;

            payload = user.projection();
            payload.key = account.public_key;

            payload.auth = {
                id: user.id,
                email: account.email,
                name,
                signed: 1
            };

            this.token = this.signJWT(payload, account.private_key);
        }
    }

    async silent(params, req, res) {
        //ПРИДУМАТЬ МЕХАНИЗМ ПО УДАЛЕНИЮ УСТАРЕВШИХ ПОЛЬЗОВАТЕЛЕЙ
        let users = await User.find();

        let ua = uaParser(req.headers['user-agent']);

        let user = new User({
            name: req.ip + ':' + req.headers['user-agent']
        });

        await user.save();

        let payload = this.payload;

        payload = user.projection();
        payload.insecure = true;
        payload.key = generate('abcdefghijklmnopqrstuvwxyz', 10);

        payload.auth = {
            id: user.id,
            signed: 0
        };


        this.token = this.signJWT(payload, payload.key, {});

        console.log(params);
    }
}

module.exports = { SignIn, SignOut, SignUp };