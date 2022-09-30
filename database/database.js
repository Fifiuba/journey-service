const {MongoClient} = require('mongodb')
//require('dotenv').config()

const database = new MongoClient('mongodb://root:root@mongodb:27017/');

async function run (){

  try{

    await database.connect();
    await database.db("admin").command({ping:1});
    console.log("Connected successfully to server");
  } finally{

    await database.close();
  }
}

run().catch(console.dir);

module.exports = {database}