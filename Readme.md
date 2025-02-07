# Replik

This application is a website that allows users to listen to podcasts from a MongoDB database via a Node API and to add new ones through an admin panel.

## Context

This application was created for Replik, the MMI group of the 3rd year at the IUT of Laval, class of 2024-2025.

## Project Setup

First you'll need to install all node modules

```sh
npm i && cd api && npm i
```

Then you can edit the code as you want

## Deployement

This project work with Docker docker need to be installed on host.

```sh
docker compose --profiles build up
```

This will launch the backend on docker containers and build the front directly on the host

### Docker Compose Variables & Build Args

| Name                       | Default                    | Description                      |
|----------------------------|----------------------------|----------------------------------|
| **VITE_BASE_URL**          | `/replik`                  | Base path for the front-end      |
| **VITE_OUT_DIR**           | `/usr/src/app/`            | Output directory for front       |
| **VITE_API_URL**           | `http://localhost:8000/api`| API endpoint location            |
| **AUTH_USER** (build arg)  | `admin`                    | Example auth user for the API    |
| **AUTH_PASSWORD** (build arg) | `12345`                 | Example auth password for the API|
| **MONGO_INITDB_ROOT_USERNAME** | `root`                 | Mongo root username              |
| **MONGO_INITDB_ROOT_PASSWORD** | `admin`                | Mongo root password              |