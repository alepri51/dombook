/* Dependencies */
const mongoose = require('mongoose')

const { Schema } = mongoose

/* Schema */
const Lot = new Schema({
  id: Number,
  identifier: String,
  parking: String,
  lot_finishing_type: {
    type: Schema.Types.ObjectId,
    ref: 'Filter'
  },
  number: String,
  section: String,
  floor: String,
  rooms: String,
  price: {
      type: Number,
      index: true
  },
  price_square: Number,
  square: Number,
  is_open_plan: Boolean,
  is_studio: Boolean,
  finishing: Boolean,
  ceiling_height: Number,
  lot_type: {
    type: Schema.Types.ObjectId,
    ref: 'Filter',
    index: true
  },
  planing_photos: [{
    url: String,
    is_planning: Boolean
  }],
  building: {
    type: Schema.Types.ObjectId,
    ref: 'Building'
  }
})

module.exports = mongoose.model('Lot', Lot)
