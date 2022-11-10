const {app} = require('./app');
require('dotenv').config();
const {JourneyDatabase} = require('./database/database');
const {ConfigurationRepository} = require('./model/configurationRepository')
const defaultJourneyConfig = require('./defaultJourneyConfig.json')

const PORT = process.env.PORT || 9000;
const db = new JourneyDatabase();
const configurationRepository = new ConfigurationRepository();
db.connectDB();
configurationRepository.setConfiguration(defaultJourneyConfig)

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
process.on('SIGINT', function() {
  db.disconnectDB();
});

