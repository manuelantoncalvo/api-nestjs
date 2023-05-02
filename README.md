## Installation

Execute in working directory

```bash
$  docker-compose up
```

for build docker images.

Enter in node docker container
```bash
$ docker exec -it node bash
```

## Running the app

```bash
$ cd api-nestjs
$ npm install
$ npm run start
```

Execute curl to get a valid JWT token:

LOGIN and GET Bearer token:
```curl
curl --location 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data '{
"username": "mcalvo",
"password": "123456"
}'
```

and then, execute:

GET user  by ID:
```curl
curl --location --request GET 'http://localhost:3000/users/1' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1jYWx2byIsInN1YiI6MSwiaWF0IjoxNjgyOTc0NjIzfQ.6kGoLQOgcynsf1gJ6koiGo5GVVN8FojEWKQMZ1Mdrv8' \
--data '{
    "username": "mcalvo",
    "password": "123456"
}'
```

Another endpoints:

Create new user:
```curl
curl --location 'http://localhost:3000/users/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1jYWx2byIsInN1YiI6MSwiaWF0IjoxNjgyOTg4MzQ0fQ.bH-EWLSpNyU9yAPI721E-CjieFlRRwixyM_j9RqHED4' \
--data '{
    "username": "Juan",
    "password": "123456",
    "first_name": "Juan",
    "last_name": "Perez",
    "address": "Corrientes 1223",
    "city_id": "1"
}'
```

List all users:
```curl
curl --location 'http://localhost:3000/users' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1jYWx2byIsInN1YiI6MSwiaWF0IjoxNjgyOTc0NjIzfQ.6kGoLQOgcynsf1gJ6koiGo5GVVN8FojEWKQMZ1Mdrv8'
```

## Test

```bash
# functional tests
$ npm run test
```