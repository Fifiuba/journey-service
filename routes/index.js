const express = require('express');
const {Journey} = require('../model/journey');

const {JourneyModel} = require('../database/schema.js');
const {JourneyRepository} = require('../model/journeyRepository');

const {PriceCalculator} = require('../model/priceCalculator');
const {Modality} = require('../model/modality');
const {Auth} = require('../model/auth');

const journeyRouter = express.Router();
const journeyRepository = new JourneyRepository();

function returnJourney(response, journey) {
  if (!journey) {
    response.status(404).send('journey not found');
    return;
  }
  response.send(journey);
}

journeyRouter.route('/request')
    .post(async (req, res) => {
      const distance = req.body.distance;
      const modality = new Modality(req.body.modality);
      const priceCalculator = new PriceCalculator(modality, distance);
      const auth = new Auth();
      // TODO: porque no se esta guardando en la base?
      try {
        auth.validate(req.headers);
        const price = priceCalculator.calculate();
        const json = {
          price: price,
        };
        res.status(202).json(json);
      } catch (error) {
        res.status(error.code).json({error: error});
      }
    });

journeyRouter.route('/info')
    .post(async (req, res) => {
      const from = req.body.from;
      const to = req.body.to;
      const modality = new Modality(req.body.modality);
      const journey = new Journey(from, to, modality);
      res.send(journey.cost());
    });

journeyRouter.post('/', async (req, res) => {
  console.log("body ", req.body)
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
  const result = await dbJourney.save();
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
  returnJourney(res, journey);
});

journeyRouter.patch('/accept/:id', async (req, res) => {
  const journeyInfo = {
    status: 'accepted',
  };
  const journey = await journeyRepository
      .updateJourneyInfo(journeyInfo, req.params.id);
  returnJourney(res, journey);
});

journeyRouter.patch('/cancel/:id', async (req, res) => {
  const journeyInfo = {
    status: 'cancelled',
  };
  const journey = await journeyRepository
      .updateJourneyInfo(journeyInfo, req.params.id);
  returnJourney(res, journey);
});

journeyRouter.patch('/finish/:id', async (req, res) => {
  const journeyInfo = {
    status: 'finish',
    finishOn: Date.now(),
  };
  const journey = await journeyRepository
      .updateJourneyInfo(journeyInfo, req.params.id);
  returnJourney(res, journey);
});


journeyRouter.route('/').get(async (req, res) => {
  const journeys = await journeyRepository.getJourneys();
  res.send(journeys);
});

journeyRouter.route('/:id').get(async (req, res) => {
  const journey = await journeyRepository.getJourneyById(req.params.id);
  returnJourney(res, journey);
});

module.exports = {journeyRouter};
