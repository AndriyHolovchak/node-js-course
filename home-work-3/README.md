# Home work 3

## Before start server

    npm install

## Start server:

    node restServer.js

    Expected result should be: "server start at port 3000"

## Endpoint which returns events from csv file in json

    curl --request GET 'http://localhost:3000/events' --header 'Content-Type: application/json'

## Filter events by location

    curl --request GET 'http://localhost:3000/events?location=kiev' --header 'Content-Type: application/json'

## Endpoint for getting some specific event by id.

    curl --request GET 'http://localhost:3000/events/3' --header 'Content-Type: application/json'

## Endpoint for saving new event to the csv file.

    curl --request POST 'http://localhost:3000/events' --header 'Content-Type: application/json' --data-raw '{"id": 6, "title":"new Event", "location": "lviv", "date": "12/10/2020", "hour": 3}'

## Endpoint for replacing specific event data in csv file.

    curl --request PUT 'http://localhost:3000/events/4' --header 'Content-Type: application/json' --data-raw '{"title":"updated Event", "location": "kiev", "date": "10/10/2020", "hour": 1}'

## Endpoint which returns all events in json format via streaming directly from csv file.

    curl --request GET 'http://localhost:3000/events-batch' --header 'Content-Type: application/json'
