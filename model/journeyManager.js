const logger = require('../utils/logger');
const {Modality} = require('../model/modality');
const {PriceCalculator} = require('../model/priceCalculator');
const {DistanceCalculator} = require('../model/distanceCalculator');
const {JourneyModel} = require('../database/journeySchema');

class JourneyManager {
  constructor(journeyRepository, configurationRepository) {
    this.journeyRepository = journeyRepository;
    this.configurationRepository = configurationRepository;
  }

  async getPriceForJourney(distance, requestedModality) {
    const modality = new Modality(requestedModality);
    const config = await this.configurationRepository
        .getConfiguration();
    const priceCalculator = new PriceCalculator(config.base_price,
        modality, distance);
    const price = priceCalculator.calculate();
    return price;
  }

  async requestJourney(passengerId, requestedModality, distance, from, to) {
    const configuration = await this.configurationRepository.getConfiguration();
    const modality = new Modality(requestedModality);
    const priceCalculator = new PriceCalculator(configuration.base_price,
        modality, distance);
    const price = priceCalculator.calculate();

    let requestedJourney = null;
    try {
      const dbJourney = new JourneyModel({
        status: 'requested',
        idPassenger: passengerId,
        price: price,
        from: from,
        to: to,
      });
      logger.debug('Create journey');
      const result = await dbJourney.save();
      logger.info('Journey Requested');
      requestedJourney = result;
    } catch (err) {
      console.log(err);
    }
    return requestedJourney;
  }

  async getNearestRequestedJourneys(latRequest, lngRequest) {
    const journeys = await this.journeyRepository
        .getJourneysRequested('requested');
    const configuration = await this.configurationRepository.getConfiguration();
    const distance = +configuration.radial_distance.toString();
    const distanceCalculator = new DistanceCalculator();
    const journeysNear = journeys.filter((journey) => {
      if (distanceCalculator
          .isShort(journey.from, latRequest, lngRequest, distance)) {
        return journey;
      }
    });
    return journeysNear;
  }

  async startJourney(journeyId) {
    const journeyInfo = {
      status: 'started',
      startOn: Date.now(),
    };
    const journey = await this.journeyRepository
        .updateJourneyInfo(journeyInfo, journeyId);
    return journey;
  }

  async acceptJourney(journeyId, driverId, vip) {
    const journeyInfo = {
      status: 'accepted',
      driver: {idDriver: driverId, vip: vip},
    };

    let journey = await this.journeyRepository.getJourneyById(journeyId);
    if (!journey) {
      logger.warn('Journey not found');
    } else if (journey.status == 'requested') {
      // eslint-disable-next-line max-len
      journey = await this.journeyRepository.updateJourneyInfo(journeyInfo, journeyId);
    } else {
      if (journey.status == 'accepted'){
        logger.warn('Journey already accepted');
      }else{
        logger.warn('Journey is not longer requested');
      }
    }
    return journey;
  }

  async cancelJourney(journeyId) {
    const journeyInfo = {
      status: 'cancelled',
    };

    let journey = await this.journeyRepository.getJourneyById(journeyId);

    if (!journey) {
      logger.warn('Journey not found');
    } else if (journey.status === 'requested' ) {
      // eslint-disable-next-line max-len
      journey = await this.journeyRepository.updateJourneyInfo(journeyInfo, journeyId);
    } else {
      logger.warn('Journey already ' + journey.status);
    }
    return journey;
  }

  async finishJourney(journeyId) {
    const journeyInfo = {
      status: 'finish',
      finishOn: Date.now(),
    };
    const journey = await this.journeyRepository
        .updateJourneyInfo(journeyInfo, journeyId);
    return journey;
  }
}

module.exports = {JourneyManager};
