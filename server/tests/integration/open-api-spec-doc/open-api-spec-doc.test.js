import { describe, it, expect } from '@jest/globals';
import request from 'supertest';

import app from '##/frameworks/express-web-server/app.js';

describe('Swagger Open API Route - get Swagger UI for metrics tool server endpoints', () => {
  it('should return Swagger UI HTML with a 200 status code for GET requests', async () => {
    const response = await request(app).get('/open-api-spec-doc/');

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Swagger UI');
  });
});
