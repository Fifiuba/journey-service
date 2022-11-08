const {ConfigurationModel} = require('../database/configurationSchema');

class ConfigurationRepository {

    async editRadialDistance(distance){
        let filter = {};
        let update = {radial_distance: distance}
        let config = await ConfigurationModel.findOneAndUpdate(filter, update);
        return config;
    }
  
}

module.exports = {ConfigurationRepository};
