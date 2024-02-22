import request from 'supertest';
import { jest, describe, it, expect } from '@jest/globals';

import { AzureDevopsApi } from '../../../../src/services/version-control-system/azure-devops/apis/azure-devops.js';
import { AZURE_ACTIVE_BRANCHES_RESPONSE, SERVER_ACTIVE_BRANCHES_RESPONSE } from './activeBranches.mock.js';
import { ERROR_MESSAGE, STATUS_CODE } from '../../../../src/constants/constants.js';
import app from '../../../../src/index.js';
import { AppError } from '../../../../src/utils/app-error.js';

const { OK, INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED_ACCESS, BAD_REQUEST } = STATUS_CODE;
const { invalidRepositoryDetails, invalidAzureToken } = AzureDevopsApi;

const PAGINATION_SIZE_MUST_BE_NUMBER = "'paginationSize' must be a number";
const PAGINATION_CURSOR_SIZE_MUST_BE_NUMBER = "'paginationCursor' must be a number | 'paginationSize' must be a number";
const PAGINATION_CURSOR_MUST_BE_NUMBER = "'paginationCursor' must be a number";

const PAGINATION_CURSOR_REQUIRED = "'paginationCursor' is required";
const PAGINATION_SIZE_REQUIRED = "'paginationSize' is required";
const PAGINATION_CURSOR_SIZE_REQUIRED = "'paginationCursor' is required | 'paginationSize' is required";

const PAGINATION_SIZE_MUST_BE_GREATER_THAN_ZERO = "'paginationSize' must be greater than or equal to 1";
const PAGINATION_CURSOR_SIZE_MUST_BE_GREATER_THAN_ZERO =
  "'paginationCursor' must be greater than or equal to 1 | 'paginationSize' must be greater than or equal to 1";
const PAGINATION_CURSOR_MUST_BE_GREATER_THAN_ZERO = "'paginationCursor' must be greater than or equal to 1";

jest.mock('../../../../src/services/version-control-system/azure-devops/apis/azure-devops.js');

describe('Trunk based metrics - get active branches in the repository', () => {
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

  it('should handle internal server error when fetching active branches from Azure API', async () => {
    AzureDevopsApi.fetchActivePullRequests = jest
      .fn()
      .mockRejectedValue(new Error(ERROR_MESSAGE.INTERNAL_SERVER_ERROR));

    const paginationSize = 10;
    const paginationCursor = 1;

    const response = await request(app).get(
      `${api}?paginationSize=${paginationSize}&paginationCursor=${paginationCursor}`
    );

    expect(response.statusCode).toBe(INTERNAL_SERVER_ERROR);
    expect(response.body).toEqual({ error: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
  });

  it('should return a 400 status code when invalid pagination parameters are provided', async () => {
    const paginationSize = 'invalid';
    const paginationCursor = 'invalid';

    const response = await request(app).get(
      `${api}?paginationSize=${paginationSize}&paginationCursor=${paginationCursor}`
    );

    expect(response.statusCode).toBe(BAD_REQUEST);
    expect(response.body).toEqual({
      error: PAGINATION_CURSOR_SIZE_MUST_BE_NUMBER,
    });
  });

  it('should return a 400 status code when invalid pagination size is provided', async () => {
    const paginationSize = 'invalid';
    const paginationCursor = 1;

    const response = await request(app).get(
      `${api}?paginationSize=${paginationSize}&paginationCursor=${paginationCursor}`
    );

    expect(response.statusCode).toBe(BAD_REQUEST);
    expect(response.body).toEqual({
      error: PAGINATION_SIZE_MUST_BE_NUMBER,
    });
  });

  it('should return a 400 status code when invalid pagination cursor is provided', async () => {
    const paginationSize = 100;
    const paginationCursor = 'invalid';

    const response = await request(app).get(
      `${api}?paginationSize=${paginationSize}&paginationCursor=${paginationCursor}`
    );

    expect(response.statusCode).toBe(BAD_REQUEST);
    expect(response.body).toEqual({
      error: PAGINATION_CURSOR_MUST_BE_NUMBER,
    });
  });

  it('should return a 400 status code when no pagination cursor is provided', async () => {
    const paginationSize = 100;

    const response = await request(app).get(`${api}?paginationSize=${paginationSize}`);

    expect(response.statusCode).toBe(BAD_REQUEST);
    expect(response.body).toEqual({
      error: PAGINATION_CURSOR_REQUIRED,
    });
  });

  it('should return a 400 status code when no pagination size is provided', async () => {
    const paginationCursor = 1;

    const response = await request(app).get(`${api}?paginationCursor=${paginationCursor}`);

    expect(response.statusCode).toBe(BAD_REQUEST);
    expect(response.body).toEqual({
      error: PAGINATION_SIZE_REQUIRED,
    });
  });

  it('should return a 400 status code when no pagination parameters are provided', async () => {
    const response = await request(app).get(`${api}`);

    expect(response.statusCode).toBe(BAD_REQUEST);
    expect(response.body).toEqual({
      error: PAGINATION_CURSOR_SIZE_REQUIRED,
    });
  });

  it('should return a 400 status code when negative pagination parameters or 0 are provided as values', async () => {
    const paginationSize = -3;
    const paginationCursor = 0;

    const response = await request(app).get(
      `${api}?paginationSize=${paginationSize}&paginationCursor=${paginationCursor}`
    );

    expect(response.statusCode).toBe(BAD_REQUEST);
    expect(response.body).toEqual({
      error: PAGINATION_CURSOR_SIZE_MUST_BE_GREATER_THAN_ZERO,
    });
  });

  it('should return a 400 status code when negative pagination size or 0 is provided as value', async () => {
    const paginationSize = 0;
    const paginationCursor = 1;

    const response = await request(app).get(
      `${api}?paginationSize=${paginationSize}&paginationCursor=${paginationCursor}`
    );

    expect(response.statusCode).toBe(BAD_REQUEST);
    expect(response.body).toEqual({
      error: PAGINATION_SIZE_MUST_BE_GREATER_THAN_ZERO,
    });
  });

  it('should return a 400 status code when negative pagination cursor or 0 is provided as value', async () => {
    const paginationSize = 100;
    const paginationCursor = 0;

    const response = await request(app).get(
      `${api}?paginationSize=${paginationSize}&paginationCursor=${paginationCursor}`
    );

    expect(response.statusCode).toBe(BAD_REQUEST);
    expect(response.body).toEqual({
      error: PAGINATION_CURSOR_MUST_BE_GREATER_THAN_ZERO,
    });
  });

  it('should handle no data found error due to invalid server configurations when fetching active branches from Azure API', async () => {
    AzureDevopsApi.fetchActivePullRequests = jest
      .fn()
      .mockRejectedValue(new AppError(invalidRepositoryDetails, NOT_FOUND));

    const paginationSize = 10;
    const paginationCursor = 1;

    const response = await request(app).get(
      `${api}?paginationSize=${paginationSize}&paginationCursor=${paginationCursor}`
    );

    expect(response.statusCode).toBe(NOT_FOUND);
    expect(response.body).toEqual({
      error: invalidRepositoryDetails,
    });
  });

  it('should handle unauthorized access when fetching active branches from Azure API', async () => {
    AzureDevopsApi.fetchActivePullRequests = jest
      .fn()
      .mockRejectedValue(new AppError(invalidAzureToken, UNAUTHORIZED_ACCESS));

    const paginationSize = 10;
    const paginationCursor = 1;

    const response = await request(app).get(
      `${api}?paginationSize=${paginationSize}&paginationCursor=${paginationCursor}`
    );

    expect(response.statusCode).toBe(UNAUTHORIZED_ACCESS);
    expect(response.body).toEqual({
      error: invalidAzureToken,
    });
  });
});
