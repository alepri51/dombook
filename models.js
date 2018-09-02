'use strict'

const crypto = require('crypto2');
const bcrypt = require('bcryptjs');
const generate = require('nanoid/generate');

let hash = value => {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(value, salt);
}

const mongoose = require('mongoose');
const { Schema, Model } = mongoose;

const mongo_port = 32771;
//const mongo_port = 32774;

mongoose.connect(`mongodb://localhost:${mongo_port}/myapp`, {
    useNewUrlParser: true
});

//////////////////////////MODELS//////////////////////////////////////

Model.prototype.projection = function() {
    let { _id, __v, ...keys } = this.schema.paths;

    let projection = Object.keys(keys).reduce((memo, key) => {
        this[key] && !(keys[key] instanceof Schema.Types.ObjectId) && !(keys[key] instanceof Schema.Types.Embedded) && (memo[key] = this[key]);
        return memo;
    }, {});

    projection.id = this.id;
    
    return projection;
};

let User = mongoose.model('User', new Schema({ 
    name: {
        type: String,
        select: true
    },
    account: new Schema({
        hash: String,
        email: String,
        private_key: String,
        public_key: String
    })
}));

//////////////////////////MODELS//////////////////////////////////////
const normalizer = require('normalizr');

let normalize = function normalize(data = {}) {
    if(Object.keys(data).length) {
        data.api = data.api || 'v1';
        const schema = normalizer.schema;

        const _reply = new schema.Entity('reply', {});

        const _questionnaire = new schema.Entity('questionnaire', {
            replies: [_reply]
        });

        _reply.define({ questionnaire: [_questionnaire] });

        const _account = new schema.Entity('account', {});

        const _user = new schema.Entity('user', {
            account: _account
        });

        const _filter = new schema.Entity('filter', {});

        const _home = new schema.Entity('home', {
            filters: [_filter]
        });

        const db = new schema.Entity('database', {
            user: _user,
            questionnaire: [_questionnaire],
            //account: _member,
            //auth: _auth,
            //error: _error,
            //defaults: {_defaults}
           home: _home
        }, { 
            idAttribute: 'api'
        });

        let normalized = normalizer.normalize(data, db);
        normalized = { ...normalized, entry: 'database' };

        return normalized;
    }
    else return data;
}

//////////////////////////MODELS//////////////////////////////////////

async function getAccountPrivateKey(id) {
    let member = await User.findOne({ _id: id });
    
    return member && member.account.private_key;
}

//////////////////////////MODELS//////////////////////////////////////

(async () => { //DB INIT IF NEEDED
    

})();

module.exports = {
    getAccountPrivateKey,
    normalize,
    User
}
