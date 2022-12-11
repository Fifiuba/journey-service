const mongoose = require('mongoose');


class JourneyDatabase {
  async connectDB() {
    try {
      await mongoose.connect('mongodb://root:root@mongodb:27017', {
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
