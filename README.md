# journey-service
---

[![GitHub issues](https://img.shields.io/github/issues/Fifiuba/journey-service?&style=flat-square)](https://github.com/Fifiuba/journey-service/issues)
[![GitHub license](https://img.shields.io/github/license/Fifiuba/journey-service?&style=flat-square)](https://github.com/Fifiuba/journey-service/blob/main/LICENSE)


### App
Se trata del servicio de viajes, donde se puede crear, aceptar, rechazar, consultar un viaje.

### Tecnologias

#### Lenguajes y librerias
* Version de npm (version 6.14.12)

#### Base de datos

* Mongodb 
* Modelo
        ```bash 
        id_user
        car_info : {type: id: id_driver: car_model: license_plate:}
        trip_status (requested, cancelled, finished, ongoing)
        startTime
        endTime
        price
        route : {to: from:}
        ```

#### Responsables

* Sol Fontenla 
* Agustina Segura
* Alejo Villores
* Celeste Diturio
* Franco 

### Desarrollo

#### Ambiente de desarrollo

* Instrucciones para instalar herramientas
    * npm: [install](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
    * docker: [install](https://docs.docker.com/engine/install/)
    * docker-compose: [install](https://docs.docker.com/compose/install/)

* Instrucciones para configurar el ambiente de desarrollo
    * Se levanta con sh.startJourney.sh
    * se debe crear un .env. Utilizar el .env.example como guia

#### Estructura del proyecto 

* El projecto posee las siguientes carpetas:
    * test: contiene los test del servicio 
    * routes: posee los distintos endpoints
    * model: posee el modelo del viaje, un repocitorio y logicas de la entidad viajes
    * errors: contiene disntinas excepciones

    ![](https://www.plantuml.com/plantuml/png/ROz12W8n34NtFKKlq2iC0xeI1F46eOrGo3IG9iWWtjr1SR2jNVx_UB-PguAeBUHS9AZLdzYauEhTmps_sKLon0DGD09b-QsEUHEKlkraLpP5QPHdJa1Prq_MSY7nlOHfcFrBxQQ-dlPJl7UToWV2csx8-FqH7IUQxFrcBCaMUW40)

* Arquitectura: 

### Testing 

* Pasos para correr los test
    ```bash
    npm test 
    ```

* Pasos para correr app localmente 
    ```
    npm install
    npm start
    ``` 
