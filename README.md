# widget-rating-api

This project provides a simple API for rating widgets using Express and Postgres as a backend.

- `GET /api` returns a list of all widgets
- `GET /api/<id>` return a widget by ID
- `POST /api/new` create a new widget, provide the name via body JSON `{"name": "whatever"}`
- `POST /api/rate/<id>` rate a widget from 1 to 5 with body `{"rating": number}`
- `GET /api/summary/<id>` returns rating info



## Running
`bootstrap.sh` will start Docker containers for the `backend` and `middleware`.  By default the middleware will bind to port 3000 on the Docker host, you can change this binding in `bootstrap.sh` as required.  There are no provisions for volumes for the database so it will be blank when restarted (see Docker volumes or data containers for that)

`cleanup.sh` will tear down the Docker containers

There is a test harness in the `middleware` directory, where `npm test` will handle the setup and teardown and run unit tests.
