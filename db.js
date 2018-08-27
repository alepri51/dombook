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
    /* account: { 
        type: Schema.Types.ObjectId, 
        ref: 'Account' 
    } */
    account: new Schema({
        hash: String,
        email: String,
        private_key: String,
        public_key: String
    })
}));

/* let Account = mongoose.model('Account', new Schema({
    hash: String,
    email: String,
    private_key: String,
    public_key: String
})); */

//////////////////////////MODELS//////////////////////////////////////

(async () => { //DB INIT IF NEEDED
    /* let accounts = await Account.find();

    let users = await User.find().populate('account');
    if(!users.length) {
        let account = new Account({
            hash: generate('abcdefghijklmnopqrstuvwxyz', 32),
            email: generate('abcdefghijklmnopqrstuvwxyz@.', 16),
        });

        account = await account.save();

        let user = new User({
            name: generate('abcdefghijklmnopqrstuvwxyz ', 10),
            account
        });

        user = await user.save();
        console.log(user);
    }
    else {
        users = await User.deleteMany();
        accounts = await Account.deleteMany();
        console.log(users);
    } */

})();

module.exports = {
    User,
    //Account
}
