const {JourneyModel} = require("../database/database")

async function getJourneyById(id){
    var journey = await JourneyModel.findById(id, function (err){
      return err;
    }).clone().catch(function(err){ console.log(err)});
    
    if (!journey) return {error: "journey not found"};
    return journey;
    
  }

async function getJourneys(){
  
    return await JourneyModel.find();
  }

module.exports = {getJourneyById, getJourneys}