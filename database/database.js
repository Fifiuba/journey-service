const mongoose = require('mongoose');
const {Schema} = mongoose;


// Each schema maps to a MongoDB collection and defines
// the shape of the documents within that collection
const JourneySchema = new Schema({
  status: String,
  idPassenger: Number,
  driver: {
    idDriver: {type: Number},
    vip: {type: Boolean},
  },
  price: Number,
  startOn: {type: Date, default: Date.now},
  finishOn: {type: Date, default: Date.now},
  from: {type: [Number]},
  to: {type: [Number]},
});

// To use our schema definition, we need to convert it
// into a Model we can work with Instances of Models are documents
const JourneyModel = mongoose.model('Journey', JourneySchema);
module.exports = {JourneyModel, getJourneyById, getJourneys};


async function getJourneyById(id){

  var json = await JourneyModel.findById(id, function (err){
    return err;
  }).clone().catch(function(err){ console.log(err)});

  console.log('encuentra:')
  console.log(json)
  return json;
}

async function getJourneys(){

  return await JourneyModel.find()
}