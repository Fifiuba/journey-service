const request = require('supertest');
const {app} = require('../app');
const {connectDB, dropDB, dropCollections} = require('./testDatabase/testDatabase');
const journey = require('./testFiles/journey.json');
const anotherJourney = require('./testFiles/anotherJourney.json');
const {JourneyModel} = require('../database/schema');
const buenosAiresJourney = require('./testFiles/buenosAiresJourney.json');
const pilarJourney = require('./testFiles/pilarJourney.json');

describe('Application tests', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await dropDB();
  });

  afterEach(async () => {
    await dropCollections();
  });

  it('GET journey by id of an existing journey', async () => {
    const newJourney = new JourneyModel(journey);
    const savedJourney = await newJourney.save();
    const id = savedJourney._id.toString();

    await request(app).get('/journey/' + id).expect(200).then((response) => {
      expect(response.body._id.toString()).toBe(savedJourney._id.toString());
    });
  });

  it('GET journey by id of a non-existing journey', async () => {
    const newJourney = new JourneyModel(journey);
    await newJourney.save();

    await request(app).get('/journey/aaaaaaaaaaaa').expect(404).then((response) => {
      expect(JSON.stringify(response)).toContain('journey not found');
    });
  });

  it('GET journeys', async () => {
    const newJourney = new JourneyModel(journey);
    const anotherNewJourney = new JourneyModel(anotherJourney);

    const savedJourney = await newJourney.save();
    const anotherSavedJourney = await anotherNewJourney.save();

    await request(app).get('/journey').expect(200).then((response) => {
      const expected = [response.body[0]._id.toString(), response.body[1]._id.toString()];
      expect(response.body.length).toBe(2);
      expect([savedJourney._id.toString(), anotherSavedJourney._id.toString()]).toEqual(expect.arrayContaining(expected));
    });
  });

  it('UPDATE journey status to accepted', async () => {
    const newJourney = new JourneyModel(journey);
    const savedJourney = await newJourney.save();

    await request(app).patch('/journey/accept/' + savedJourney._id.toString()).expect(200).then((response) => {
      expect(response.body._id.toString()).toBe(savedJourney._id.toString());
    });
  });

  it('UPDATE journey status to started', async () => {
    const newJourney = new JourneyModel(journey);
    const savedJourney = await newJourney.save();

    await request(app).patch('/journey/start/' + savedJourney._id.toString()).expect(200).then((response) => {
      expect(response.body._id.toString()).toBe(savedJourney._id.toString());
    });
  });

  it('UPDATE journey status to accepted', async () => {
    const newJourney = new JourneyModel(journey);
    const savedJourney = await newJourney.save();

    await request(app).patch('/journey/cancel/' + savedJourney._id.toString()).expect(200).then((response) => {
      expect(response.body._id.toString()).toBe(savedJourney._id.toString());
    });
  });

  it('UPDATE journey status to finished', async () => {
    const newJourney = new JourneyModel(journey);
    const savedJourney = await newJourney.save();

    await request(app).patch('/journey/finish/' + savedJourney._id.toString()).expect(200).then((response) => {
      expect(response.body._id.toString()).toBe(savedJourney._id.toString());
    });
  
  });
  
  it("GET requested journeys which locations are close to a driver", async () => {
    const newBuenosAiresJourney = new JourneyModel(buenosAiresJourney);
    const newPilarJourney = new JourneyModel(pilarJourney)
    const savedJourney = await newBuenosAiresJourney.save();
    const anotherSavedJourney = await newPilarJourney.save();

    await request(app).get('/journey/requested?location=-34.5854348,-58.400238').expect(200).then((response) => {
      expect(response.body.length).toBe(1);
      expect(response.body[0]._id.toString()).toBe(savedJourney._id.toString());
    });
  });
  

});