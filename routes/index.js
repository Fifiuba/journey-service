const express = require('express');
const {JourneyManager} = require('../model/journeyManager');
const {JourneyRepository} = require('../model/journeyRepository');
const {ConfigurationRepository} = require('../model/configurationRepository');
const logger = require('../utils/logger');
const {Auth} = require('../model/auth');

const journeyRouter = express.Router();
const journeyRepository = new JourneyRepository();
const configurationRepository = new ConfigurationRepository();
const auth = new Auth();
const journeyManager = new JourneyManager(journeyRepository,
    configurationRepository);


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

function authenticateToken(req, res, next) {
  try {
    auth.validate(req.headers);
    return next();
  } catch (error) {
    return res.sendStatus(error.code).send(error.name);
  }
}

journeyRouter.get('/info', authenticateToken, async (req, res) => {
  try {
    const journeyPrice = await journeyManager
        .getPriceForJourney(req.query.distance, req.query.modality);
    res.send({price: journeyPrice});
  } catch (error) {
    res.status(error.code).json({error: error});
  }
});

journeyRouter.get('/requested', authenticateToken, async (req, res) => {
  if (JSON.stringify(req.query) === JSON.stringify({})) {
    res.status(400).send('Specify location parameters');
    return;
  }
  const location = req.query.location.split(',');
  const latRequest = location[0];
  const lngRequest = location[1];
  const journeysNear = await journeyManager
      .getNearestRequestedJourneys(latRequest, lngRequest);
  res.send(journeysNear);
});

journeyRouter.post('/', authenticateToken, async (req, res) => {
  const journey = await journeyManager
      .requestJourney(req.body.idPassenger, req.body.modality,
          req.body.distance, req.body.from, req.body.to);
  if (!journey) {
    res.status(422).send('Error requesting journey - check the fields sent');
    return;
  }
  res.send(journey);
});

journeyRouter.patch('/start/:id', authenticateToken, async (req, res) => {
  const journey = await journeyManager.startJourney(req.params.id);
  returnJourney(res, journey, 'Started');
});

journeyRouter.patch('/accept/:id', authenticateToken, async (req, res) => {
  let returnMessage = ' ';
  const journey = await journeyManager
      .acceptJourney(req.params.id, req.body.idDriver, req.body.vip);
  if (journey != null && journey.status == 'accepted') {
    returnMessage = 'Accepted';
  } else if (journey != null) {
    returnMessage = 'Already taken';
  }
  returnJourney(res, journey, returnMessage);
});

journeyRouter.patch('/cancel/:id', authenticateToken, async (req, res) => {
  let returnMessage = ' ';
  const journey = await journeyManager.cancelJourney(req.params.id);
  if (journey != null && journey.status === 'requested' ) {
    returnMessage = 'Cancelled';
  } else if (journey != null) {
    returnMessage = 'Already taken';
  }
  returnJourney(res, journey, returnMessage);
});

journeyRouter.patch('/finish/:id', authenticateToken, async (req, res) => {
  let returnMessage = 'Finish';
  const journey = await journeyManager.finishJourney(req.params.id);
  if (!journey) {
    returnMessage = ' ';
  }
  returnJourney(res, journey, returnMessage);
});


journeyRouter.route('/').get(authenticateToken, async (req, res) => {
  const journeys = await journeyRepository.getJourneys();
  logger.info('Get Journeys');
  res.send(journeys);
});

journeyRouter.route('/config').get(authenticateToken, async (req, res) => {
  const config = await configurationRepository.getConfiguration(req.body);
  returnConfig(res, config);
});

journeyRouter.route('/config').patch(authenticateToken, async (req, res) => {
  const config = await configurationRepository.editConfiguration(req.body);
  returnConfig(res, config);
});

journeyRouter.route('/:id').get(authenticateToken, async (req, res) => {
  const journey = await journeyRepository.getJourneyById(req.params.id);
  returnJourney(res, journey, req.params.id);
});

module.exports = {journeyRouter, auth};
