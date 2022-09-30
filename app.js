const express = require('express');
const app = express();
const mongoose = require('mongoose')
const routes = require('./routes');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerSpec = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API-Journey',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:9000',
      },
    ],
  },
  apis: [`${__dirname}/routes/routes.js`],
};


app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerSpec)));
app.use('/journey', routes.journeyRouter);

app.get('/', (req, res) => {
  res.send('Journey service!');
});

module.exports = {app};
