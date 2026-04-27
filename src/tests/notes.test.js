const request = require('supertest');
const app = require('../app');

// Mock the DB - fake responses so we don't need real Postgres in pipeline
jest.mock('../db', () => ({
  pool: {
    query: jest.fn(),
  },
  initDB: jest.fn(),
}));

const { pool } = require('../db');

// Test 1: Health check
describe('Health Check', () => {
  it('GET /health should return ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

// Test 2: Notes endpoints
describe('Notes API', () => {
  beforeEach(() => jest.clearAllMocks());

  it('GET /notes returns list of notes', async () => {
    pool.query.mockResolvedValue({ rows: [{ id: 1, title: 'Test', content: 'Hello' }] });
    const res = await request(app).get('/notes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /notes creates a note', async () => {
    pool.query.mockResolvedValue({ rows: [{ id: 1, title: 'Test', content: 'Hello' }] });
    const res = await request(app).post('/notes').send({ title: 'Test', content: 'Hello' });
    expect(res.statusCode).toBe(201);
  });

  it('POST /notes returns 400 if title missing', async () => {
    const res = await request(app).post('/notes').send({ content: 'Hello' });
    expect(res.statusCode).toBe(400);
  });

  it('DELETE /notes/:id deletes a note', async () => {
    pool.query.mockResolvedValue({ rows: [{ id: 1, title: 'Test', content: 'Hello' }] });
    const res = await request(app).delete('/notes/1');
    expect(res.statusCode).toBe(200);
  });

  it('GET /notes/:id returns 404 if not found', async () => {
    pool.query.mockResolvedValue({ rows: [] });
    const res = await request(app).get('/notes/999');
    expect(res.statusCode).toBe(404);
  });
});
