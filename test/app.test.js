const request = require('supertest');
const {app} = require('../app');
const {connectDB, dropDB, dropCollections} = require('./testDatabase/testDatabase');
const journey = require('./testFiles/journey.json');
const anotherJourney = require('./testFiles/anotherJourney.json');
const {JourneyModel} = require('../database/database');

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
    const savedJourney = await newJourney.save();
    const id = savedJourney._id.toString();

    await request(app).get('/journey/aaaaaaaaaaaa').expect(500).then((response) => {
      expect(JSON.stringify(response)).toContain('journey not found');
    });
  });

  it('GET journey by id', async () => {
    const newJourney = new JourneyModel(journey);
    const anotherNewJourney = new JourneyModel(anotherJourney);

    const savedJourney = await newJourney.save();
    const anotherSavedJourney = await anotherNewJourney.save();

    await request(app).get('/journey/all').expect(200).then((response) => {
      const expected = [response.body[0]._id.toString(), response.body[1]._id.toString()];
      expect(response.body.length).toBe(2);
      expect([savedJourney._id.toString(), anotherSavedJourney._id.toString()]).toEqual(expect.arrayContaining(expected));
    });
  });
});
