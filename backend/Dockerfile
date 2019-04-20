FROM postgres:latest
COPY ddl/ /docker-entrypoint-initdb.d
EXPOSE 5432
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["postgres"]
