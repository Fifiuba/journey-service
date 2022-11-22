const request = require('supertest');
const {app} = require('../app');
const {connectDB, dropDB, dropCollections} = require('./testDatabase/testDatabase');
const journey = require('./testFiles/journey.json');
const anotherJourney = require('./testFiles/anotherJourney.json');
const {JourneyModel} = require('../database/journeySchema');
const {ConfigurationModel} = require('../database/configurationSchema');
const buenosAiresJourney = require('./testFiles/buenosAiresJourney.json');
const pilarJourney = require('./testFiles/pilarJourney.json');
const configuration = require('./testFiles/configuration.json')

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

  it ('GET info for a journey returns the price', async () => {
    const config = new ConfigurationModel(configuration)
    await config.save()
    await request(app).get('/journey/info?distance=5&modality=standar').expect(200).then((response) => {
      expect(response.body.price).toBe(1000);
    });
  })

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
    const config = new ConfigurationModel(configuration);
    const savedConfig = await config.save();

    await request(app).get('/journey/requested?location=-34.5854348,-58.400238').expect(200).then((response) => {
      expect(response.body.length).toBe(1);
      expect(response.body[0]._id.toString()).toBe(savedJourney._id.toString());
    });
  });


  it('cannot UPDATE journey status accepted to an already accepted journey', async () => {
    journey.status = 'accepted'
    const newJourney = new JourneyModel(journey);
    const savedJourney = await newJourney.save();
    
    
    await request(app).patch('/journey/accept/' + savedJourney._id.toString()).expect(200).then((response) => {
      expect(response.body.status).toContain('taken');
    });
  });

  it('cannot UPDATE journey status cancelled to an already started journey', async () => {
    journey.status = 'started'
    const newJourney = new JourneyModel(journey);
    const savedJourney = await newJourney.save();
    
    
    await request(app).patch('/journey/cancel/' + savedJourney._id.toString()).expect(200).then((response) => {
      expect(response.body.status).toContain('start');
    });
  });


  it('Cannot UPDATE non existing configuration', async () => {

    await request(app).patch('/journey/config/').expect(404).set({body: configuration}).then((response) => {
      expect(response.res.text).toBe('No configuration setting was found');
    });
  });

  it('UPDATE existing configuration updates correctly', async () => {

    const config = new ConfigurationModel(configuration);
    const savedConfig = await config.save();

    let updatedConfiguration = {
      base_price: 300,
      radial_distance: 3,
    }


    await request(app).patch('/journey/config/').expect(200).send(updatedConfiguration).then((response) => {
      expect(response.body.base_price).toBe(300);
      expect(response.body.radial_distance).toBe(3);
    });
  });


  it('GET non existing configuration returns not found message', async () => {

    await request(app).get('/journey/config/').expect(404).then((response) => {
      expect(response.res.text).toBe('No configuration setting was found');
    });
    
  });
  
  it('GET existing configuration returns it correctly', async () => {

    const config = new ConfigurationModel(configuration);
    const savedConfig = await config.save();

    await request(app).patch('/journey/config/').expect(200).then((response) => {
      expect(response.body.base_price).toBe(200);
      expect(response.body.radial_distance).toBe(2);
    });
  });


});