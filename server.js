require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const morgan = require('morgan');

// Set up PostgreSQL connection
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const env = process.env.NODE_ENV || 'development';
const logFormat = env === 'production' ? 'combined' : 'dev';

const app = express();
app.use(bodyParser.json());
app.use(morgan(logFormat));

// Route handlers
app.get('/', (req, res) => {
  res.send('Hello world');
});

app.post('/count', async (req, res) => {
  const value = req.body.value;
  if (value < 0 || value > 5) {
    res.status(400).json({error: 'Invalid input'});
  } else {
    await pool.query('INSERT INTO counters(count) VALUES($1)', [value]);
    res.status(200).send();
  }
});

app.get('/count', async (req, res) => {
  const result = await pool.query('SELECT COUNT(*) FROM counters');
  res.json(result.rows[0].count);
});

module.exports = app;

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
