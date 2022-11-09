const {ConfigurationModel} = require('../database/configurationSchema');
class ConfigurationRepository {
  // if the document does not exist, it does not
  // create so all the fields are set correctly
  async editConfiguration(update) {
    const config = await ConfigurationModel
        .findOneAndUpdate({}, update, {new: true})
        .clone().catch(function(err) {
          console.log(err);
        });

    return config;
  }

  async getConfiguration() {
    const config = await ConfigurationModel.findOne({});
    return config;
  }

  async setConfiguration(parameters) {
    const alreadySetConfiguration = await ConfigurationModel.findOne({});
    if (alreadySetConfiguration) {
      return await this.editConfiguration(parameters)
    }

    const config = new ConfigurationModel(parameters);
    let error;
    try {
      await config.save();
    } catch (err) {
      error = err;
      console.log(error);
    }
    return config;
  }
}

module.exports = {ConfigurationRepository};
