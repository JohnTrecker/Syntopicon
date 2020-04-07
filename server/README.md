# Syntopicon REST API Server



## Features

✓ Cross-platform development on macOS, Windows or Linux inside [Docker](https://www.docker.com/)<br>
✓ [PostgreSQL](https://www.postgresql.org/) database schema boilerplate with authentication and authorization flow<br>
✓ [OpenResty](https://openresty.org/en/) configuration files for the reverse proxy<br>
✓ [RabbitMQ](https://www.rabbitmq.com/) integration through [pg-amqp-bridge](https://github.com/subzerocloud/pg-amqp-bridge)<br>
✓ [Lua](https://www.lua.org/) functions to hook into each stage of the HTTP request and add custom logic (integrate 3rd party systems)<br>
✓ Debugging and live code reloading (sql/configs/lua) functionality using [subzero-cli](https://github.com/subzerocloud/subzero-cli)<br>
✓ Full migration management (migration files are automatically created) through [subzero-cli](https://github.com/subzerocloud/subzero-cli)/[sqitch](http://sqitch.org/)/[apgdiff](https://github.com/subzerocloud/apgdiff)<br>
✓ SQL unit test using [pgTAP](http://pgtap.org/)<br>
✓ Integration tests with [SuperTest / Mocha](https://github.com/visionmedia/supertest)<br>
✓ Docker files for building production images<br>

## Directory Layout

```bash
.
├── db                        # Database schema source files and tests
│   └── src                   # Schema definition
│       ├── api               # Api entities avaiable as REST endpoints
│       ├── data              # Definition of source tables that hold the data
│       ├── libs              # A collection modules of used throughout the code
│       ├── authorization     # Application level roles and their privileges
│       ├── sample_data       # A few sample rows
│       └── init.sql          # Schema definition entry point
├── openresty                 # Reverse proxy configurations and Lua code
│   ├── lualib
│   │   └── user_code         # Application Lua code
│   ├── nginx                 # Nginx files
│   │   ├── conf              # Configuration files
│   │   └── html              # Static frontend files
│   ├── Dockerfile            # Dockerfile definition for production
│   └── entrypoint.sh         # Custom entrypoint
├── tests                     # Tests for all the components
│   ├── db                    # pgTap tests for the db
│   └── rest                  # REST interface tests
├── docker-compose.yml        # Defines Docker services, networks and volumes
└── .env                      # Project configurations

```



## Installation

### Prerequisites
* [Docker](https://www.docker.com)
* [Node.js](https://nodejs.org/en/)
* [subZero CLI](https://github.com/subzerocloud/subzero-cli#install)

### Start Server
In the root folder of application, run the docker-compose command

```bash
docker-compose up -d
```

The API server will become available at the following endpoint:

- REST [http://localhost:8080/rest/](http://localhost:8080/rest/)

Try a simple request

```bash
curl http://localhost:8080/rest/topics?select=id,name
```


## Development workflow and debugging

Execute `subzero dashboard` in the root folder.<br />
After this step you can view the logs of all the stack components (SQL queries will also be logged) and
if you edit a sql/conf/lua file in your project, the changes will immediately be applied.


## Testing

```bash
npm install                     # Install test dependencies
npm test                        # Run all tests (db, rest)
npm run test_db                 # Run pgTAP tests
npm run test_rest               # Run integration tests
```


## Deployment
* [Amazon ECS+RDS](http://docs.subzero.cloud/production-infrastructure/aws-ecs-rds/)
* [Amazon Fargate+RDS](http://docs.subzero.cloud/production-infrastructure/aws-fargate-rds/)
* [Dedicated Linux Server](https://docs.subzero.cloud/production-infrastructure/ubuntu-server/)

## Contributing

Anyone and everyone is welcome to contribute.

## Todo:

[] implement RLS on api.references
[] write tests
[] implement circle ci
[] configure env vars

## Support and Documentation
* [subZero Documentation](https://docs.subzero.cloud/postgrest-starter-kit/)
* [PostgREST API Referance](https://postgrest.com/en/stable/api.html)
* [PostgreSQL Manual](https://www.postgresql.org/docs/current/static/index.html)
* [GitHub Issues](https://github.com/johntrecker/syntopicon/server/issues) — Check open issues, send feature requests

## License

The documentation to the project is licensed under the [CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/) license.

