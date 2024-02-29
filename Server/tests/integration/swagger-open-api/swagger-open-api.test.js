import { describe, it, expect } from '@jest/globals';
import request from 'supertest';

import app from '../../../src/index.js';

describe('Swagger Open API Route - get Swagger UI for metrics tool server endpoints', () => {
  it('should return Swagger UI HTML with a 200 status code for GET requests', async () => {
    const response = await request(app).get('/swagger-open-api/');

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Swagger UI');
  });
});
