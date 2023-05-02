FROM node:latest

ENTRYPOINT ["/bin/sh","-c", "while true; do sleep 1; done "]

RUN docker run -d -p 3306:3306 -e ON_CREATE_DB="api_nestjs"
