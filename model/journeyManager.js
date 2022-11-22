const {JourneyRepository} = require('../model/journeyRepository');
const journeyRepository = new JourneyRepository();

class JourneyManager {

    async startJourney(journeyId) {
        const journeyInfo = {
            status: 'started',
            startOn: Date.now(),
          };
          const journey = await journeyRepository
          .updateJourneyInfo(journeyInfo, journeyId);
          return journey
    }
}

module.exports = {JourneyManager};