import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import request from 'supertest';
import app from '../../../index.js'; // Adjust the path according to your project structure
import { AzureDevopsApi } from '../../../services/version-control-system/azure-devops/apis/azure-devops.js';
import { AZURE_ALL_BRANCHES, BRANCHES_RESPONSE } from '../mock-data/branches.js';
import { STATUS_CODE } from '../../../constants/constants.js';

jest.mock('../../../services/version-control-system/azure-devops/apis/azure-devops.js');

describe('GET /branches', () => {
  beforeEach(() => {
    AzureDevopsApi.fetchAllBranches = jest.fn().mockResolvedValue(AZURE_ALL_BRANCHES);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the correct data', async () => {
    await request(app)
      .get('/api/v1/metrics/trunk-based-development/branches')
      .then((response) => {
        expect(response.statusCode).toBe(STATUS_CODE.OK);
        expect(response.body).toEqual(BRANCHES_RESPONSE);
      });
  });
});
