# journey-service
---
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/Fifiuba/journey-service/test?label=build&style=flat-square&logo=GitHub)](https://github.com/Fifiuba/journey-service/commits)
[![codecov](https://codecov.io/gh/Fifiuba/journey-service/branch/main/graph/badge.svg?token=WQLIP37828)](https://codecov.io/gh/Fifiuba/journey-service)
[![GitHub issues](https://img.shields.io/github/issues/Fifiuba/journey-service?&style=flat-square)](https://github.com/Fifiuba/journey-service/issues)
[![GitHub license](https://img.shields.io/github/license/Fifiuba/journet-service?&style=flat-square)](https://github.com/Fifiuba/journey-service/blob/main/LICENSE)
## Docker commands

To build the container:  

```
$ sh build_journey.sh
```

To run the image:  

```
$ sh startJourney.sh
```

Then the app can be accessed from https://localhost:8001  

To stop the container first check the container id (from a new terminal):  
 
```
$ sudo docker ps
```

Then to stop it enter (on the same console):  

```
$ sudo docker stop <image-id>
```
