const chai = require('chai');
const supertest = require('supertest');
const app = require('../app');

const { expect } = chai;
const request = supertest(app);

describe('GET /', () => {
  it('responds with "Hello world"', async () => {
    const response = await request.get('/');
    expect(response.status).to.equal(200);
    expect(response.text).to.equal('Hello world');
  });
});

describe('POST /count', () => {
  it('should create a new count', async () => {
    const response = await request.post('/count').send({ value: 3 });
    expect(response.status).to.equal(200);
  });

  it('responds with 400 on invalid input', async () => {
    const response = await request.post('/count').send({ value: 6 });
    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({ error: 'Invalid input' });
  });
});

describe('GET /count', () => {
  it('responds with 200 on valid input', async () => {
    const response = await request.get('/count').query({ value: 3 });
    expect(response.status).to.equal(200);
    expect(response.text).to.be.a('string');
  });
});
