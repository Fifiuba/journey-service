const {JourneyModel} = require('../database/journeySchema');

class JourneyRepository {
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


  async getJourneysRequested(status) {
    return await JourneyModel.find({'status': status});
  }

  async updateJourneyInfo(infoJourney, id) {
    const journey = await JourneyModel
        .findByIdAndUpdate(id, infoJourney, {new: true});
    return journey;
  }
}

module.exports = {JourneyRepository};
