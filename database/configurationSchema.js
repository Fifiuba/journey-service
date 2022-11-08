const mongoose = require('mongoose');
const {Schema} = mongoose;

const ConfigurationSchema = new Schema ({
    price: Number,
    radial_distance: Decimal128,
    unit: String,
});

  const ConfigurationModel = mongoose.model('Configuration', ConfigurationSchema);
  
  module.exports = {ConfigurationModel};