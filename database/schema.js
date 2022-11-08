const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');
const {Schema} = mongoose;

// Each schema maps to a MongoDB collection and defines
// the shape of the documents within that collection
const JourneySchema = new Schema ({
  status: String,
  idPassenger: Number,
  driver: {
    idDriver: {type: Number},
    vip: {type: Boolean},
  },
  price: Number,
  startOn: {type: Date, default: Date.now},
  finishOn: {type: Date},
  from: {type: [Number]},
  to: {type: [Number]},
});

const ConfigurationSchema = new Schema ({
  price: Number,
  radial_distance: Decimal128,
  unit: String,
});

// To use our schema definition, we need to convert it
// into a Model we can work with Instances of Models are documents
const JourneyModel = mongoose.model('Journey', JourneySchema);
const ConfigurationModel = mongoose.model('Configuration', ConfigurationSchema);

module.exports = {JourneyModel, ConfigurationModel};
