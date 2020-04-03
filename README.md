# ASB Backend Developer Test

ASB Backend Developer Test
## Installation


```bash
npm install

```

## Start the app
```bash
node app.js
```

## Seeding the Db


```bash
sequelize db:seed:all

```

## Documentation

```nodejs
 http:{your ip address}:{your port}/api-docs
```

## Testing

```node
npm run test
npm run testRoute (End to end)
npm run testController
```
## Sample .env file

```
DEV_DATABASE_URL=postgres://postgres: @127.0.0.1/adb_test
TEST_DATABASE_URL=postgres://postgres: @127.0.0.1/adb_test
IP="127.0.0.1"
PORT=8080
DB="adb_test"
DB_USER=postgres
DB_PASSWORD="' '"
```