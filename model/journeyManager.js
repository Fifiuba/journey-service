const {JourneyRepository} = require('../model/journeyRepository');
const journeyRepository = new JourneyRepository();
const logger = require('../utils/logger');

class JourneyManager {

    async startJourney(journeyId) {
        const journeyInfo = {
            status: 'started',
            startOn: Date.now(),
          };
          let journey = await journeyRepository
          .updateJourneyInfo(journeyInfo, journeyId);
          return journey
    }

    async acceptJourney(journeyId, driverId, vip){
        const journeyInfo = {
            status: 'accepted',
            driver: {idDriver: driverId, vip: vip},
          };
        
          let journey = await journeyRepository.getJourneyById(journeyId);
          if (!journey) {
            logger.warn('Journey not found');
          } else if (journey.status !== 'accepted') {
            // eslint-disable-next-line max-len
            journey = await journeyRepository.updateJourneyInfo(journeyInfo, journeyId);
          } else {
            logger.warn('Journey already accepted');
            journey.status = 'taken';
          }
          return journey
    }

    async cancelJourney(journeyId){
        const journeyInfo = {
            status: 'cancelled',
          };
        
          let journey = await journeyRepository.getJourneyById(journeyId);
        
          if (!journey) {
            logger.warn('Journey not found');
          } else if (journey.status === 'requested' ) {
            // eslint-disable-next-line max-len
            journey = await journeyRepository.updateJourneyInfo(journeyInfo, journeyId);
          } else {
            logger.warn('Journey already ' + journey.status);
          }
          return journey
    }
}

module.exports = {JourneyManager};