import request from 'supertest';
import { describe, it, expect } from '@jest/globals';

import { ServerConfiguration } from '../../../src/configs/server.config.js';
import app from '../../../src/index.js';

describe('Client-filters - get client filters configured in server-config.json', () => {
  it('should return client filters(squads) configured in server-config.json with response status code 200', async () => {
    const response = await request(app).get('/api/v1/metrics/client-filters');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(ServerConfiguration.clientFilters);
  });
});
