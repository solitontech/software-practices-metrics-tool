import request from 'supertest';
import { jest, describe, it, expect } from '@jest/globals';

import { AzureDevopsApi } from '../../../src/services/version-control-system/azure-devops/apis/azure-devops.js';
import { AZURE_PULL_REQUESTS_RESPONSE, SERVER_PULL_REQUESTS_RESPONSE } from './code-review.mock.js';
import { ERROR_MESSAGE, STATUS_CODE } from '../../../src/constants/constants.js';
import app from '../../../src/index.js';
import { AppError } from '../../../src/utils/app-error.js';
import {
  PAGINATION_SIZE_MUST_BE_NUMBER,
  PAGINATION_CURSOR_SIZE_MUST_BE_NUMBER,
  PAGINATION_CURSOR_MUST_BE_NUMBER,
  PAGINATION_CURSOR_REQUIRED,
  PAGINATION_SIZE_REQUIRED,
  PAGINATION_CURSOR_SIZE_REQUIRED,
  PAGINATION_SIZE_MUST_BE_GREATER_THAN_ZERO,
  PAGINATION_CURSOR_SIZE_MUST_BE_GREATER_THAN_ZERO,
  PAGINATION_CURSOR_MUST_BE_GREATER_THAN_ZERO,
  INVALID_START_DATE_FORMAT,
  INVALID_END_DATE_FORMAT,
  INVALID_START_END_DATE_FORMAT,
  START_DATE_REQUIRED,
  END_DATE_REQUIRED,
  START_END_DATE_REQUIRED,
  START_DATE_LESS_THAN_END_DATE,
} from '../constants/common-constants.js';

const { invalidRepositoryDetails, invalidAzureToken, dataNotFound } = AzureDevopsApi;

jest.mock('../../../src/services/version-control-system/azure-devops/apis/azure-devops.js');

describe('Code review metrics - get all pull requests raised to trunk branch in the repository', () => {
  const apiEndPoint = '/api/v1/metrics/code-review';

  it('should return all pull requests within selected range for the repository with response status code 200', async () => {
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

  it('should return error when all query parameters are missing with response status 400', async () => {
    const response = await request(app).get(apiEndPoint);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({ error: START_END_DATE_REQUIRED });
  });

  it('should return error when startDate & endDate is missing with response status 400', async () => {
    const paginationCursor = '1';
    const paginationSize = '100';
    const queryParams = `?paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({ error: START_END_DATE_REQUIRED });
  });

  it('should return error when paginationSize & paginationCursor is missing with response status 400', async () => {
    const startDate = '2021-01-01';
    const endDate = '2021-12-31';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({ error: PAGINATION_CURSOR_SIZE_REQUIRED });
  });

  it('should return error when startDate is missing with response status 400', async () => {
    const endDate = '2021-12-31';
    const paginationCursor = '1';
    const paginationSize = '100';
    const queryParams = `?endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({ error: START_DATE_REQUIRED });
  });

  it('should return error when endDate is missing with response status 400', async () => {
    const startDate = '2021-01-01';
    const paginationCursor = '1';
    const paginationSize = '100';
    const queryParams = `?startDate=${startDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({
      error: END_DATE_REQUIRED,
    });
  });

  it('should return error when endDate is in the future with response status 400', async () => {
    const startDate = '2021-01-01';
    const endDate = '9999-12-31'; // future date
    const paginationCursor = '1';
    const paginationSize = '100';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
  });

  it('should return error when startDate is greater than endDate with response status 400', async () => {
    const startDate = '2021-12-31';
    const endDate = '2021-01-01';
    const paginationCursor = '1';
    const paginationSize = '100';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({ error: START_DATE_LESS_THAN_END_DATE });
  });

  it('should return error when paginationCursor is missing with response status 400', async () => {
    const startDate = '2021-01-01';
    const endDate = '2021-12-31';
    const paginationSize = '100';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({ error: PAGINATION_CURSOR_REQUIRED });
  });

  it('should return error when paginationSize is missing with response status 400', async () => {
    const startDate = '2021-01-01';
    const endDate = '2021-12-31';
    const paginationCursor = '1';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({ error: PAGINATION_SIZE_REQUIRED });
  });

  it('should return error when paginationCursor & paginationSize is missing with response status 400', async () => {
    const startDate = '2021-01-01';
    const endDate = '2021-12-31';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({ error: PAGINATION_CURSOR_SIZE_REQUIRED });
  });

  it('should return error when paginationSize is less than 1 with response status 400', async () => {
    const startDate = '2021-01-01';
    const endDate = '2021-12-31';
    const paginationCursor = '1';
    const paginationSize = '0';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({ error: PAGINATION_SIZE_MUST_BE_GREATER_THAN_ZERO });
  });

  it('should return error when paginationCursor is less than 1 with response status 400', async () => {
    const startDate = '2021-01-01';
    const endDate = '2021-12-31';
    const paginationCursor = '0';
    const paginationSize = '100';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({ error: PAGINATION_CURSOR_MUST_BE_GREATER_THAN_ZERO });
  });

  it('should return error when paginationSize & paginationCursor is less than 1 with response status 400', async () => {
    const startDate = '2021-01-01';
    const endDate = '2021-12-31';
    const paginationCursor = '0';
    const paginationSize = '0';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({
      error: PAGINATION_CURSOR_SIZE_MUST_BE_GREATER_THAN_ZERO,
    });
  });

  it('should return error when startDate is not in valid date format with response status 400', async () => {
    const startDate = '2021-01-32'; // invalid date
    const endDate = '2021-12-31';
    const paginationCursor = '1';
    const paginationSize = '100';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({
      error: INVALID_START_DATE_FORMAT,
    });
  });

  it('should return error when endDate is not in valid date format with response status 400', async () => {
    const startDate = '2021-01-01';
    const endDate = '2021-12-32'; // invalid date
    const paginationCursor = '1';
    const paginationSize = '100';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({
      error: INVALID_END_DATE_FORMAT,
    });
  });

  it('should return error when startDate & endDate is not in valid date format with response status 400', async () => {
    const startDate = '2021-01-32'; // invalid date
    const endDate = '2021-12-32'; // invalid date
    const paginationCursor = '1';
    const paginationSize = '100';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({
      error: INVALID_START_END_DATE_FORMAT,
    });
  });

  it('should return error when paginationCursor is not a number with response status 400', async () => {
    const startDate = '2021-01-01';
    const endDate = '2021-12-31';
    const paginationCursor = 'one'; // invalid number
    const paginationSize = '100';
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({ error: PAGINATION_CURSOR_MUST_BE_NUMBER });
  });

  it('should return error when paginationSize is not a number with response status 400', async () => {
    const startDate = '2021-01-01';
    const endDate = '2021-12-31';
    const paginationCursor = '1';
    const paginationSize = 'one'; // invalid number
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({ error: PAGINATION_SIZE_MUST_BE_NUMBER });
  });

  it('should return error when paginationCursor & paginationSize is not a number with response status 400', async () => {
    const startDate = '2021-01-01';
    const endDate = '2021-12-31';
    const paginationCursor = 'one'; // invalid number
    const paginationSize = 'one'; // invalid number
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&paginationCursor=${paginationCursor}&paginationSize=${paginationSize}`;

    const response = await request(app).get(apiEndPoint + queryParams);

    expect(response.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
    expect(response.body).toEqual({
      error: PAGINATION_CURSOR_SIZE_MUST_BE_NUMBER,
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
