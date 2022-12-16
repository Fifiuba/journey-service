const mongoose = require('mongoose');
const {Schema} = mongoose;

const ConfigurationSchema = new Schema({
  base_price: {
    type: Number,
    required: true,
  },
  radial_distance: {
    type: Number,
    required: true,
  },
});

const ConfigurationModel = mongoose.model('Configuration', ConfigurationSchema);

module.exports = {ConfigurationModel};
