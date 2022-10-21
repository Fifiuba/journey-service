const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerSpec = require("./swagger.json");

app.use(cors());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/journey', routes.journeyRouter);


app.get('/', (req, res) => {
  res.send('Journey service!');
});

module.exports = {app};
