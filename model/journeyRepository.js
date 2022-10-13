const {JourneyModel} = require('../database/database');

// returns null if the journey is not found
async function getJourneyById(id) {
  const journey = await JourneyModel.findById(id, function(err) {
    return err;
  }).clone().catch(function(err) {
    console.log(err);
  });

  return journey;
}

async function getJourneys() {
  return await JourneyModel.find();
}

module.exports = {getJourneyById, getJourneys};
