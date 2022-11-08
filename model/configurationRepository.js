const {ConfigurationModel} = require('../database/configurationSchema');

class ConfigurationRepository {

    async editConfiguration(update){
        let config = await ConfigurationModel.findOneAndUpdate({}, update);
        return config;
    }

    async getConfiguration(){
        let config = await ConfigurationModel.findOne({});
        return config;
    }
  
}

module.exports = {ConfigurationRepository};
