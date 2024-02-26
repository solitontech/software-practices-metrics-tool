import request from 'supertest';
import { it, expect } from '@jest/globals';

import { STATUS_CODE } from '../../../src/constants/constants.js';
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

export const runDatePaginationValidationTests = (app, apiEndPoint) => {
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
};
