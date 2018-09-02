'use strict';

const { normalize } = require('../models');
const { Model, DBAccess } = require('./db_api');
const { API, SecuredAPI } = require('./base_api');
const db = require('../models');


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