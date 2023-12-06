const request = require('supertest');
const app = require('./server');

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
  it('responds with count of records in the table', async () => {
    const response = await request(app).get('/count');
    expect(parseInt(response.text)).toBeGreaterThanOrEqual(0);
  });
});
