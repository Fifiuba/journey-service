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
    response.status(500).send('journey not found');
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
  const modality = new Modality(req.body.modality);
  const priceCalculator = new PriceCalculator(modality, req.body.distance);

  const price = priceCalculator.calculate();

  const dbJourney = new JourneyModel({
    status: 'requested',
    idPassenger: req.body.idPassenger,
    price: price,
    from: req.body.from.split(','),
    to: req.body.to.split(','),
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


/**
 * @swagger
 * /journey/all:
 *   get:
 *     summary: Returns all journeys
 *     tags: [Journeys]
 *     responses:
 *       200:
 *         description: the list of the journyes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Journey'
 */
journeyRouter.route('/all').get(async (req, res) => {
  const journeys = await journeyRepository.getJourneys();
  res.send(journeys);
});
/**
 * @swagger
 * /posts/:id:
 *   get:
 *     summary: gets journey by id
 *     tags: [Journeys]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of journey
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: journeys by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Journey'
 *       500:
 *         description: journey not found
 */
journeyRouter.route('/:id').get(async (req, res) => {
  const journey = await journeyRepository.getJourneyById(req.params.id);
  returnJourney(res, journey);
});
/**
 * @swagger
 * components:
 *   schemas:
 *     Journey:
 *       type: object
 *       required:
 *         - idPassenger
 *         - status
 *         - price

 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a journey
 *         idPassenger:
 *           type: integer
 *           description: id of the passenger
 *         status:
 *           type: string
 *           description: status of the journey
 *         price:
 *           type: integer
 *           description: price of the journey
 *
 *       example:
 *         id: hagsy
 *         idPassenger: 1
 *         status: status
 *         price: 100
 *
 *
 */

module.exports = {journeyRouter};
