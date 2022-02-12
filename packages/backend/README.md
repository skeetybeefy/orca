## Installation

Prerequisites:

- NodeJS 16.14.0 LTS
- Yarn
- Docker

```bash
# cd to working directory and type yarn to install dependencies
$ yarn
```

## Running the app

```bash
# creating local env files
$ cp example.docker.env docker.env
$ cp example.env .env

# starting docker containers with postgresql and pgadmin
$ docker-compose up

# watch mode (for development)
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Default URLs

```bash
# API
localhost:4000

# SwaggerUI
localhost:4000/api

# PGAdmin
localhost:8080
```
