const mongoose = require('mongoose');
const {Schema} = mongoose;

// Each schema maps to a MongoDB collection and defines
// the shape of the documents within that collection
const JourneySchema = new Schema({
  status: {type: String},
  idPassenger: {type: Number, required: true},
  driver: {
    idDriver: {type: Number},
    vip: {type: Boolean},
  },
  price: Number,
  startOn: {type: Date, default: Date.now},
  finishOn: {type: Date},
  from: {type: [Number], required: true},
  to: {type: [Number], required: true}
});

// To use our schema definition, we need to convert it
// into a Model we can work with Instances of Models are documents
const JourneyModel = mongoose.model('Journey', JourneySchema);

module.exports = {JourneyModel};
