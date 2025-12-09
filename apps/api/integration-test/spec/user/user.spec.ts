import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { resetDatabase } from '../../util/database-util';

describe('User API', () => {
  let app: INestApplication;

  beforeAll(() => {
    app = globalThis.__APP__;

    resetDatabase();
  });

  it('should return 200 for GET /users', async () => {
    const res = await request(app.getHttpServer()).get('/users');
    expect(res.status).toBe(200);
    // Optionally check response body
    // expect(res.body).toEqual([...]);
  });
});
