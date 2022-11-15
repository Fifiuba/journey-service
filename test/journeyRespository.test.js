const {JourneyRepository} = require('../model/journeyRepository');
const {JourneyModel} = require('../database/journeySchema');
const {ObjectId} = require('mongodb');
const journey = require('./testFiles/journey.json');
const anotherJourney = require('./testFiles/anotherJourney.json');
const {connectDB, dropDB, dropCollections} = require('./testDatabase/testDatabase');

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

  it('01 when getting an id of an existing journey the repository finds it', async () => {
    const journeyRepository = new JourneyRepository();
    const newJourney = new JourneyModel(journey);
    const savedJourney = await newJourney.save();

    const result = await journeyRepository.getJourneyById(savedJourney._id);

    expect(result._id.toString()).toBe(savedJourney._id.toString());
  });

  it('02 when getting an id of a not existing journey the repository returns null', async () => {
    const journeyRepository = new JourneyRepository();
    const newJourney = new JourneyModel(journey);
    await newJourney.save();

    const result = await journeyRepository.getJourneyById(new ObjectId('aaaaaaaaaaaa'));

    expect(result).toBe(null);
  });

  it('03 when getting all journeys the repository returns them', async () => {
    const journeyRepository = new JourneyRepository();
    const newJourney = new JourneyModel(journey);
    const anotherNewJourney = new JourneyModel(anotherJourney);

    const savedJourney = await newJourney.save();
    const anotherSavedJourney = await anotherNewJourney.save();

    const results = await journeyRepository.getJourneys();
    const expected = [results[0]._id.toString(), results[1]._id.toString()];

    expect(results.length).toBe(2);
    expect([savedJourney._id.toString(), anotherSavedJourney._id.toString()]).toEqual(expect.arrayContaining(expected));
  });

  it('04 when the status of an existing journey is updated to started the repository updates it', async () => {
    const journeyRepository = new JourneyRepository();
    const newJourney = new JourneyModel(journey);
    const savedJourney = await newJourney.save();
    const startDate = Date.now();

    const journeyInfo = {
      status: 'start',
      finishOn: startDate,
    };
    const result = await journeyRepository.updateJourneyInfo(journeyInfo,savedJourney._id);

    expect(result._id.toString()).toBe(savedJourney._id.toString());
    expect(result.status).toBe('start');
    expect(result.finishOn.toString()).toBe(new Date(startDate).toString());
  });

  it('05 when the status of an existing journey is updated to accepted the repository updates it', async () => {
    const journeyRepository = new JourneyRepository();
    const newJourney = new JourneyModel(journey);
    const savedJourney = await newJourney.save();

    const journeyInfo = {
      status: 'accepted'
    };
    const result = await journeyRepository.updateJourneyInfo(journeyInfo,savedJourney._id);

    expect(result._id.toString()).toBe(savedJourney._id.toString());
    expect(result.status).toBe('accepted');

  });

  it('06 when the status of an existing journey is updated to cancelled the repository updates it', async () => {
    const journeyRepository = new JourneyRepository();
    const newJourney = new JourneyModel(journey);
    const savedJourney = await newJourney.save();

    const journeyInfo = {
      status: 'cancelled'
    };
    const result = await journeyRepository.updateJourneyInfo(journeyInfo,savedJourney._id);

    expect(result._id.toString()).toBe(savedJourney._id.toString());
    expect(result.status).toBe('cancelled');

  });

  it('07 when the status of an existing journey is updated to finished the repository updates it', async () => {
    const journeyRepository = new JourneyRepository();
    const newJourney = new JourneyModel(journey);
    const savedJourney = await newJourney.save();
    const finishDate = Date.now();

    const journeyInfo = {
      status: 'finish',
      finishOn: finishDate,
    };
    const result = await journeyRepository.updateJourneyInfo(journeyInfo,savedJourney._id);

    expect(result._id.toString()).toBe(savedJourney._id.toString());
    expect(result.status).toBe('finish');
    expect(result.finishOn.toString()).toBe(new Date(finishDate).toString());
  });

  it('08 when the status of a non-existing journey the repository returns error updates it', async () => {
    const journeyRepository = new JourneyRepository();

    const journeyInfo = {
      status: 'cancelled'
    };
    const result = await journeyRepository.updateJourneyInfo(journeyInfo,new ObjectId("aaaaaaaaaaaa"));

    expect(result).toBe(null);

  });
});
