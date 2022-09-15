const routes = require('./routes/routes.js')
const bodyParser = require('body-parser')
const path = require('path')
const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerSpec = {
    definition : {
        openapi: "3.0.0",
        info: {
            title: "API-Journey",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:9000"
            }
        ]
    },
    apis: [`${__dirname}/routes/routes.js`],  
};


const app = express()


app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerSpec)));
app.use("/journeys",routes.journeyRouter);

app.get('/example', (req, res) => {
   res.send('Hello World');
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
