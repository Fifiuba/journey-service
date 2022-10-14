const {app} = require('./app');
require('dotenv').config();
const {JourneyDatabase} = require('./database/database');

const PORT = process.env.PORT || 9000;
const db = new JourneyDatabase();
db.connectDB();
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
process.on('SIGINT', function() {
  db.disconnectDB();
});

