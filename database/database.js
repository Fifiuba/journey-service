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


module.exports = {JourneyModel, updateJourneyStatusTo, updateJourneyDriverTo, updateJourneyInfo};


async function updateJourneyStatusTo(newStatus, id){

  var journey_db = await JourneyModel.findByIdAndUpdate(id, {status: newStatus},{new: true});
  console.log(journey_db)
  return journey_db;
}

async function updateJourneyDriverTo(newidDriver, newVipDriver, id){

  var journey = await JourneyModel.findByIdAndUpdate(id, {driver: {idDriver: newidDriver, vip : newVipDriver}},{new: true});
  console.log(journey);
  return journey;
}

async function updateJourneyInfo(infoJourney, id){
    var journey = await JourneyModel.findByIdAndUpdate(id, infoJourney,{new: true});
    console.log(journey);
    return journey;
}