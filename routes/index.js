const express = require('express');
const { Journey } = require('../model/journey');
const {database} = require('../database/database.js')

const journeyRouter = express.Router();

journeyRouter.route('/example')
  .post(async (req, res) => {
    database.collection("journey").insertOne(req.body, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
});

journeyRouter.route('/request')
  .post(async (req, res) => {
    
});

journeyRouter.route('/info')
  .post(async (req, res) => {
      let from = req.body.from;
      let to = req.body.to;
      let modality = req.body.modality; 
      let journey = new Journey(from,to,modality);
      res.send(journey.cost());
})

journeyRouter.post('/start/{id}',async (req,res) => {
  //let JourneyRepository = new JourneyRepository();  
})

journeyRouter.post('/cancel/{id}', async (req, res) => {
  
  
})

journeyRouter.post('/finish/{id',async (req, res) => {

  
})

module.exports = {journeyRouter};