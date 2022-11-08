const express = require('express');
/* const {Journey} = */require('../model/journey');

const {JourneyModel} = require('../database/journeySchema.js');
const {JourneyRepository} = require('../model/journeyRepository');
const {ConfigurationRepository} = require('../model/configurationRepository');

const {PriceCalculator} = require('../model/priceCalculator');
const {Modality} = require('../model/modality');
/* const {Auth} = */require('../model/auth');
const {DistanceCalculator} = require('../model/distanceCalculator');

const journeyRouter = express.Router();
const journeyRepository = new JourneyRepository();
const configurationRepository = new ConfigurationRepository();


const logger = require('../utils/logger');


function returnJourney(response, journey, message) {
  if (!journey) {
    logger.warn('Journey not found');
    response.status(404).send('journey not found');
    return;
  }
  logger.info('Journey ' + message);
  response.send(journey);
}

function returnConfig(response, config) {
  if (!config) {
    logger.warn('Configuration not set');
    response.status(404).send('No configuration setting was found');
    return;
  }

  const configurationSettings = {
    base_price: config.base_price,
    radial_distance: config.radial_distance,
  };

  response.send(configurationSettings);
}

journeyRouter.route('/info')
    .post(async (req, res) => {
      const distance = req.body.distance;
      const modality = new Modality(req.body.modality);
      const priceCalculator = new PriceCalculator(modality, distance);
      try {
        const price = priceCalculator.calculate();
        const json = {
          price: price,
        };
        res.send(json);
      } catch (error) {
        res.status(error.code).json({error: error});
      }
    });

journeyRouter.get('/requested', async (req, res) =>{
  const journeys = await journeyRepository.getJourneysRequested('requested');
  const location = req.query.location.split(',');
  const latRequest = location[0];
  const lngRequest = location[1];
  const configuration = await configurationRepository.getConfiguration();
  const distance = +configuration.radial_distance.toString();
  const distanceCalculator = new DistanceCalculator();
  const journeysNear = journeys.filter((journey) => {
    if (distanceCalculator
        .isShort(journey.from, latRequest, lngRequest, distance)) {
      return journey;
    }
  });
  res.send(journeysNear);
});

journeyRouter.post('/', async (req, res) => {
  const modality = new Modality(req.body.modality);
  const priceCalculator = new PriceCalculator(modality, req.body.distance);

  const price = priceCalculator.calculate();

  const dbJourney = new JourneyModel({
    status: 'requested',
    idPassenger: req.body.idPassenger,
    price: price,
    from: req.body.from,
    to: req.body.to,
  });
  logger.debug('Create journey');
  const result = await dbJourney.save();
  logger.info('Journey Requested');
  res.send(result);
});

journeyRouter.patch('/start/:id', async (req, res) => {
  const journeyInfo = {
    status: 'started',
    driver: {idDriver: req.body.idDriver, vip: req.body.vip},
    startOn: Date.now(),
  };
  const journey = await journeyRepository
      .updateJourneyInfo(journeyInfo, req.params.id);
  returnJourney(res, journey, 'Started');
});

journeyRouter.patch('/accept/:id', async (req, res) => {
  const journeyInfo = {
    status: 'accepted',
  };

  const journey = await journeyRepository.getJourneyById(req.params.id);

  if (!journey) {
    logger.warn('Journey not found');
    returnJourney(res, journey, ' ');
  } else if (journey.status !== 'accepted') {
    // eslint-disable-next-line max-len
    const updatedJourney = await journeyRepository.updateJourneyInfo(journeyInfo, req.params.id);
    return returnJourney(res, updatedJourney, 'Accepted');
  } else {
    logger.warn('Journey already accepted');
    journey.status = 'taken';
    returnJourney(res, journey, 'Already taken');
  }
});

journeyRouter.patch('/cancel/:id', async (req, res) => {
  const journeyInfo = {
    status: 'cancelled',
  };

  const journey = await journeyRepository.getJourneyById(req.params.id);

  if (!journey) {
    logger.warn('Journey not found');
    returnJourney(res, journey, ' ');
  } else if (journey.status === 'requested' ) {
    // eslint-disable-next-line max-len
    const updatedJourney = await journeyRepository.updateJourneyInfo(journeyInfo, req.params.id);
    return returnJourney(res, updatedJourney, 'Cancelled');
  } else {
    logger.warn('Journey already started');
    returnJourney(res, journey, 'Already taken');
  }
});

journeyRouter.patch('/finish/:id', async (req, res) => {
  const journeyInfo = {
    status: 'finish',
    finishOn: Date.now(),
  };
  const journey = await journeyRepository
      .updateJourneyInfo(journeyInfo, req.params.id);
  returnJourney(res, journey, 'Finish');
});


journeyRouter.route('/').get(async (req, res) => {
  const journeys = await journeyRepository.getJourneys();
  logger.info('Get Journeys');
  res.send(journeys);
});

journeyRouter.route('/config').get(async (req, res) => {
  const config = await configurationRepository.getConfiguration(req.body);
  returnConfig(res, config);
});

journeyRouter.route('/config').patch(async (req, res) => {
  const config = await configurationRepository.editConfiguration(req.body);
  returnConfig(res, config);
});

journeyRouter.route('/config').post(async (req, res) => {
  const config = await configurationRepository.setConfiguration(req.body);
  returnConfig(res, config);
});

journeyRouter.route('/:id').get(async (req, res) => {
  const journey = await journeyRepository.getJourneyById(req.params.id);
  returnJourney(res, journey, req.params.id);
});

module.exports = {journeyRouter};
