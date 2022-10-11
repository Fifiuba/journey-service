const {JourneyModel} = require("../database/database")

export async function getJourneyById(id){
    var journey = await JourneyModel.findById(id, function (err){
      return err;
    }).clone().catch(function(err){ console.log(err)});
  
    return journey;
  }
  
export async function getJourneys(){
  
    return await JourneyModel.find()
  }

//module.exports = {getJourneyById, getJourneys}