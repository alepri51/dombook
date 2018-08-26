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

mongoose.connect('mongodb://localhost:32774/myapp', {
    useNewUrlParser: true
});

//////////////////////////MODELS//////////////////////////////////////

Model.prototype.projection = function() {
    let { _id, __v, ...keys } = this.schema.paths;

    let projection = Object.keys(keys).reduce((memo, key) => {
        this[key] && (memo[key] = this[key]);
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
    account: { 
        type: Schema.Types.ObjectId, 
        ref: 'Account' 
    }
}));

let Account = mongoose.model('Account', new Schema({
    hash: String,
    email: String
}));

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
    Account
}
