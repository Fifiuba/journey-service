const {ConfigurationRepository} = require('../model/configurationRepository');
const {ConfigurationModel} = require('../database/configurationSchema');
const {connectDB, dropDB, dropCollections} = require('./testDatabase/testDatabase');
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

  it('01 getting configuration from not already set returns null', async () => {
    const configurationRepository = new ConfigurationRepository();
    const config = await configurationRepository.getConfiguration();

    expect(config).toBe(null);
  });

  it('02 getting configuration already set returns it correctly', async () => {
    const configurationRepository = new ConfigurationRepository();
    const newConfig = new ConfigurationModel(configuration);
    const savedConfig = await newConfig.save();

    const config = await configurationRepository.getConfiguration();

    expect(config.base_price).toBe(newConfig.base_price);
      expect(config.radial_distance).toBe(newConfig.radial_distance);
  });

  it('03 editing configuration no already set returns null', async () => {
    const configurationRepository = new ConfigurationRepository();
    let updatedConfiguration = {
        base_price: 300,
        radial_distance: 3,
    }  

    const config = await configurationRepository.editConfiguration(updatedConfiguration);

    expect(config).toBe(null);
  });

  it('04 editing configuration already set returns it correctly', async () => {
    const configurationRepository = new ConfigurationRepository();
    const newConfig = new ConfigurationModel(configuration);
    const savedConfig = await newConfig.save();

    let updatedConfiguration = {
        base_price: 300,
        radial_distance: 3,
    }

    const config = await configurationRepository.editConfiguration(updatedConfiguration);

    expect(config.base_price).toBe(updatedConfiguration.base_price);
    expect(config.radial_distance).toBe(updatedConfiguration.radial_distance);
  });


  it('05 setting configuration sets it correctly', async () => {
    const configurationRepository = new ConfigurationRepository();
    const config = await configurationRepository.setConfiguration(configuration);

    const setConfig = await ConfigurationModel.findOne({});

    expect(config.base_price).toBe(setConfig.base_price);
    expect(config.radial_distance).toBe(setConfig.radial_distance);
  });


  it('06 setting configuration when it was already set updates the old one', async () => {
    const configurationRepository = new ConfigurationRepository();
    const config = await configurationRepository.setConfiguration(configuration);

    let updatedConfiguration = {
        base_price: 300,
        radial_distance: 3,
    }

    const setConfig = await configurationRepository.setConfiguration(updatedConfiguration);
    const amountOfdocuments = await ConfigurationModel.find({}).count();
    expect(updatedConfiguration.base_price).toBe(setConfig.base_price);
    expect(updatedConfiguration.radial_distance).toBe(setConfig.radial_distance);
    expect(amountOfdocuments).toBe(1);

  });
});