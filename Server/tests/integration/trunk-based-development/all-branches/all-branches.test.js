import request from 'supertest';
import { jest, describe, it, expect } from '@jest/globals';

import app from '../../../../src/index.js';
import { AppError } from '../../../../src/utils/app-error.js';
import { AzureDevopsApi } from '../../../../src/services/version-control-system/azure-devops/apis/azure-devops.js';

import { AZURE_ALL_BRANCHES_RESPONSE, SERVER_BRANCHES_RESPONSE } from './all-branches.mock.js';
import { SERVER_ERROR_MESSAGE, STATUS_CODE } from '../../../../src/constants/index.js';

const { invalidRepositoryDetails, invalidAzureToken } = AzureDevopsApi;

jest.mock('../../../../src/services/version-control-system/azure-devops/apis/azure-devops.js');

describe('Trunk based metrics - get all branches in the repository', () => {
  const apiEndPoint = '/api/v1/metrics/trunk-based-development/branches';

  it('should return all branches for the repository with response status code 200', async () => {
    AzureDevopsApi.fetchAllBranches = jest.fn().mockResolvedValue(AZURE_ALL_BRANCHES_RESPONSE);

    const response = await request(app).get(apiEndPoint);

    expect(response.statusCode).toBe(STATUS_CODE.OK);
    expect(response.body).toEqual(SERVER_BRANCHES_RESPONSE);
  });

  it('should handle internal server error with response status 500', async () => {
    AzureDevopsApi.fetchAllBranches = jest
      .fn()
      .mockRejectedValue(new Error(SERVER_ERROR_MESSAGE.INTERNAL_SERVER_ERROR));

    const response = await request(app).get(apiEndPoint);

    expect(response.statusCode).toBe(STATUS_CODE.INTERNAL_SERVER_ERROR);
    expect(response.body).toEqual({ error: SERVER_ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
  });

  it('should handle no data found error due to invalid server configurations with response status 404', async () => {
    AzureDevopsApi.fetchAllBranches = jest
      .fn()
      .mockRejectedValue(new AppError(invalidRepositoryDetails, STATUS_CODE.NOT_FOUND));

    const response = await request(app).get(apiEndPoint);

    expect(response.statusCode).toBe(STATUS_CODE.NOT_FOUND);
    expect(response.body).toEqual({
      error: invalidRepositoryDetails,
    });
  });

  it('should handle unauthorized access with response status 401', async () => {
    AzureDevopsApi.fetchAllBranches = jest
      .fn()
      .mockRejectedValue(new AppError(invalidAzureToken, STATUS_CODE.UNAUTHORIZED_ACCESS));

    const response = await request(app).get(apiEndPoint);

    expect(response.statusCode).toBe(STATUS_CODE.UNAUTHORIZED_ACCESS);
    expect(response.body).toEqual({
      error: invalidAzureToken,
    });
  });
});
