const { SecuredAPI } = require('./base_api');
const db = require('../db');
let { User } = db;

class Model extends SecuredAPI {
    constructor(...args) {
        super(...args);
    }

    onExecuted(name, result) {
        let method = this[name];
        console.log(method, result);
    }

    
}

class Home extends Model {
    constructor(...args) {
        super(...args);
    }

    selfFunc() {

    }

    default() {
        console.log('HOME DEFAULT');
    }
}

module.exports = { Home };