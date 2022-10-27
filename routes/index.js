const express = require('express');
/* const {Journey} = */require('../model/journey');

const {JourneyModel} = require('../database/schema.js');
const {JourneyRepository} = require('../model/journeyRepository');

const {PriceCalculator} = require('../model/priceCalculator');
const {Modality} = require('../model/modality');
/* const {Auth} = */require('../model/auth');

const journeyRouter = express.Router();
const journeyRepository = new JourneyRepository();

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

journeyRouter.route('/info')
    .post(async (req, res) => {
      const distance = req.body.distance;
      const modality = new Modality(req.body.modality);
      const priceCalculator = new PriceCalculator(modality, distance);
      // const auth = new Auth();
      // TODO: porque no se esta guardando en la base?
      try {
        // auth.validate(req.headers);
        const price = priceCalculator.calculate();
        const json = {
          price: price,
        };
        res.send(json);
      } catch (error) {
        res.status(error.code).json({error: error});
      }
    });

// journeyRouter.route('/info')
//     .post(async (req, res) => {
//       const modality = new Modality(req.body.modality);
//       const journey = new Journey(from, to, modality);
//       res.send(journey.cost());
//     });

journeyRouter.post('/', async (req, res) => {
  console.log('body ', req.body);
  const modality = new Modality(req.body.modality);
  console.log(req.body.modality, req.body.distance);
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
    status: 'start',
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
  const journey = await journeyRepository
      .updateJourneyInfo(journeyInfo, req.params.id);

  returnJourney(res, journey, 'Accepted');
});

journeyRouter.patch('/cancel/:id', async (req, res) => {
  const journeyInfo = {
    status: 'cancelled',
  };
  const journey = await journeyRepository
      .updateJourneyInfo(journeyInfo, req.params.id);

  returnJourney(res, journey, 'Cancelled');
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

journeyRouter.route('/:id').get(async (req, res) => {
  const journey = await journeyRepository.getJourneyById(req.params.id);
  returnJourney(res, journey, req.params.id);
});

module.exports = {journeyRouter};
