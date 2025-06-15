const request = require('supertest');
const app = require('./app.cjs');

describe('API routes', () => {
  it('POST /api/auth/login should return success with credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: '1234' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ success: true });
  });

  it('GET /api/checklist should return items', async () => {
    const res = await request(app).get('/api/checklist');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ items: ['item1', 'item2'] });
  });
});
