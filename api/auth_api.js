'use strict';

const { API } = require('./base_api');

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

    async submit({ name, email, password, referer, wallet_address }) {
        
    }
}

module.exports = { SignIn, SignOut, SignUp };