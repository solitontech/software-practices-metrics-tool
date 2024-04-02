import { describe, it, expect } from '@jest/globals';

import { TimeMetrics } from './time-metrics.js';
import { PULL_REQUEST_STATUS, VOTE } from '../constants/constants.js';

describe('TimeMetrics~getFirstReviewResponseTime - method to get the first review response time of pull request', () => {
  it('should return the difference in time between the creation date and the first review vote', () => {
    const creationDate = new Date('2022-01-01T00:00:00Z');

    const votesHistoryTimeline = [
      { timeOfVote: new Date('2022-01-01T01:00:00Z'), vote: VOTE.WAIT_FOR_AUTHOR, author: 'author', id: 1 },
      { timeOfVote: new Date('2022-01-01T02:00:00Z'), vote: VOTE.APPROVED, author: 'author', id: 1 },
    ];

    const result = TimeMetrics.getFirstReviewResponseTime({ creationDate, votesHistoryTimeline });
    const expectedFirstReviewResponseTime = 60 * 60;

    expect(result).toBe(expectedFirstReviewResponseTime);
  });

  it('should return null if votesHistoryTimeline is empty', () => {
    const result = TimeMetrics.getFirstReviewResponseTime({ creationDate: new Date(), votesHistoryTimeline: [] });

    expect(result).toBeNull();
  });
});

describe('TimeMetrics~getPullRequestMergeTime - method to get merge time of the pull request', () => {
  it('should return the difference in time between the creation date and the closed date', () => {
    const creationDate = new Date('2022-01-01T00:00:00Z');
    const closedDate = new Date('2022-01-02T00:00:00Z');

    const result = TimeMetrics.getPullRequestMergeTime({
      status: PULL_REQUEST_STATUS.COMPLETED,
      creationDate,
      closedDate,
    });

    const expectedMergeTime = 24 * 60 * 60;

    expect(result).toBe(expectedMergeTime);
  });

  it('should return null if status is not COMPLETED', () => {
    const result = TimeMetrics.getPullRequestMergeTime({
      status: PULL_REQUEST_STATUS.ACTIVE,
      creationDate: new Date(),
      closedDate: new Date(),
    });

    expect(result).toBeNull();
  });
});

describe('TimeMetrics~getPullRequestApprovalTime - method to get approval time of the pull request', () => {
  it('should return null if not all required reviewers have approved', () => {
    const reviewers = {
      1: { author: 'author1', isRequired: true, vote: VOTE.NONE },
      2: { author: 'author2', isRequired: false, vote: VOTE.APPROVED },
    };

    const result = TimeMetrics.getPullRequestApprovalTime({
      creationDate: new Date(),
      reviewers,
      votesHistoryTimeline: [],
    });

    expect(result).toBeNull();
  });

  it('should return the difference in time between the creation date and the latest reviewer approval time', () => {
    const creationDate = new Date('2022-01-01T00:00:00Z');

    const reviewers = {
      1: { author: 'author1', isRequired: true, vote: VOTE.APPROVED },
      2: { author: 'author2', isRequired: true, vote: VOTE.APPROVED },
    };

    const votesHistoryTimeline = [
      { id: 1, author: 'author1', timeOfVote: new Date('2022-01-01T01:00:00Z'), vote: VOTE.APPROVED },
      { id: 2, author: 'author2', timeOfVote: new Date('2022-01-01T02:00:00Z'), vote: VOTE.APPROVED },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime({ creationDate, reviewers, votesHistoryTimeline });
    const expectedApprovalTime = 2 * 60 * 60;

    expect(result).toBe(expectedApprovalTime);
  });

  it('should return the difference in time between the creation date and the latest non-required reviewer when required reviewer is not available in votes history timeline', () => {
    const creationDate = new Date('2022-01-01T00:00:00Z');

    const reviewers = {
      1: { author: 'author1', isRequired: false, vote: VOTE.APPROVED },
      2: { author: 'author2', isRequired: true, vote: VOTE.APPROVED },
    };

    const votesHistoryTimeline = [
      { id: 1, author: 'author1', timeOfVote: new Date('2022-01-01T01:00:00Z'), vote: VOTE.APPROVED },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime({ creationDate, reviewers, votesHistoryTimeline });
    const expectedApprovalTime = 60 * 60;

    expect(result).toBe(expectedApprovalTime);
  });
});
