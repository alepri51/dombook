'use strict';

const { Model, DBAccess } = require('./db_api');
const { API, SecuredAPI } = require('./base_api');
const db = require('./models');


class Home extends Model {
    constructor(...args) {
        super(...args);
    }

    normalize(data = {}) {
        let normalized = super.normalize(data);
        normalized._replace = true;
        return normalized;
    }

    onNormalized(name, data) {
        console.log(name);
    }

    async default(filters) {
        console.log('HOME DEFAULT', filters);

        //let bs = await db.Lot.find({ $and: [{is_studio: true}, { rooms: null }] });

        filters.price = filters.price || [5000000, 10000000];
        
        let match = Object.entries(filters).reduce((memo, entry) => {
            let [key, value] = entry;
            
            if(key === 'rooms') {
                Object.keys(value).forEach(key => {
                    let rooms = key;

                    let arr = [];

                    rooms === '0' && (memo['is_studio'] = true);
                    rooms === '1' && (memo['is_open_plan'] = true);
                    //rooms !== '0' && rooms !== '5' && (memo['rooms_count'] = { $gte: parseInt(rooms) });
                    if(rooms !== '0' && rooms !== '1') {
                        memo['rooms_count'] = { $gte: parseInt(rooms) - 1 }
                    }
                });
            };

            if(key === 'price') {
                let diff = value[1] - value[0];
                
                if(diff > 5000000) value[1] = value[0] + 5000000;

                memo['price'] = { $gte: value[0], $lte: value[1] }
            };

            key === 'types' && (memo['lot_type.name'] = { $in: Object.entries(value).reduce((memo, entry) => {
                    let [key, value] = entry;

                    memo.push(value.text);
                    return memo;
                }, [])
            });

            return memo;
        }, {});
        
        //match['building'] = '49';

        let buildings = await db.Lot.aggregate([
            {
                $addFields: {
                    rooms_count: { 
                        $convert: { 
                            input: "$rooms", 
                            to: "int", 
                            onError: "Error", 
                            onNull: 0
                        } 
                    }
                 }
            },
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
                $sort: { price : 1 }
            },
            {
                $unwind: '$lot_type'
            },
            {
                $group: {
                    _id: {
                        building: "$building",
                        lot_type: "$lot_type.name",
                        rooms: "$rooms_count",
                        is_open_plan: "$is_open_plan",
                        is_studio: "$is_studio"
                    },
                    building: { $addToSet: "$building" },
                    lot_type: { $addToSet: "$lot_type.name" },
                    rooms: { $addToSet: "$rooms_count" },
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
        
        //buildings = buildings.filter(b => b.id === 49);

        buildings = buildings.reduce((memo, building) => {
            let b = memo.find(b => b.id === building.id);
            !b && memo.push(building);

            let stats = building.statistics;
            let type = (stats.lot_type[0] && stats.lot_type[0].toLowerCase()) || 'что это ?';
            //let rooms = stats.is_studio[0] ? 'студия' : stats.is_open_plan[0] ? 'СП' : stats.rooms[0] ? stats.rooms[0] + '-комн' : 'помещение';
            let rooms = stats.is_open_plan[0] ? stats.is_studio[0] ? 'СП студия' : 'СП' : stats.is_studio[0] ? 'студия' : '';
            //rooms = stats.is_studio[0] && 'студия';

            let rooms_count = stats.rooms[0] ? stats.rooms[0] + '-комн' : rooms ? '' : 'помещение';
            rooms = `${rooms ? rooms : ''}${rooms ? ' ' + rooms_count : rooms_count}`;

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
            if(b) {
                b.statistics[type] = b.statistics[type] || building.statistics[type];
                b.statistics[type][rooms] = building.statistics[type][rooms]
            };
            //return building;
            
            return memo;
        }, []);

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