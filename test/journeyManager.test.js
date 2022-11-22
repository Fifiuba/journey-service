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
    
    it('get price for a journey returns the correct price', async () => {
        const journeyRepository = new JourneyRepository()
        const configurationRepository = new ConfigurationRepository()
        const config = new ConfigurationModel(configuration)
        await config.save()
        const journeyManager = new JourneyManager(journeyRepository,  configurationRepository)
        const price = await journeyManager.getPriceForJourney(5, "standar")
        expect(price).toBe(1000)
    });

    it('')

});