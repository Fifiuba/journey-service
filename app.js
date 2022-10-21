const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerSpec = require("./swagger.json");
// const swaggerSpec = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'API-Journey',
//       version: '1.0.0',
//     },
//     servers: [
//       {
//         url: 'http://localhost:9000',
//       },
//     ],
//   },
//   apis: [`${__dirname}/routes/index.js`],
// };

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/journey', routes.journeyRouter);


app.get('/', (req, res) => {
  res.send('Journey service!');
});

module.exports = {app};
