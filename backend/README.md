## backend

### Starting
```
export DB_PASSWORD=<whatever you want>
docker build . -t cmbrehm-db
docker run --rm --name cmbrehmdb -e POSTGRES_PASSWORD=$DB_PASSWORD -d cmbrehm-db:latest
```

### Stopping
```
docker stop cbrehmdb
```

### Notes

There is no provision for persistence across invocations.
