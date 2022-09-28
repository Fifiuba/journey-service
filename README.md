# journey-service
---

[![GitHub issues](https://img.shields.io/github/issues/Fifiuba/journey-service?&style=flat-square)](https://github.com/Fifiuba/journey-service/issues)
[![GitHub license](https://img.shields.io/github/license/Fifiuba/journey-service?&style=flat-square)](https://github.com/Fifiuba/journey-service/blob/main/LICENSE)

## Docker commands

To build the container:  

```
$ sh build_journey.sh
```

To run the image:  

```
$ sh startJourney.sh
```

Then the app can be accessed from https://localhost:9000  

To stop the container first check the container id (from a new terminal):  
 
```
$ sudo docker ps
```

Then to stop it enter (on the same console):  

```
$ sudo docker stop <image-id>
```

## Database Model
```bash 
id_user
car_info : {type: id: id_driver: car_model: license_plate:}
trip_status (requested, cancelled, finished, ongoing)
startTime
endTime
price
route : {to: from:}

```

![](https://www.plantuml.com/plantuml/png/ROz12W8n34NtFKKlq2iC0xeI1F46eOrGo3IG9iWWtjr1SR2jNVx_UB-PguAeBUHS9AZLdzYauEhTmps_sKLon0DGD09b-QsEUHEKlkraLpP5QPHdJa1Prq_MSY7nlOHfcFrBxQQ-dlPJl7UToWV2csx8-FqH7IUQxFrcBCaMUW40)