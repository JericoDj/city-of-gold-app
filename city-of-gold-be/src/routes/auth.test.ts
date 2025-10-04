// src/routes/auth.test.ts
import request from 'supertest';
import app from '../app'; // Make sure this exports your Express app

describe('POST /api/auth/login', () => {
  it('should fail with invalid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'dejesusjerico528@gmail.com', password: 'Jerico123' });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid credentials');
  });
});
