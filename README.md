# journey-service
---
[![main CI](https://github.com/Fifiuba/journey-service/actions/workflows/main.yml/badge.svg?branch=develop)](https://github.com/Fifiuba/journey-service/actions/workflows/main.yml)  

[![codecov](https://codecov.io/gh/Fifiuba/journey-service/branch/develop/graph/badge.svg?token=dJ20t7hz7j)](https://app.codecov.io/gh/Fifiuba/journey-service/tree/develop)  

[![Develop on Okteto](https://okteto.com/develop-okteto.svg)](https://journey-service-solfonte.cloud.okteto.net/)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/Fifiuba/api-gateway-service/blob/develop/LICENSE)


# [API URL](https://journey-service-solfonte.cloud.okteto.net/)  

### App

This is the journey service used to handle all the request for the journeys. Some of the request are : create, update, read a journey

### Technologies
* Node version 1.0.0
* Docker version 20.10.17
* Docker compose version 2.6.0
* Eslint 1.3.3
* Libraries
    * Express
    * cors
    * jsonwebtoken
    * http-errors
    * dotenv
    * swagger-ui-express
    * mongoose
    * supertest
* External services
    * Okteto
    * codecov

#### Data Base
* Mongodb 

### Developers
|Name                | Email                |
|--------------------|----------------------|
| Agustina Segura    | asegura@fi.uba.ar    |
| Alejo villores     | avillores@fi.uba.ar  |
| Maria Sol Fontela  | msfontenla@fi.uba.ar |

### Development

#### Development Environment

* Instructions for installing tools
    * node: [install](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
    * docker: [install](https://docs.docker.com/engine/install/)
    * docker-compose: [install](https://docs.docker.com/compose/install/)

* Intructions to get the service running in a docker container
    * Install all the tools use in the project
    * You will need to add a .env file. Use .env.example as guide
    * To build and run the user service execute the following commands
        ```bash
        docker compose build
        docker compose up
        ```
    This will start the app's container
    * After stopping the execution, you must run 
        ```bash 
        docker compose down -v
        ```

    * You can also use startJourney.sh to run the journey service and to stop it use stopJourney.sh
    

#### Project Structure

* 
```
│
├─── app.js
├─── README.md
├─── server.js
├─── startJourney.sh
├─── stopJourney.sh 
├─── swagger.json
├─── .github 
├─── .coverage
├─── database 
│       ├── configurationSchema.js
│       ├── database.js 
│       └──journeySchema.js
│
├─── errors 
│       └──invalid_parameters.js
├─── model 
│       ├── auth.sj
│       ├── configurationRepository.js
│       ├── distanceCalculator.js
│       ├── journyeManager.js
│       ├── journeyRepository.js
│       ├── modality.js
│       └── proceCalculator.js
│
├───routes
│       └── index.js
│
├───test
│   │   ├── app.test.js
│   │   ├── auth.test.js
│   │   ├── configurationRepository.test.js
│   │   ├── journeyManager.test.js
│   │   ├── journeyRespository.test.js
│   │   └── price_calculator.test.js
│   │
│   ├───testDatabase
│   │       testDatabase.js
│   │
│   └───testFiles
│           ├── anotherJourney.json
│           ├── buenosAiresJourney.json
│           ├── configuration.json
│           ├── journey.json
│           └── pilarJourney.json
│
└───utils
        logger.js
```
    ![](https://www.plantuml.com/plantuml/png/ROz12W8n34NtFKKlq2iC0xeI1F46eOrGo3IG9iWWtjr1SR2jNVx_UB-PguAeBUHS9AZLdzYauEhTmps_sKLon0DGD09b-QsEUHEKlkraLpP5QPHdJa1Prq_MSY7nlOHfcFrBxQQ-dlPJl7UToWV2csx8-FqH7IUQxFrcBCaMUW40)


### Testing 

* Steps to run the test 
    ```bash
    npm test 
    ```

### Run the APP
* Steps to run app locally 
    ```
    npm install
    npm start
    ``` 

## Deployment

To deploy the app:  
1. Connect [Okteto](https://www.okteto.com/) to your github account.
2. Go to the project folder
3. Run 
```
npm run deploy`
```
