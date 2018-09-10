'use strict';

const { Model, DBAccess } = require('./db_api');
const { API, SecuredAPI } = require('./base_api');
const db = require('./models');


class Home extends Model {
    constructor(...args) {
        super(...args);
    }

    async default(filters) {
        console.log('HOME DEFAULT', filters);

        let match = Object.entries(filters).reduce((memo, entry) => {
            let [key, value] = entry;
            key === 'price' && (memo['price'] = { $gte: value[0], $lte: value[1] });
            key === 'types' && (memo['lot_type.name'] = { $in: Object.entries(value).reduce((memo, entry) => {
                    let [key, value] = entry;

                    memo.push(value.text);
                    return memo;
                }, [])
            });

            return memo;
        }, {});
        
        
        let buildings = await db.Lot.aggregate([
            /* { "$match": { 'price': { $gt: filters.price[0], $lt: filters.price[1] } } }, */
            {
                $lookup: {
                    from: 'filters',
                    localField: 'lot_type',
                    foreignField: '_id',
                    as: 'lot_type'
                }
            },
            { "$match": { ...match } },
            {
                $unwind: '$lot_type'
            },
            {
                $group: {
                    _id: {
                        building: "$building",
                        lot_type: "$lot_type.name",
                        rooms: "$rooms",
                        is_open_plan: "$is_open_plan",
                        is_studio: "$is_studio"
                    },
                    building: { $addToSet: "$building" },
                    lot_type: { $addToSet: "$lot_type.name" },
                    rooms: { $addToSet: "$rooms" },
                    is_open_plan: { $addToSet: "$is_open_plan" },
                    is_studio: { $addToSet: "$is_studio" },

                    count: { $sum: 1 },
                    price_min: { $min: '$price'},
                    price_max: { $max: '$price'},
                    m2_price_min: { $min: '$price_square'},
                    m2_price_max: { $max: '$price_square'},
                    square_min: { $min: '$square'},
                    square_max: { $max: '$square'},
                }
            },
            {
                $lookup: {
                    from: 'buildings',
                    localField: 'building',
                    foreignField: '_id',
                    as: 'building'
                }
            },
            {
                $unwind: '$building'
            },
/*             {
                $project: {
                    _id: 0, name: "$staff.like", count: {$add: [1]}}} */
            {
                $addFields: {

                    'building.statistics.lot_type': "$lot_type",
                    'building.statistics.rooms': "$rooms",
                    'building.statistics.is_open_plan': "$is_open_plan",
                    'building.statistics.is_studio': "$is_studio",

                    'building.statistics.count': '$count',
                    'building.statistics.price_min': '$price_min',
                    'building.statistics.price_max': '$price_max',
                    'building.statistics.m2_price_min': '$m2_price_min',
                    'building.statistics.m2_price_max': '$m2_price_max',
                    'building.statistics.square_min': '$square_min',
                    'building.statistics.square_max': '$square_max'
                }
            },
            {
                $replaceRoot: {
                    newRoot: '$building'
                }
            },
            {
                $lookup: {
                    from: 'organizations',
                    localField: 'builder',
                    foreignField: '_id',
                    as: 'builder'
                }
            },
            {
                $unwind: '$builder'
            },
            {
                $lookup: {
                    from: 'organizations',
                    localField: 'developer',
                    foreignField: '_id',
                    as: 'developer'
                }
            },
            {
                $unwind: '$developer'
            },
            {
                $project: {
                    lots: 0
                }
            }
        ]);

        buildings = buildings.map(building => {
            let stats = building.statistics;
            let type = (stats.lot_type[0] && stats.lot_type[0].toLowerCase()) || 'что это ?';
            let rooms = stats.is_studio[0] ? 'студия' : stats.is_open_plan[0] ? 'СП' : stats.rooms[0] ? stats.rooms[0] + '-комн' : 'помещение';

            let new_stat = {};
            new_stat[type] = {};
            new_stat[type][rooms] = {};
            let stat = new_stat[type][rooms];

            stat.count = stats.count;

            stat.square = {
                min: stats.square_min,
                max: stats.square_max
            }

            stat.price = {
                min: stats.price_min,
                max: stats.price_max
            }

            stat.square_price = {
                min: stats.m2_price_min,
                max: stats.m2_price_max
            }

            building.statistics = new_stat;

            return building;
        });

        return {
            buildings
        }
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