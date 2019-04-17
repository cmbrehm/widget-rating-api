FROM postgres:latest
COPY ddl/ /docker-entrypoint-initdb.d
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["postgres"]
