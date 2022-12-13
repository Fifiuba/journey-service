const mongoose = require('mongoose');


class JourneyDatabase {
  async connectDB() {
    try {
      await mongoose.connect('mongodb://'+process.env.ME_CONFIG_MONGODB_ADMINUSERNAME+':'+
      process.env.ME_CONFIG_MONGODB_ADMINPASSWORD+'@'+
      process.env.ME_CONFIG_MONGODB_SERVER+':'+
      process.env.ME_CONFIG_MONGODB_PORT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        auth: {
          authSource: 'admin',
        },
        user: process.env.ME_CONFIG_MONGODB_ADMINUSERNAME,
        pass: process.env.ME_CONFIG_MONGODB_ADMINPASSWORD,
        dbName: 'Journey_db',

      });
      console.log('Mongodb connected...');
    } catch (error) {
      console.log();
    }
  }


  async disconnectDB() {
    await mongoose.disconnect().then(() => {
      console.log('Mongodb disconnected...');
    });
  }
}


module.exports = {JourneyDatabase};
