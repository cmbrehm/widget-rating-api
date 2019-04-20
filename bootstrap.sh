#!/bin/bash
export PSPASSWORD=fji2mfnriejver8qfj3tg
docker build backend -t backend
docker build middleware -t middleware
docker run -d --rm --name backend backend:latest
docker run -d -p 3000:3000 --rm --name middleware --link backend:db --env PGHOST=db --env PGUSER=postgres --env PGPASSWORD=${PGPASSWORD} middleware:latest
