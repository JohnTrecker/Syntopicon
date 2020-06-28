# Syntopicon GraphQL/REST API


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
│   ├── lua                   # Application Lua code
│   ├── nginx                 # Nginx configuration files
│   ├── html                  # Static frontend files
│   └── Dockerfile            # Dockerfile definition for building custom production images
├── tests                     # Tests for all the components
│   ├── db                    # pgTap tests for the db
│   ├── graphql               # GraphQL interface tests
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

The API server will become available at the following endpoints:

- REST [http://localhost:8080/rest/](http://localhost:8080/rest/)
- GraphiQL IDE [http://localhost:8080/graphiql/](http://localhost:8080/graphiql/)
- GraphQL Simple Schema [http://localhost:8080/graphql/simple/](http://localhost:8080/graphql/simple/)
- GraphQL Relay Schema [http://localhost:8080/graphql/relay/](http://localhost:8080/graphql/relay/)

Try a simple request

```bash
curl http://localhost:8080/rest/topics?select=id,name
```

Try a GraphQL query in the integrated GraphiQL IDE at [http://localhost:8080/graphiql/](http://localhost:8080/graphiql/)

```
{
  topics{
    id
    name
  }
}
```

## Development workflow and debugging

Execute `subzero dashboard` in the root of your folder.<br />
After this step you can view the logs of all the stack components (SQL queries will also be logged) and
if you edit a sql/conf/lua file in your project, the changes will immediately be applied.


## Testing

The starter kit comes with a testing infrastructure setup.
You can write pgTAP tests that run directly in your database, useful for testing the logic that resides in your database (user privileges, Row Level Security, stored procedures).
Integration tests are written in JavaScript.

Here is how you run them

```bash
npm install                     # Install test dependencies
npm test                        # Run all tests (db, rest, graphql)
npm run test_db                 # Run pgTAP tests
npm run test_rest               # Run rest integration tests
npm run test_graphql            # Run graphql integration tests
```

## Deployment
* [subZero Cloud](http://docs.subzero.cloud/production-infrastructure/subzero-cloud/)
* [Amazon ECS+RDS](http://docs.subzero.cloud/production-infrastructure/aws-ecs-rds/)
* [Amazon Fargate+RDS](http://docs.subzero.cloud/production-infrastructure/aws-fargate-rds/)
* [Dedicated Linux Server](https://docs.subzero.cloud/production-infrastructure/ubuntu-server/)

## Contributing

Anyone and everyone is welcome to contribute.

## Support and Documentation
* [Documentation](https://docs.subzero.cloud)
* [PostgREST API Referance](https://postgrest.com/en/stable/api.html)
* [PostgreSQL Manual](https://www.postgresql.org/docs/current/static/index.html)

## License

This source code in this repository is licensed under [MIT](https://github.com/subzerocloud/subzero-starter-kit/blob/master/LICENSE.txt) license<br />
Components implementing the GraphQL interface (customized PostgREST and OpenResty docker images) are available under a [commercial license](https://subzero.cloud)<br />
The documentation to the project is licensed under the [CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/) license.

