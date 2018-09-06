/* Dependencies */
const mongoose = require('mongoose')

const { Schema } = mongoose

/* Schema */
const Organization = new Schema({
  id: Number,
  name: String,
  type: Number // 0 - Developer, 1 - Builder
})

module.exports = mongoose.model('Organization', Organization)
