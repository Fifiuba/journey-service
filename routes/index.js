const express = require('express');
const { Journey } = require('../model/journey');
const {JourneyModel} = require('../database/database.js');

const journeyRouter = express.Router();

journeyRouter.route('/example')
  .post(async (req, res) => {
    const example = new JourneyModel({
      att: req.body.message
    });
    example.save().then( result => {
      console.log(result);
      res.status(201).json(example);

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});

    });
});

journeyRouter.route('/request')
    .post(async (req, res) => {

    });

journeyRouter.route('/info')
    .post(async (req, res) => {
      const from = req.body.from;
      const to = req.body.to;
      const modality = req.body.modality;
      const journey = new Journey(from, to, modality);
      res.send(journey.cost());
    });

journeyRouter.post('/start/{id}', async (req, res) => {
  // let JourneyRepository = new JourneyRepository();
});

journeyRouter.post('/cancel/{id}', async (req, res) => {


});

journeyRouter.post('/finish/{id}', async (req, res) => {


});

module.exports = {journeyRouter};
