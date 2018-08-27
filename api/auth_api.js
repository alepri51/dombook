'use strict';

const generate = require('nanoid/generate');
const uaParser = require('ua-parser-js');

const { API } = require('./base_api');
const db = require('../db');
let { User, Account } = db;

class SignIn extends API {
    constructor(...args) {
        super(...args);
    }

    async submit({email, password}) {

    }
}

class SignOut extends API {
    constructor(...args) {
        super(...args);
    }

    async submit({email, password}) {

    }
}

class SignUp extends API {
    constructor(...args) {
        super(...args);
    }

    async submit(params) {
        //let users = await User.find();
        let users = await User.find().populate('account');
        let accounts = await Account.find();
        await Account.deleteMany();

        let user = await User.findOne({ _id: this.payload.id });

        let { email, password } = params;
        let { private_key, public_key } = await this.keys();

        let account = new Account({
            email,
            hash: this.hash(email + ':' + password),
            private_key, 
            public_key
        });

        user.account = account;

        await user.save();
        await account.save();

        this.payload = user.projection();
        this.payload.key = account.public_key;
        this.payload.email = account.email;

        this.token = this.signJWT(this.payload, account.private_key);
    }

    async silent(params, req, res) {
        //create silent user
        //generate token
        let users = await User.find();

        await User.deleteMany();

        let ua = uaParser(req.headers['user-agent']);

        let user = new User({
            name: req.ip + ':' + req.headers['user-agent']
        });

        await user.save();

        user = user.projection();
        user.insecure = true;
        user.key = generate('abcdefghijklmnopqrstuvwxyz', 10);

        this.token = this.signJWT(user, user.key, {});

        console.log(params);
    }
}

module.exports = { SignIn, SignOut, SignUp };