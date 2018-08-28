'use strict';

const normalizer = require('normalizr');

const { SecuredAPI } = require('./base_api');
const db = require('../db');
let { User } = db;

class Model extends SecuredAPI {
    constructor(...args) {
        super(...args);

        this.error = void 0;
    }

    model(data = {}) {
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

    onExecuted(name, result) {
        if(typeof result === 'object' && Object.keys(result).length) {
            return this.model(result);
        }
    }

    
}

class Home extends Model {
    constructor(...args) {
        super(...args);
    }

    default() {
        console.log('HOME DEFAULT');
        return {
            user: {
                id: 1
            },
            home: {
                id: 1,
                hello: 'world',
                filters: [
                    {
                        id: 1,
                        label: 'Бюджет',
                        type: 'money',
                        min: '1000K',
                        max: '100000K',
                        step: '5000K'
                    },
                    {
                        id: 2,
                        label: 'Стоимость м2',
                        type: 'money',
                        min: '1000K',
                        max: '100000K',
                        step: '5000K'
                    },
                    {
                        id: 3,
                        label: 'Локация',
                        type: 'select',
                        enum: ['ЦАО', 'САО', 'СВАО']
                    },
                    {
                        id: 4,
                        label: 'Комнатность',
                        type: 'select',
                        enum: ['СТ+', '1+', '2+', '3+', '4+']
                    }
                ]
            }
        };
    }
}

class Questionnaire extends Model {
    constructor(...args) {
        super(...args);
    }

    default() {
        console.log('HOME DEFAULT');
        return {
            user: {
                id: 1,
                account: {
                    id: 1,
                    email: 'asdasdasd'
                },
            },
            [this.class_name]: [
                {
                    id: 1,
                    question: 'Are you ready ?',
                    replies: [
                        {
                            id: 1,
                            reply: 'yes',
                            [this.class_name]: [
                                {
                                    id: 2,
                                    question: 'Do you like eat ?',
                                    replies: [
                                        {
                                            id: 3,
                                            reply: 'yes',
                                            [this.class_name]: []
                                        },
                                        {
                                            id: 4,
                                            reply: 'no',
                                            [this.class_name]: []
                                        },
                                    ]
                                }
                            ]
                        },
                        {
                            id: 2,
                            reply: 'no',
                            [this.class_name]: []
                        },
                    ]
                }
            ]
        };
    }
}

module.exports = { Home, Questionnaire };