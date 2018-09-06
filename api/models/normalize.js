'use strict';

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

        const _lot = new schema.Entity('lot', {
        });

        const _building = new schema.Entity('list', {
            lots: [_lot]
        });

        const db = new schema.Entity('database', {
            user: _user,
            questionnaire: [_questionnaire],
            //account: _member,
            //auth: _auth,
            //error: _error,
            //defaults: {_defaults}
           home: _home,
           buildings: [_building]
        }, { 
            idAttribute: 'api'
        });

        let normalized = normalizer.normalize(data, db);
        normalized = { ...normalized, entry: 'database' };

        return normalized;
    }
    else return data;
}

module.exports = {
    normalize
}
 