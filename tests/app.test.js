const request = require('supertest');
const app = require('../app');
const { Pool } = require('pg');

let pool;
let server;

describe('Running test', () => {
  beforeAll(() => {
    pool = new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    server = app.listen(3030);
  });
  
  afterAll(done => {
    pool.end(done);  // close db connection
    server.close(done);
  });

  describe('GET /', () => {
    it('responds with Hello world', (done) => {
      request(app)
        .get('/')
        .expect('Hello world', done);
    });
  });
  
  describe('POST /count', () => { 
    it('responds with 400 on invalid input', (done) => {
      request(app)
        .post('/count')
        .send({value: 6})
        .expect(400, done);
    });
  
    it('responds with 200 on valid input', (done) => {
      request(app)
        .post('/count')
        .send({value: 4})
        .expect(200, done);
    });
  });
  
  describe('GET /count', () => {
    it('responds with count of records in the table more than 0', async () => {
      const response = await request(app).get('/count');
      expect(parseInt(response.text)).toBeGreaterThanOrEqual(0);
    });

    it('responds with 0 when counting out-of-range value', async () => {
      const response = await request(app).get('/count?value=6');
      expect(parseInt(response.text)).toBe(0);
    });
  });
});
