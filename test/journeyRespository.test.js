const {getJourneyById, getJourneys} = require('../model/journeyRepository');
const {JourneyModel} = require('../database/database')
const { ObjectId } = require('mongodb');
const journey = require('./testFiles/journey.json');
const anotherJourney = require('./testFiles/anotherJourney.json');
const {connectDB,dropDB,dropCollections} = require('./testDatabase/testDatabase')

describe("Journey repository test", () => {

    beforeAll(async () => {
        await connectDB();
      });
       
      afterAll(async () => {
        await dropDB();
      });
       
      afterEach(async () => {
        await dropCollections();
      });
    
    it("01 when getting an id of an existing journey the repository finds it", async () => {

        const newJourney = new JourneyModel(journey);
        let savedJourney = await newJourney.save();
        
        let result = await getJourneyById(savedJourney._id);

        expect(result._id.toString()).toBe(savedJourney._id.toString());
    });

    it("02 when getting an id of a not existing journey the repository returns null", async () => {
        
        const newJourney = new JourneyModel(journey);
        await newJourney.save();
        
        let result = await getJourneyById(new ObjectId("aaaaaaaaaaaa"));

        expect(JSON.stringify(result)).toBe("null")
    });

    it("03 when getting all journeys the repository returns them", async () => {

        const newJourney = new JourneyModel(journey);
        const anotherNewJourney = new JourneyModel(anotherJourney);

        let savedJourney = await newJourney.save();
        let anotherSavedJourney = await anotherNewJourney.save();
        
        let results = await getJourneys();
        let expected = [results[0]._id.toString(),results[1]._id.toString()]
        
        expect(results.length).toBe(2);
        expect([savedJourney._id.toString(),anotherSavedJourney._id.toString()]).toEqual(expect.arrayContaining(expected));
    });

})