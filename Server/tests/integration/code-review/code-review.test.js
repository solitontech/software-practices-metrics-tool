import request from 'supertest';
import { jest, describe, it, expect } from '@jest/globals';

import { AzureDevopsApi } from '../../../src/services/version-control-system/azure-devops/apis/azure-devops.js';
import { AZURE_PULL_REQUESTS_RESPONSE, SERVER_PULL_REQUESTS_RESPONSE } from './code-review.mock.js';
import { ERROR_MESSAGE, STATUS_CODE } from '../../../src/constants/constants.js';
import app from '../../../src/index.js';
import { AppError } from '../../../src/utils/app-error.js';

const { invalidRepositoryDetails, invalidAzureToken, dataNotFound } = AzureDevopsApi;

jest.mock('../../../src/services/version-control-system/azure-devops/apis/azure-devops.js');

describe('Code review metrics - get all pull requests raised to trunk branch in the repository', () => {
  const apiEndPoint = '/api/v1/metrics/code-review';

  it('should return all pull requests for the repository with response status code 200', async () => {
    AzureDevopsApi.fetchPullRequests = jest.fn().mockResolvedValue(AZURE_PULL_REQUESTS_RESPONSE);

    const startDate = '2021-01-01';
    const endDate = '2021-12-31';
    const paginationCursor = '1';
    const paginationSize = '100';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.OK);
    expect(response.body).toEqual(SERVER_PULL_REQUESTS_RESPONSE);
  });

  it('should handle when all query parameters are missing with response status 400', async () => {
    const response = await request(app).get(apiEndPoint);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({ error: "'endDate' is required | 'startDate' is required" });
  });

  it('should handle when startDate & endDate is missing with response status 400', async () => {
    const paginationCursor = '1';
    const paginationSize = '100';
    const queryParams = `?paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({ error: "'endDate' is required | 'startDate' is required" });
  });

  it('should handle when paginationSize & paginationCursor is missing with response status 400', async () => {
    const startDate = '2021-01-01';
    const endDate = '2021-12-31';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({ error: "'paginationCursor' is required | 'paginationSize' is required" });
  });

  it('should handle when startDate is missing with response status 400', async () => {
    const endDate = '2021-12-31';
    const paginationCursor = '1';
    const paginationSize = '100';
    const queryParams = `?endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({ error: "'startDate' is required" });
  });

  it('should handle when endDate is missing with response status 400', async () => {
    const startDate = '2021-01-01';
    const paginationCursor = '1';
    const paginationSize = '100';
    const queryParams = `?startDate=${startDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({
      error: "'endDate' is required | 'startDate' date references 'ref:endDate' which must have a valid date format",
    });
  });

  it('should handle when endDate is in the future with response status 400', async () => {
    const startDate = '2021-01-01';
    const endDate = '9999-12-31'; // future date
    const paginationCursor = '1';
    const paginationSize = '100';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
  });

  it('should handle when startDate is greater than endDate with response status 400', async () => {
    const startDate = '2021-12-31';
    const endDate = '2021-01-01';
    const paginationCursor = '1';
    const paginationSize = '100';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({ error: "'startDate' must be less than or equal to 'ref:endDate'" });
  });

  it('should handle when paginationCursor is missing with response status 400', async () => {
    const startDate = '2021-01-01';
    const endDate = '2021-12-31';
    const paginationSize = '100';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({ error: "'paginationCursor' is required" });
  });

  it('should handle when paginationSize is missing with response status 400', async () => {
    const startDate = '2021-01-01';
    const endDate = '2021-12-31';
    const paginationCursor = '1';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({ error: "'paginationSize' is required" });
  });

  it('should handle when paginationSize is less than 1 with response status 400', async () => {
    const startDate = '2021-01-01';
    const endDate = '2021-12-31';
    const paginationCursor = '1';
    const paginationSize = '0';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({ error: "'paginationSize' must be greater than or equal to 1" });
  });

  it('should handle when paginationCursor is less than 1 with response status 400', async () => {
    const startDate = '2021-01-01';
    const endDate = '2021-12-31';
    const paginationCursor = '0';
    const paginationSize = '100';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({ error: "'paginationCursor' must be greater than or equal to 1" });
  });

  it('should handle when paginationSize & paginationCursor is less than 1 with response status 400', async () => {
    const startDate = '2021-01-01';
    const endDate = '2021-12-31';
    const paginationCursor = '0';
    const paginationSize = '0';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({
      error:
        "'paginationCursor' must be greater than or equal to 1 | 'paginationSize' must be greater than or equal to 1",
    });
  });

  it('should handle when startDate is not in valid date format with response status 400', async () => {
    const startDate = '2021-01-32'; // invalid date
    const endDate = '2021-12-31';
    const paginationCursor = '1';
    const paginationSize = '100';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({
      error: "'startDate' must be in YYYY-MM-DD format",
    });
  });

  it('should handle when endDate is not in valid date format with response status 400', async () => {
    const startDate = '2021-01-01';
    const endDate = '2021-12-32'; // invalid date
    const paginationCursor = '1';
    const paginationSize = '100';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({
      error:
        "'endDate' must be in YYYY-MM-DD format | 'startDate' date references 'ref:endDate' which must have a valid date format",
    });
  });

  it('should handle when startDate & endDate is not in valid date format with response status 400', async () => {
    const startDate = '2021-01-32'; // invalid date
    const endDate = '2021-12-32'; // invalid date
    const paginationCursor = '1';
    const paginationSize = '100';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({
      error: "'endDate' must be in YYYY-MM-DD format | 'startDate' must be in YYYY-MM-DD format",
    });
  });

  it('should handle when paginationCursor is not a number with response status 400', async () => {
    const startDate = '2021-01-01';
    const endDate = '2021-12-31';
    const paginationCursor = 'one'; // invalid number
    const paginationSize = '100';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({ error: "'paginationCursor' must be a number" });
  });

  it('should handle when paginationSize is not a number with response status 400', async () => {
    const startDate = '2021-01-01';
    const endDate = '2021-12-31';
    const paginationCursor = '1';
    const paginationSize = 'one'; // invalid number
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({ error: "'paginationSize' must be a number" });
  });

  it('should handle when paginationCursor & paginationSize is not a number with response status 400', async () => {
    const startDate = '2021-01-01';
    const endDate = '2021-12-31';
    const paginationCursor = 'one'; // invalid number
    const paginationSize = 'one'; // invalid number
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({
      error: "'paginationCursor' must be a number | 'paginationSize' must be a number",
    });
  });

  it('should handle no data found error due to invalid server configurations with response status 404', async () => {
    AzureDevopsApi.fetchPullRequests = jest
      .fn()
      .mockRejectedValue(new AppError(invalidRepositoryDetails, STATUS_CODE.NOT_FOUND));

    const startDate = '2021-01-01';
    const endDate = '2021-12-31';
    const paginationCursor = '1';
    const paginationSize = '100';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.NOT_FOUND);
    expect(response.body).toEqual({
      error: invalidRepositoryDetails,
    });
  });

  it('should handle no data found error with response status 404', async () => {
    AzureDevopsApi.fetchPullRequests = jest.fn().mockRejectedValue(new AppError(dataNotFound, STATUS_CODE.NOT_FOUND));

    const startDate = '2021-01-01';
    const endDate = '2021-12-31';
    const paginationCursor = '1';
    const paginationSize = '100';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.NOT_FOUND);
    expect(response.body).toEqual({
      error: dataNotFound,
    });
  });

  it('should handle unauthorized access with response status 401', async () => {
    AzureDevopsApi.fetchPullRequests = jest
      .fn()
      .mockRejectedValue(new AppError(invalidAzureToken, STATUS_CODE.UNAUTHORIZED_ACCESS));

    const startDate = '2021-01-01';
    const endDate = '2021-12-31';
    const paginationCursor = '1';
    const paginationSize = '100';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.UNAUTHORIZED_ACCESS);
    expect(response.body).toEqual({
      error: invalidAzureToken,
    });
  });

  it('should handle internal server error with response status 500', async () => {
    AzureDevopsApi.fetchPullRequests = jest.fn().mockRejectedValue(new Error(ERROR_MESSAGE.INTERNAL_SERVER_ERROR));

    const startDate = '2021-01-01';
    const endDate = '2021-12-31';
    const paginationCursor = '1';
    const paginationSize = '100';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.INTERNAL_SERVER_ERROR);
    expect(response.body).toEqual({ error: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
  });
});
