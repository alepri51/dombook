'use strict'

const crypto = require('crypto2');
const bcrypt = require('bcryptjs');
const generate = require('nanoid/generate');

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

let Lot = require('./lot');
let Building = require('./building');
let Filter = require('./filter');
let Organization = require('./organization');

const User = mongoose.model('User', new Schema({ 
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

const Project = mongoose.model('Project', new Schema({ 
    name: {
        type: String,
        select: true
    },
    buildings: [{ type: Schema.Types.ObjectId, ref: 'Building' }]
}));

const Seller = mongoose.model('Seller', new Schema({ 
    name: {
        type: String,
        select: true
    },
    building: { type: Schema.Types.ObjectId, ref: 'Building' }
}));

//////////////////////////MODELS//////////////////////////////////////


//////////////////////////HELPERS//////////////////////////////////////

async function getAccountPrivateKey(id) {
    let member = await User.findOne({ _id: id });
    
    return member && member.account.private_key;
}

async function drop() {
    let drops = Object.keys(mongoose.connection.collections).map(async key => {
        let collection = mongoose.connection.collections[key];

        await collection.drop();
    });

    await Promise.all(drops);
}

async function save(model, data) {
    /* let objs = await model.find({  });  */
    let saved = await model.findOne({ id: data.id, type: data.type });

    if(!saved) {
        saved = new model({
            ...data
        });

        saved = await saved.save();
    } 

    return saved;
}
//////////////////////////HELPERS//////////////////////////////////////

(async () => { //DB INIT IF NEEDED
    const axios = require('axios');
    
    //await drop();
    //let lotz = await Lot.find({});
    //await Lot.deleteMany({});

    //let buildings = await Building.find({});
    //await Building.deleteMany({});

    /*  */
    let response = await axios({
        url: 'https://dev.best-novostroy.ru/api/v1/dombook/available-building-ids',
        headers: {
            Authorization: 'Basic ZG9tYm9vazozZDUxMjVjMTYwNDYwNjgxZGEzMDc2MWNjMmVjNDc2NDZmOTllMTNjMDc3ZWQ4MjdhMTM1ZDQyMDczZDE0Yjk4'
        }
    });

    let objects = response.data;

    /* for(let i = 0; i < objects.length; i++ ) {
        await updateBuilding(objects[i]);
    } */

    console.log(objects);
    /* objects = objects.map(async id => {
        return await updateBuilding(id)
    }); */

    //await Promise.all(objects);

    async function updateBuilding(id) {
        let response = await axios({
            url: `https://dev.best-novostroy.ru/api/v1/dombook/building-by-id/${id}?include=lots`,
            headers: {
                Authorization: 'Basic ZG9tYm9vazozZDUxMjVjMTYwNDYwNjgxZGEzMDc2MWNjMmVjNDc2NDZmOTllMTNjMDc3ZWQ4MjdhMTM1ZDQyMDczZDE0Yjk4'
            }
        });
    
        let data = response.data.pop();
    
        data.builder = await save(Organization, { ...data.builder, type: 0 });
        data.developer = await save(Organization, { ...data.developer, type: 1 });
   
        data.constructive = await save(Filter, { ...data.constructive, type: 'Конструктив' });
        data.construction_stage = await save(Filter, { ...data.construction_stage, type: 'Стадия строительства' });
        data.realty_class = await save(Filter, { ...data.realty_class, type: 'Класс жилья' });
        data.lot_type = await save(Filter, { ...data.lot_type, type: 'Тип лота' });
        data.building_type = await save(Filter, { ...data.building_type, type: 'Тип корпуса' });
    
        let building = await Building.findOne({ id: data.id }); 
        building = building || new Building({
            ...data
        });

        let lots = [];
        for(let i = 0; i < data.lots.length; i++ ) {
            let lot = data.lots[i];

            lot.lot_finishing_type = await save(Filter, { ...lot.lot_finishing_type, type: 'Отделка' });
            lot.lot_type = await save(Filter, { ...lot.lot_type, type: 'Тип лота' });
        
            lot.building = building;
    
            lot = await save(Lot, { ...lot });

            lots.push(lot);
        }

        /* let lots = data.lots.map(async lot => {
            
            lot.lot_finishing_type = await save(Filter, { ...lot.lot_finishing_type, type: 'Отделка' });
            lot.lot_type = await save(Filter, { ...lot.lot_type, type: 'Тип лота' });
        
            lot.building = building;
    
            lot = await save(Lot, { ...lot });
    
            return lot;
        });
    
        building.lots = await Promise.all(lots); */

        building.lots = lots;

        building.statistics = data.lots.reduce((memo, lot) => {
                let type = (lot.lot_type.name && lot.lot_type.name.toLowerCase()) || 'не понятная хуйня';
    
                memo[type] = memo[type] || {};
                let rooms = lot.is_studio ? 'студия' : lot.is_open_plan ? 'СП' : lot.rooms + '-комн' || 'помещение';
    
                memo[type][rooms] = memo[type][rooms] || {};
                let obj = memo[type][rooms];
    
                if(lot.lot_type.name && ['квартира', 'апартаменты'].includes(lot.lot_type.name.toLowerCase())) {
    
                    obj.square = obj.square || {};
                    obj.square = {
                        min: obj.square.min ? lot.square < obj.square.min ? lot.square : obj.square.min : lot.square,
                        max: obj.square.max ? lot.square > obj.square.max ? lot.square : obj.square.max : lot.square
                    }
    
                    obj.price = obj.price || {};
                    obj.price = {
                        min: obj.price.min ? lot.price < obj.price.min ? lot.price : obj.price.min : lot.price,
                        max: obj.price.max ? lot.price > obj.price.max ? lot.price : obj.price.max : lot.price
                    }
    
                    let square_price = lot.price / lot.square;
    
                    obj.square_price = obj.square_price || {};
                    obj.square_price = {
                        min: obj.square_price.min ? square_price < obj.square_price.min ? square_price : obj.square_price.min : square_price,
                        max: obj.square_price.max ? square_price > obj.square_price.max ? square_price : obj.square_price.max : square_price
                    }
    
                }
    
                if(!rooms)
                    console.log(lot);
                    
                obj.count = obj.count + 1 || 1;
                return memo;
        }, {});
    
        console.log('SAVED:', id);
        building.save();
    }

    console.log('FINISHED');
})();

module.exports = {
    getAccountPrivateKey,
    User,
    Project,
    Building,
    Lot,
    Seller,
    Filter
}
