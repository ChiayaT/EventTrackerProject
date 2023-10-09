# EventTrackerProject


## Overview

The purpose of this project was to allow users (me) to upload blogs or posts about my day. The app will allow the user to create, delete, update, and view posts through http methods that connect to the rest api via URIs, interacting with the database,

## Technologies Used
- Git/Github
- SpringToolSuite4/Spring/Spring Boot
- MAMP 
- MySQL/MySQL Workbench
- Gradle/Hibernate/JPA
- Resp Api 
- Post man
- HTTP

## Lessons Learned
* I further solidified my understanding of get, post, pull, delete methods and how they connected through service implementions in order to get the methods.

* I also learned that when deleting and updateing a similar find(object) function must be used in order to check if there is a correlating object that exists within the current database in order to give a 404 message.

### Endpoints
|HTTP Verb|URI            |Response Body      |Status            |
|---------|---------------|-------------------|------------------|
|GET      |'/api/days'    |List of Days       |200               |
|GET      |'/api/days/1'  |Single Day         |200 or 404        |
|POST     |'/api/days'    |JSON of created Day|201 or 400        |
|PUT      |'/api/days/1'  |JSON of updated Day|200 or 404, or 400|
|Delete   |'/api/days/1'  |                   |204 or 404, or 400|