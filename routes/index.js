const express = require('express');
const { Journey } = require('../model/journey');
require('./database/database')
const dbConnect = dbo.getDb();

const journeyRouter = express.Router();

journeyRouter.route('/request')
  .post(async (req, res) => {
    
});

journeyRouter.route('/info')
  .post(async (req, res) => {
      let from = req.body.from;
      let to = req.body.to;
      let journey = new Journey(from,to);
      res.send(journey.price());
  })




journeyRouter.post('/start/{id}',async (req,res) => {
  //let JourneyRepository = new JourneyRepository();  
})

journeyRouter.post('/cancel/{id}', async (req, res) => {
  
  
})

journeyRouter.post('/finish/{id',async (req, res) => {

  
})

module.exports = {journeyRouter};