# Nodejs-TypeScript-Sequelize-Postgres

## Quick Start

- [Install Depedencies](#Install-Dependencies)
- Configure Database & all [Prerequisites](#Prerequisites).
- Configure [Environments](#Setting-up-environments).
- Run [CLI](#Start-CLI)
- Onboard a new Service.
- Store `accessToken` for future use.
- Open API [Swagger Documentation](#API-Documentation).
- Start Playing.

<br>
<hr>

## Prerequisites

- Install [Postgres SQL](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04).

- Postgres version used at the time of development is 12.5

- Install [PgAdmin 4](https://askubuntu.com/a/1041976).

- Create user with `username: root, password: root`.

- Create Database `example`.

## Setting up environments

- Add a new object in `nodemon.json`

```
{
  "env" : {
    "NODE_ENV": "DEV | UAT | PROD | LOCAL",
  }
}
```

- The environments are managed in `/enviroments/.env.{{NODE_ENV}}` file.

```
APP_ID=nodets-starter
LOG_LEVEL=debug
REQUEST_LIMIT=100kb
OPENAPI_SPEC=/v1/spec

DB_USERNAME=postgres
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=5432
DB_NAME=example
REPLICATION=0

API_KEY='Q6cKTotM4C6Rf4L8MTkRKg=='
VALIDATE_API_KEY=0

SESSION_SECRET='Q6cKTotM4C6Rf4L8MTkRKg=='
SESSION_EXPIRY='24h'
REFRESH_TOKEN_EXPIRY='7d'

HTTPS_ONLY=-0
AUTH=0
```

Note:- Update `DB_USERNAME` & `DB_PASSWORD` with the respective user you created for your database.

<br>
<hr>

## Install Dependencies

Install all package dependencies (one time operation)

```
npm install
```

<br>
<hr>

## Start CLI

```
npm run cli
```

<br>
<hr>

## Run Project

#### Run in _development_ mode:

Runs the application is development mode. Should not be used in production

```shell
npm run dev
```

or debug it

```shell
npm run dev:debug
```

#### Run in _production_ mode:

Compiles the application and starts it in production production mode.

```shell
npm run compile
npm start
```

<br>
<hr>

## Testing

Run the Mocha unit tests

```shell
npm test
```

or debug them

```shell
npm run test:debug
```

<br>
<hr>

## Linting & Formatting Verify

```
npm run husky
```

<br>
<hr>



## API Documentation

- Open you're browser to `http://localhost:{PORT}/api` for API documentation.

<br>
<hr>



Update `launch.json` file with the below configurations.

```
{
    "version": "0.2.0",
    "configurations": [
        {
          "type": "node",
          "request": "attach",
          "name": "Node: Nodemon",
          "processId": "${command:PickProcess}",
          "restart": true,
          "protocol": "inspector"
        }
    ]
}

```


## Migration

#### RUN Migrations
```
npm run db:migrate
```

#### UNDO Migrations
```
npm run db:migrate:undo
```

#### CREATE DB
```
npm run db:create
```

Note:- Permissions are required to create DB. 
