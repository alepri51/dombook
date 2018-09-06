/* Dependencies */
const mongoose = require('mongoose')

const { Schema } = mongoose

/* Schema */
const Filter = new Schema({
    id: Number,
    name: String,
    type: String
})

module.exports = mongoose.model('Filter', Filter)
