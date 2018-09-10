/* Dependencies */
const mongoose = require('mongoose')

const { Schema } = mongoose

/* Schema */
const Building = new Schema({
  id: Number,
  project_name: String,
  name: String,
  address: {
    string: String,
    latitude: Number,
    longitude: Number
  },
  floors_num: Number,
  floors_from: Number,
  floors_to: Number,
  ceiling_height: Number,
  total_square: Number,
  living_square: Number,
  commercial_square: Number,
  sales_start: Date,
  construction_start: Date,
  in_operation_date: Date,
  developer: {
    type: Schema.Types.ObjectId,
    ref: 'Organization'
  },
  builder: {
    type: Schema.Types.ObjectId,
    ref: 'Organization'
  },
  constructive: {
    type: Schema.Types.ObjectId,
    ref: 'Filter'
  },
  construction_stage: {
    type: Schema.Types.ObjectId,
    ref: 'Filter'
  },
  realty_class: {
    type: Schema.Types.ObjectId,
    ref: 'Filter'
  },
  building_photos: [{
    url: String,
    date: Date,
    photo_type: {
      id: Number,
      name: String
    }
  }],
  lots: [{
    type: Schema.Types.ObjectId,
    ref: 'Lot'
  }],
  lot_type: {
    type: Schema.Types.ObjectId,
    ref: 'Filter'
  },
  building_type: {
    type: Schema.Types.ObjectId,
    ref: 'Filter'
  },
  statistics: Object
})

module.exports = mongoose.model('Building', Building)
