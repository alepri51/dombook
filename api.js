'use strict'

const db = require('./models');
const { Unknown } = require('./api/base_api');
const auth = require('./api/auth_api');
const project = require('./api/project_api');
//const { SignIn, SignOut, SignUp } = require('./api/auth_api');

let classes = {
    ...auth,
    ...db,
    ...project,
    Unknown
}

module.exports = Object.entries(classes).reduce((memo, item) => {
    memo[item[0].toLowerCase()] = item[1];
    return memo;
}, {});
