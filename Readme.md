# Monoard

A simple Web Application to manage your finances. Allows for importing your bank account movements as csv, sort them by budget and much more.

## SetUp

Monoard runs complete within docker containers, so the only thing you need to run Monoard is [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/).

Steps needed to run Monoard:
- Clone the Repository to whereever you want it
- Copy `.env.example` to a new `.env` File and update the Settings as you wish
- Copy `docker-compose.override.yaml.example` to `docker-compose.override.yaml` and update as you wish
- Run `docker-compose up`
- Open your browser and browse to the Port you set in `docker-compose.override.yaml`
