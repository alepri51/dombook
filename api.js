'use strict'

const db = require('./db');
const { Unknown } = require('./api/base_api');
const auth = require('./api/auth_api');
//const { SignIn, SignOut, SignUp } = require('./api/auth_api');

let classes = {
    ...auth,
    ...db,
    Unknown
}

module.exports = Object.entries(classes).reduce((memo, item) => {
    memo[item[0].toLowerCase()] = item[1];
    return memo;
}, {});
