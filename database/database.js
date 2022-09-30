const mongoose = require('mongoose');
const { Schema } = mongoose;

//Each schema maps to a MongoDB collection and defines the shape of the documents within that collection
const JourneySchema = new Schema({
  att: String
});

//To use our schema definition, we need to convert it into a Model we can work with
//Instances of Models are documents
const JourneyModel = mongoose.model('Journey', JourneySchema);
module.exports = {JourneyModel}