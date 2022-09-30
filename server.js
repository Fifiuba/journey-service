const {app} = require('./app');
const mongoose = require('mongoose')

const PORT = process.env.PORT || 9000;

connect();
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

async function connect(){
    await mongoose.connect('mongodb://root:root@mongodb:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      auth: {
        authSource: "admin"
      },
      user: "root",
      pass: "root",
      dbName: 'journey_db',

    }).then(() => {
      console.log('Mongodb connected...');
    })  
  }