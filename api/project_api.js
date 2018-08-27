'use strict';

const normalizer = require('normalizr');

const { SecuredAPI } = require('./base_api');
const db = require('../db');
let { User } = db;

class Model extends SecuredAPI {
    constructor(...args) {
        super(...args);
    }

    model(data = {}) {
        if(Object.keys(data).length) {
            data.api = data.api || 'v1';
            const Schema = normalizer.schema;

            const db = new schema.Entity('database', {
                //account: _member,
                //auth: _auth,
                //error: _error,
                //defaults: {_defaults}
            }, { 
                idAttribute: 'api'
            });

            let normalized = normalizer.normalize(data, db);
            normalized = { ...normalized, entry: 'database' };

            return normalized;
        }
        else return data;
    }

    onExecuted(name, result) {
        if(typeof result === 'object' && Object.keys(result).length) {
            console.log(name, result);
        }
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
        return {
            hello: 'world'
        };
    }
}

module.exports = { Home };