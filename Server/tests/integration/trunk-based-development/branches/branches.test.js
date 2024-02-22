import request from 'supertest';
import { jest, describe, it, expect, beforeAll } from '@jest/globals';

import { AzureDevopsApi } from '../../../../src/services/version-control-system/azure-devops/apis/azure-devops.js';
import { AZURE_ALL_BRANCHES_RESPONSE, SERVER_BRANCHES_RESPONSE } from './branches.mock.js';
import { STATUS_CODE } from '../../../../src/constants/constants.js';
import app from '../../../../src/index.js';

jest.mock('../../../../src/services/version-control-system/azure-devops/apis/azure-devops.js');

describe('Trunk based metrics - get all branches in the repository', () => {
  beforeAll(() => {
    AzureDevopsApi.fetchAllBranches = jest.fn().mockResolvedValue(AZURE_ALL_BRANCHES_RESPONSE);
  });

  it('should return all branches for the repository with response status code 200', async () => {
    await request(app)
      .get('/api/v1/metrics/trunk-based-development/branches')
      .then((response) => {
        expect(response.statusCode).toBe(STATUS_CODE.OK);
        expect(response.body).toEqual(SERVER_BRANCHES_RESPONSE);
      });
  });
});
