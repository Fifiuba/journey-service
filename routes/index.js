const express = require('express');
const {Journey} = require('../model/journey');
const {JourneyModel, getJourneyById} = require('../database/database.js');
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

journeyRouter.post('/start/:id', async (req, res) => {
  // let JourneyRepository = new JourneyRepository();
});

journeyRouter.post('/cancel/:id', async (req, res) => {


});

journeyRouter.post('/finish/:id', async (req, res) => {
  

});

journeyRouter.route("/:id").get(async (req, res) => {
  
  var journey = await getJourneyById(req.params.id);
  res.send(journey);
});

module.exports = {journeyRouter};
