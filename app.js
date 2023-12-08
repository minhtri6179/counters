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

const env = process.env.NODE_ENV || 'development';
const logFormat = env === 'production' ? 'combined' : 'dev';

const app = express();
// parse body to json
app.use(bodyParser.json());

// log requests
app.use(morgan(logFormat));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack trace to the console
  res.status(500).json({ message: 'Internal server error' }); // Respond with status 500 and JSON message
});

// Route handlers
app.get('/', (req, res) => {
  res.send('Hello world');
});

// Create a new count
app.post('/count', async (req, res, next) => {
  const value = req.body.value;
  if (value < 0 || value > 5) {
    res.status(400).json({error: 'Invalid input'});
  } else {
    try {
      await pool.query('INSERT INTO counters(count) VALUES($1)', [value]);
      res.status(200).send();
    } catch (err) {
      next(err); // Pass the error to the error handling middleware
    }
  }
});

// Get Count
app.get('/count', async (req, res, next) => {
  try {
    const value = req.query.value;
    const result = await pool.query('SELECT COUNT(*) FROM counters WHERE count = $1', [value]);
    res.send(result.rows[0].count);
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
});

module.exports = app;
