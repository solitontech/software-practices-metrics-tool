import request from 'supertest';
import { jest, describe, it, expect } from '@jest/globals';

import { AzureDevopsApi } from '../../../../src/services/version-control-system/azure-devops/apis/azure-devops.js';
import { AZURE_ALL_BRANCHES_RESPONSE, SERVER_BRANCHES_RESPONSE } from './branches.mock.js';
import { ERROR_MESSAGE, STATUS_CODE } from '../../../../src/constants/constants.js';
import app from '../../../../src/index.js';
import { AppError } from '../../../../src/utils/app-error.js';

const { OK, INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED_ACCESS } = STATUS_CODE;
const { invalidRepositoryDetails, invalidAzureToken } = AzureDevopsApi;

jest.mock('../../../../src/services/version-control-system/azure-devops/apis/azure-devops.js');

describe('Trunk based metrics - get all branches in the repository', () => {
  const api = '/api/v1/metrics/trunk-based-development/branches';

  it('should return all branches for the repository with response status code 200', async () => {
    AzureDevopsApi.fetchAllBranches = jest.fn().mockResolvedValue(AZURE_ALL_BRANCHES_RESPONSE);

    const response = await request(app).get(api);

    expect(response.statusCode).toBe(OK);
    expect(response.body).toEqual(SERVER_BRANCHES_RESPONSE);
  });

  it('should handle internal server error when fetching branches from Azure API', async () => {
    AzureDevopsApi.fetchAllBranches = jest.fn().mockRejectedValue(new Error(ERROR_MESSAGE.INTERNAL_SERVER_ERROR));

    const response = await request(app).get(api);

    expect(response.statusCode).toBe(INTERNAL_SERVER_ERROR);
    expect(response.body).toEqual({ error: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
  });

  it('should handle no data found error due to invalid server configurations when fetching branches from Azure API', async () => {
    AzureDevopsApi.fetchAllBranches = jest.fn().mockRejectedValue(new AppError(invalidRepositoryDetails, NOT_FOUND));

    const response = await request(app).get(api);

    expect(response.statusCode).toBe(NOT_FOUND);
    expect(response.body).toEqual({
      error: invalidRepositoryDetails,
    });
  });

  it('should handle unauthorized access when fetching branches from Azure API', async () => {
    AzureDevopsApi.fetchAllBranches = jest.fn().mockRejectedValue(new AppError(invalidAzureToken, UNAUTHORIZED_ACCESS));

    const response = await request(app).get(api);

    expect(response.statusCode).toBe(UNAUTHORIZED_ACCESS);
    expect(response.body).toEqual({
      error: invalidAzureToken,
    });
  });
});
