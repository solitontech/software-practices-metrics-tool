import { describe, it, expect } from '@jest/globals';

import { getGmtISOString, getNextDayGmtISOString } from './date.helpers.js';

// Mock the global Date object to maintain same time zone in testing environment for all time zone users.
global.Date = class extends Date {
  constructor() {
    // Setting date to IST timezone to maintain consistency in testing environment for all time zone users.
    super('2022-01-01T00:00:00+05:30');
  }
};

describe('getGmtISOString - method to return GMT date string from IST date', () => {
  it('should return the GMT ISO string for a date', () => {
    const date = new Date('2022-01-01T00:00:00Z');
    const gmtISOString = getGmtISOString(date);

    // As IST is 5:30 hours ahead of GMT, the date should be 18:30 hours of the previous day
    expect(gmtISOString).toBe('2021-12-31T18:30:00.000Z');
  });
});

describe('getNextDayGmtISOString - method to return next GMT date string from IST date', () => {
  it('should return the GMT ISO string for the next day', () => {
    const date = new Date('2022-01-01T00:00:00Z');
    const nextDayGmtISOString = getNextDayGmtISOString(date);

    // As IST is 5:30 hours ahead of GMT, the date should be 18:30 hours of the next day
    expect(nextDayGmtISOString).toBe('2022-01-01T18:30:00.000Z');
  });
});
