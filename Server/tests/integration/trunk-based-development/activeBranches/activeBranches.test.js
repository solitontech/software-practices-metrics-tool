import request from 'supertest';
import { jest, describe, it, expect } from '@jest/globals';

import { AzureDevopsApi } from '../../../../src/services/version-control-system/azure-devops/apis/azure-devops.js';
import { AZURE_ACTIVE_BRANCHES_RESPONSE, SERVER_ACTIVE_BRANCHES_RESPONSE } from './activeBranches.mock.js';
import { STATUS_CODE } from '../../../../src/constants/constants.js';
import app from '../../../../src/index.js';

const { OK } = STATUS_CODE;

jest.mock('../../../../src/services/version-control-system/azure-devops/apis/azure-devops.js');

describe('Trunk based metrics - get all branches in the repository', () => {
  const api = '/api/v1/metrics/trunk-based-development/activeBranches';

  it('should return active branches for the repository with response status code 200', async () => {
    AzureDevopsApi.fetchActivePullRequests = jest.fn().mockResolvedValue(AZURE_ACTIVE_BRANCHES_RESPONSE);

    const paginationSize = 10;
    const paginationCursor = 1;

    const response = await request(app).get(
      `${api}?paginationSize=${paginationSize}&paginationCursor=${paginationCursor}`
    );

    expect(response.statusCode).toBe(OK);
    expect(response.body).toEqual(SERVER_ACTIVE_BRANCHES_RESPONSE);
  });
});
