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

function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}
function isShortDistance(journey, lat1, lng1){
  console.log("lat1 ", lat1, " lng2: " ,lng1);
  console.log("lat2: ", journey.from[0], " lng2: " ,journey.from[1]);
  dist = distance(lat1, lng1, journey.from[0], journey.from[1], "K");
  console.log(dist);
  if (dist <= 5){
      console.log("entre");
      return true;
  }
  return false;
}

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

journeyRouter.post("/request", async(req, res) =>{
  const journeys = await journeyRepository.getJourneysRequested("requested");
  console.log(journeys);
  const lat_request = req.body.lat;
  const lng_request = req.body.lng;
  console.log("lat: ", lat_request);
  console.log("lng: ", lng_request);
  const journeysNear = journeys.filter(element => {
    if (isShortDistance(element, lat_request, lng_request)){
         return element;
    }
  })
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
