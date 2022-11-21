const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
/* const swaggerJSDoc = */require('swagger-jsdoc');
const swaggerSpec = require('./swagger.json');

let serviceInfo = {
  "service": "Journey service!",
  "created_on": "9-9-2022",
  "description": "Journey service is responsible for managing requested journeys and requested info for a journey"
}

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/journey', routes.journeyRouter);


app.get('/', (req, res) => {

  res.send(serviceInfo);
});

module.exports = {app};
