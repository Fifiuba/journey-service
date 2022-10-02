const {app} = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 9000;


async function connect() {
  await mongoose.connect('mongodb://root:root@mongodb:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
      authSource: 'admin',
    },
    user: process.env.ME_CONFIG_MONGODB_ADMINUSERNAME,
    pass: process.env.ME_CONFIG_MONGODB_ADMINPASSWORD,
    dbName: 'Journey_db',

  }).then(() => {
    console.log('Mongodb connected...');
  });
}

connect();
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
