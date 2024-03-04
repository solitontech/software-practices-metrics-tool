import request from 'supertest';
import { jest, describe, it, expect } from '@jest/globals';

import app from '../../../../src/index.js';
import { AppError } from '../../../../src/utils/app-error.js';
import { AzureDevopsApi } from '../../../../src/services/version-control-system/azure-devops/apis/azure-devops.js';

import { AZURE_PULL_REQUESTS_RESPONSE, SERVER_PULL_REQUESTS_RESPONSE } from './pull-requests.mock.js';
import { SERVER_ERROR_MESSAGE, STATUS_CODE } from '../../../../src/constants/index.js';
import { runDatePaginationValidationTests } from '../../common-tests/date-pagination-tests.js';

const { invalidRepositoryDetails, invalidAzureToken, dataNotFound } = AzureDevopsApi;

jest.mock('../../../../src/services/version-control-system/azure-devops/apis/azure-devops.js');

describe('Trunk based metrics - get all the pull requests raised to the trunk branch within selected range in the repository', () => {
  const apiEndPoint = '/api/v1/metrics/trunk-based-development/pullRequests';
  const startDate = '2021-01-01';
  const endDate = '2021-12-31';
  const paginationCursor = '1';
  const paginationSize = '100';
  const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

  it('should return all the pull requests raised to the trunk branch within selected range for the repository with response status code 200', async () => {
    AzureDevopsApi.fetchPullRequestsList = jest.fn().mockResolvedValue(AZURE_PULL_REQUESTS_RESPONSE);

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.OK);
    expect(response.body).toEqual(SERVER_PULL_REQUESTS_RESPONSE);
  });

  it('should handle no data found error due to invalid server configurations with response status 404', async () => {
    AzureDevopsApi.fetchPullRequestsList = jest
      .fn()
      .mockRejectedValue(new AppError(invalidRepositoryDetails, STATUS_CODE.NOT_FOUND));

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.NOT_FOUND);
    expect(response.body).toEqual({
      error: invalidRepositoryDetails,
    });
  });

  it('should handle no data found error with response status 404', async () => {
    AzureDevopsApi.fetchPullRequestsList = jest
      .fn()
      .mockRejectedValue(new AppError(dataNotFound, STATUS_CODE.NOT_FOUND));

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.NOT_FOUND);
    expect(response.body).toEqual({
      error: dataNotFound,
    });
  });

  it('should handle unauthorized access with response status 401', async () => {
    AzureDevopsApi.fetchPullRequestsList = jest
      .fn()
      .mockRejectedValue(new AppError(invalidAzureToken, STATUS_CODE.UNAUTHORIZED_ACCESS));

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.UNAUTHORIZED_ACCESS);
    expect(response.body).toEqual({
      error: invalidAzureToken,
    });
  });

  it('should handle internal server error with response status 500', async () => {
    AzureDevopsApi.fetchPullRequestsList = jest
      .fn()
      .mockRejectedValue(new Error(SERVER_ERROR_MESSAGE.INTERNAL_SERVER_ERROR));

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.INTERNAL_SERVER_ERROR);
    expect(response.body).toEqual({ error: SERVER_ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
  });

  runDatePaginationValidationTests(app, apiEndPoint);
});
