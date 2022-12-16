const {JourneyRepository} = require('../model/journeyRepository');
const {JourneyModel} = require('../database/journeySchema');
const {ObjectId} = require('mongodb');
const journey = require('./testFiles/journey.json');
const anotherJourney = require('./testFiles/anotherJourney.json');
const {connectDB, dropDB, dropCollections} = require('./testDatabase/testDatabase');
const {JourneyManager} = require('../model/journeyManager');
const { ConfigurationRepository } = require('../model/configurationRepository');
const {ConfigurationModel} = require('../database/configurationSchema');
const configuration = require('./testFiles/configuration.json')

describe('Journey repository test', () => {
    beforeAll(async () => {
      await connectDB();
    });
    
    afterAll(async () => {
        await dropDB();
    });
    
    afterEach(async () => {
        await dropCollections();
    });
    
    it('01 get price for a journey returns the correct price', async () => {
        const journeyRepository = new JourneyRepository()
        const configurationRepository = new ConfigurationRepository()
        const config = new ConfigurationModel(configuration)
        await config.save()
        const journeyManager = new JourneyManager(journeyRepository,  configurationRepository)
        const price = await journeyManager.getPriceForJourney(5, "standar")
        expect(price).toBe(1000)
    });
/*
    it('02', async () => {

        const newJourney = new JourneyModel(journey);
        const anotherNewJourney = new JourneyModel(anotherJourney);
    
        const savedJourney = await newJourney.save();
        const anotherSavedJourney = await anotherNewJourney.save();
        const journeyRepository = new JourneyRepository()
        const configurationRepository = new ConfigurationRepository()
        const journeyManager = new JourneyManager(journeyRepository,  configurationRepository)
       
        const journeys = await journeyManager.getJourneys()
        const expected = [journeys[0]._id.toString(), journeys[1]._id.toString()];
        expect(journeys.length).toBe(2);
        expect([savedJourney._id.toString(), anotherSavedJourney._id.toString()]).toEqual(expect.arrayContaining(expected));   
    });*/

});