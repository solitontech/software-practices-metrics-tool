import { describe, it, expect } from '@jest/globals';

import { TimeMetrics } from './time-metrics.js';
import { PULL_REQUEST_STATUS } from '../constants/constants.js';

describe('TimeMetrics~getPullRequestMergeTime - method to get merge time of the pull request', () => {
  it('should return the time difference between the creation date and the closed date', () => {
    const creationDate = new Date('2022-01-01T00:00:00Z');
    const closedDate = new Date('2022-01-01T12:00:00Z');

    const result = TimeMetrics.getPullRequestMergeTime({
      status: PULL_REQUEST_STATUS.COMPLETED,
      creationDate,
      closedDate,
    });

    const expectedMergeTime = 12 * 60 * 60;

    expect(result).toBe(expectedMergeTime);
  });

  it('should return the time difference between the creation date and the closed date (more than 3 days difference)', () => {
    const creationDate = new Date('2022-01-01T00:00:00Z');
    const closedDate = new Date('2022-01-05T00:00:00Z');

    const result = TimeMetrics.getPullRequestMergeTime({
      status: PULL_REQUEST_STATUS.COMPLETED,
      creationDate,
      closedDate,
    });

    const expectedMergeTime = 4 * 24 * 60 * 60;

    expect(result).toBe(expectedMergeTime);
  });

  it('should return null if status is not COMPLETED (active)', () => {
    const result = TimeMetrics.getPullRequestMergeTime({
      status: PULL_REQUEST_STATUS.ACTIVE,
      creationDate: new Date(),
      closedDate: new Date(),
    });

    expect(result).toBeNull();
  });

  it('should return null if status is not COMPLETED  (abandoned)', () => {
    const result = TimeMetrics.getPullRequestMergeTime({
      status: PULL_REQUEST_STATUS.ABANDONED,
      creationDate: new Date(),
      closedDate: new Date(),
    });

    expect(result).toBeNull();
  });
});
