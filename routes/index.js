const express = require('express');
const {Journey} = require('../model/journey');
const {JourneyModel, updateJourneyInfo} = require('../database/database.js');
const {getJourneyById,getJourneys} = require('../model/journeyRepository')
const {PriceCalculator} = require('../model/priceCalculator');
const {Modality} = require('../model/modality');
const { Auth } = require('../model/auth');

const journeyRouter = express.Router();


journeyRouter.route('/example')
    .post(async (req, res) => {
      const example = new JourneyModel({
        status: 'requested',
        idPassenger: 10,
        driver: {
          idDriver: 1,
          vip: false,
        },
        price: 20,
        from: [-10, 0],
        to: [29.121234, 13.131313],
      });
      example.save().then( (result) => {
        console.log(result);
        res.status(201).json(example);
      })
          .catch((err) => {
            console.log(err);
            res.status(500).json({error: err});
          });
    });

journeyRouter.route('/request')
    .post(async (req, res) => {
      const distance = req.body.distance;
      const modality = new Modality(req.body.modality);
      const priceCalculator = new PriceCalculator(modality, distance);
      const auth = new Auth();

      try {
        auth.validate(req.headers)
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
/**
 * @swagger
 *   * /journey/:
     *   post:
     *    summary: create Journey.
     *
     *    description: create a jorueny for a passenger.
     *
     *    parameters:
     *         - name: "idPassenger"
     *           in: body
     *           type: "int"
     *           required: true
     *         - name: "from"
     *           in: body
     *           type: "string"
     *           required: true
     *         - name: "to"
     *           in: body
     *           type: "string"
     *           required: true
     *         - name: "modality"
     *           in: body
     *           type: "string"
     *           required: true
     *
     *    responses:
     *         "200":
     *           description: "Return journey created correctly"
     *
     * 
*/
journeyRouter.post('/', async (req, res) => {
   
    const modality = new Modality(req.body.modality);
    const priceCalculator = new PriceCalculator(modality, req.body.distance);

    const price = priceCalculator.calculate();
   
    const db_journey = new JourneyModel({
            status: 'requested',
            idPassenger: req.body.idPassenger,
            price: price,
            from: req.body.from.split(","),
            to: req.body.to.split(","),
          });
    var result = await db_journey.save();
    res.send(result);
});

journeyRouter.patch('/start/:id', async (req, res) => {

  const journeyInfo = {
    status : 'start',
    driver : {idDriver: req.body.idDriver, vip: req.body.vip},
    startOn : Date.now()
  }
  var journey = await updateJourneyInfo(journeyInfo, req.params.id)
  res.send(journey)
});

journeyRouter.post('/accept/:id', async (req, res) => {
  
  const journeyInfo = {
    status : 'accepted'
  }
  var journey = await updateJourneyInfo(journeyInfo, req.params.id)
  res.send(journey);
});

journeyRouter.post('/cancel/:id', async (req, res) => {

  const journeyInfo = {
    status : 'cancelled'
  }
  var journey = await updateJourneyInfo(journeyInfo, req.params.id)
  res.send(journey);
});

journeyRouter.patch('/finish/:id', async (req, res) => {
 
  const journeyInfo = {
    status: 'finish',
    finishOn: Date.now()
  }
  var journey = await updateJourneyInfo(journeyInfo, req.params.id)
  res.send(journey)
});

journeyRouter.route("/:id").get(async (req, res) => {
  
  var journey = await getJourneyById(req.params.id);
  if (!journey){
    res.status(500).send("journey not found")
    return;
  }
  res.send(journey);
});
module.exports = {journeyRouter};
