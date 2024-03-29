const mongoose = require('mongoose');
const {Schema} = mongoose;

// Each schema maps to a MongoDB collection and defines
// the shape of the documents within that collection
const JourneySchema = new Schema({
  status: String,
  idPassenger: Number,
  driver: {
    idDriver: {type: Number, default: null},
    vip: {type: Boolean, default: null},
  },
  price: Number,
  startOn: {type: Date, default: Date.now},
  finishOn: {type: Date},
  from: {type: [Number]},
  to: {type: [Number]},
});

// To use our schema definition, we need to convert it
// into a Model we can work with Instances of Models are documents
const JourneyModel = mongoose.model('Journey', JourneySchema);

module.exports = {JourneyModel};
