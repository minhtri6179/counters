Hello World
---

A simple Nodejs API service that connects to a PostgreSQL database

## Setup
- Create a new database in PostgreSQL, for example `counters`
- Create the table in the database with the SQL in `create_table.sql`

- Copy the `.env.sample` to `.env` and update it with the database credential
- Install nodejs packages

```
npm install
```

## Usage
- Start in dev mode
```
npm run dev
```
By default, the app can be accessed at http://localhost:3000

- Run test
```
npm test
```

- Start the server in production mode
```
npm run start
```

- Run the linter
```
npm run lint
```
