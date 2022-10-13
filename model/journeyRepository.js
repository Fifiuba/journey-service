const {JourneyModel} = require('../database/database');

class JourneyRepository{
  // returns null if the journey is not found
  async getJourneyById(id) {
    const journey = await JourneyModel.findById(id, function(err) {
      return err;
    }).clone().catch(function(err) {
      console.log(err);
    });

    return journey;
  }

  async getJourneys() {
    return await JourneyModel.find();
  }

  async updateJourneyInfo(infoJourney, id){
    var journey = await JourneyModel.findByIdAndUpdate(id, infoJourney,{new: true});
    console.log(journey);
    return journey;
  }
}

module.exports = {JourneyRepository};
