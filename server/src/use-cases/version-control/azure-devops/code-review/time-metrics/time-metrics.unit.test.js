import { describe, it, expect } from '@jest/globals';

import { TimeMetrics } from './time-metrics.js';
import { PULL_REQUEST_STATUS, VOTE } from '../constants/constants.js';

describe('TimeMetrics~getFirstReviewResponseTime - method to get the first review response time of pull request', () => {
  it('should return the time difference between the creation date and the first review vote', () => {
    const creationDate = new Date('2022-01-01T00:00:00Z');

    const votesHistoryTimeline = [
      { timeOfVote: new Date('2022-01-01T01:00:00Z'), vote: VOTE.WAIT_FOR_AUTHOR, author: 'author', id: 1 },
      { timeOfVote: new Date('2022-01-01T02:00:00Z'), vote: VOTE.APPROVED, author: 'author', id: 1 },
    ];

    const result = TimeMetrics.getFirstReviewResponseTime({ creationDate, votesHistoryTimeline });
    const expectedFirstReviewResponseTime = 60 * 60;

    expect(result).toBe(expectedFirstReviewResponseTime);
  });

  it('should return the time difference between the creation date and the first review vote (more than 3 days difference)', () => {
    const creationDate = new Date('2022-01-01T00:00:00Z');

    const votesHistoryTimeline = [
      { timeOfVote: new Date('2022-01-05T00:00:00Z'), vote: VOTE.REJECTED, author: 'author', id: 1 },
      { timeOfVote: new Date('2022-01-05T01:00:00Z'), vote: VOTE.WAIT_FOR_AUTHOR, author: 'author2', id: 2 },
      { timeOfVote: new Date('2022-01-05T02:00:00Z'), vote: VOTE.APPROVED, author: 'author3', id: 3 },
      { timeOfVote: new Date('2022-01-05T01:00:00Z'), vote: VOTE.APPROVED_WITH_SUGGESTIONS, author: 'author', id: 1 },
      { timeOfVote: new Date('2022-01-05T02:00:00Z'), vote: VOTE.APPROVED, author: 'author', id: 2 },
    ];

    const result = TimeMetrics.getFirstReviewResponseTime({ creationDate, votesHistoryTimeline });
    const expectedFirstReviewResponseTime = 4 * 24 * 60 * 60;

    expect(result).toBe(expectedFirstReviewResponseTime);
  });

  it('should return null if votesHistoryTimeline is empty', () => {
    const result = TimeMetrics.getFirstReviewResponseTime({ creationDate: new Date(), votesHistoryTimeline: [] });

    expect(result).toBeNull();
  });
});

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

describe('TimeMetrics~getPullRequestApprovalTime - method to get approval time of the pull request', () => {
  it('should return null if required reviewers not approved (no vote)', () => {
    const reviewers = {
      1: { author: 'author1', isRequired: true, vote: VOTE.NO_VOTE },
      2: { author: 'author2', isRequired: false, vote: VOTE.NO_VOTE },
    };

    const result = TimeMetrics.getPullRequestApprovalTime({
      creationDate: new Date(),
      reviewers,
      votesHistoryTimeline: [],
    });

    expect(result).toBeNull();
  });

  it('should return null if required reviewers not approved (wait for author)', () => {
    const creationDate = new Date('2022-01-01T00:00:00Z');

    const reviewers = {
      1: { author: 'author1', isRequired: true, vote: VOTE.WAIT_FOR_AUTHOR },
      2: { author: 'author2', isRequired: true, vote: VOTE.WAIT_FOR_AUTHOR },
    };

    const votesHistoryTimeline = [
      { id: 1, author: 'author1', timeOfVote: new Date('2022-01-01T01:00:00Z'), vote: VOTE.WAIT_FOR_AUTHOR },
      { id: 2, author: 'author2', timeOfVote: new Date('2022-01-01T02:00:00Z'), vote: VOTE.WAIT_FOR_AUTHOR },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime({
      creationDate,
      reviewers,
      votesHistoryTimeline,
    });

    expect(result).toBeNull();
  });

  it('should return null if required reviewers not approved (no vote) even non required reviewers approved', () => {
    const reviewers = {
      1: { author: 'author1', isRequired: true, vote: VOTE.NO_VOTE },
      2: { author: 'author2', isRequired: false, vote: VOTE.APPROVED },
    };

    const votesHistoryTimeline = [
      { id: 1, author: 'author2', timeOfVote: new Date('2022-01-01T01:00:00Z'), vote: VOTE.APPROVED },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime({
      creationDate: new Date(),
      reviewers,
      votesHistoryTimeline,
    });

    expect(result).toBeNull();
  });

  it('should return null if required reviewers not approved (no vote) even non required reviewers approved (approved with suggestions)', () => {
    const reviewers = {
      1: { author: 'author1', isRequired: true, vote: VOTE.NO_VOTE },
      2: { author: 'author2', isRequired: false, vote: VOTE.APPROVED_WITH_SUGGESTIONS },
    };

    const votesHistoryTimeline = [
      { id: 1, author: 'author2', timeOfVote: new Date('2022-01-01T01:00:00Z'), vote: VOTE.APPROVED_WITH_SUGGESTIONS },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime({
      creationDate: new Date(),
      reviewers,
      votesHistoryTimeline,
    });

    expect(result).toBeNull();
  });

  it('should return null if required reviewers not approved (wait for author) even non required reviewers approved', () => {
    const reviewers = {
      1: { author: 'author1', isRequired: true, vote: VOTE.WAIT_FOR_AUTHOR },
      2: { author: 'author2', isRequired: false, vote: VOTE.APPROVED },
    };

    const votesHistoryTimeline = [
      { id: 1, author: 'author1', timeOfVote: new Date('2022-01-01T01:00:00Z'), vote: VOTE.WAIT_FOR_AUTHOR },
      { id: 2, author: 'author2', timeOfVote: new Date('2022-01-01T02:00:00Z'), vote: VOTE.APPROVED },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime({
      creationDate: new Date(),
      reviewers,
      votesHistoryTimeline,
    });

    expect(result).toBeNull();
  });

  it('should return null if required reviewers not approved (wait for author) even non required reviewers approved (approved with suggestions)', () => {
    const reviewers = {
      1: { author: 'author1', isRequired: true, vote: VOTE.WAIT_FOR_AUTHOR },
      2: { author: 'author2', isRequired: false, vote: VOTE.APPROVED_WITH_SUGGESTIONS },
    };

    const votesHistoryTimeline = [
      { id: 1, author: 'author1', timeOfVote: new Date('2022-01-01T01:00:00Z'), vote: VOTE.WAIT_FOR_AUTHOR },
      { id: 2, author: 'author2', timeOfVote: new Date('2022-01-01T02:00:00Z'), vote: VOTE.APPROVED_WITH_SUGGESTIONS },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime({
      creationDate: new Date(),
      reviewers,
      votesHistoryTimeline,
    });

    expect(result).toBeNull();
  });

  it('should return null if all the required reviewers not approved (one required reviewer no vote)', () => {
    const creationDate = new Date('2022-01-01T00:00:00Z');

    const reviewers = {
      1: { author: 'author1', isRequired: true, vote: VOTE.NO_VOTE },
      2: { author: 'author2', isRequired: true, vote: VOTE.APPROVED_WITH_SUGGESTIONS },
      3: { author: 'author3', isRequired: false, vote: VOTE.APPROVED },
      4: { author: 'author4', isRequired: false, vote: VOTE.WAIT_FOR_AUTHOR },
    };

    const votesHistoryTimeline = [
      { id: 2, author: 'author2', timeOfVote: new Date('2022-01-01T01:00:00Z'), vote: VOTE.WAIT_FOR_AUTHOR },
      { id: 3, author: 'author3', timeOfVote: new Date('2022-01-01T02:00:00Z'), vote: VOTE.WAIT_FOR_AUTHOR },
      { id: 4, author: 'author4', timeOfVote: new Date('2022-01-01T03:00:00Z'), vote: VOTE.APPROVED },
      { id: 2, author: 'author2', timeOfVote: new Date('2022-01-01T04:00:00Z'), vote: VOTE.APPROVED_WITH_SUGGESTIONS },
      { id: 3, author: 'author3', timeOfVote: new Date('2022-01-01T05:00:00Z'), vote: VOTE.APPROVED },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime({
      creationDate,
      reviewers,
      votesHistoryTimeline,
    });

    expect(result).toBeNull();
  });

  it('should return null if all the required reviewers not approved (one required reviewer wait for author)', () => {
    const creationDate = new Date('2022-01-01T00:00:00Z');

    const reviewers = {
      1: { author: 'author1', isRequired: true, vote: VOTE.APPROVED },
      2: { author: 'author2', isRequired: true, vote: VOTE.WAIT_FOR_AUTHOR },
      3: { author: 'author3', isRequired: false, vote: VOTE.APPROVED },
      4: { author: 'author4', isRequired: false, vote: VOTE.WAIT_FOR_AUTHOR },
    };

    const votesHistoryTimeline = [
      { id: 1, author: 'author1', timeOfVote: new Date('2022-01-01T01:00:00Z'), vote: VOTE.WAIT_FOR_AUTHOR },
      { id: 2, author: 'author2', timeOfVote: new Date('2022-01-01T02:00:00Z'), vote: VOTE.WAIT_FOR_AUTHOR },
      { id: 3, author: 'author3', timeOfVote: new Date('2022-01-01T03:00:00Z'), vote: VOTE.APPROVED },
      { id: 4, author: 'author4', timeOfVote: new Date('2022-01-01T04:00:00Z'), vote: VOTE.APPROVED_WITH_SUGGESTIONS },
      { id: 1, author: 'author1', timeOfVote: new Date('2022-01-01T05:00:00Z'), vote: VOTE.APPROVED },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime({
      creationDate,
      reviewers,
      votesHistoryTimeline,
    });

    expect(result).toBeNull();
  });

  it('should return the time difference between the creation date and the latest reviewer approval time (no non required reviewers)', () => {
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

  it('should return the time difference between the creation date and the latest reviewer approval time (approved with suggestions) (no non required reviewers)', () => {
    const creationDate = new Date('2022-01-01T00:00:00Z');

    const reviewers = {
      1: { author: 'author1', isRequired: true, vote: VOTE.APPROVED_WITH_SUGGESTIONS },
      2: { author: 'author2', isRequired: true, vote: VOTE.APPROVED_WITH_SUGGESTIONS },
    };

    const votesHistoryTimeline = [
      { id: 1, author: 'author1', timeOfVote: new Date('2022-01-01T01:00:00Z'), vote: VOTE.APPROVED_WITH_SUGGESTIONS },
      { id: 2, author: 'author2', timeOfVote: new Date('2022-01-01T02:00:00Z'), vote: VOTE.APPROVED_WITH_SUGGESTIONS },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime({ creationDate, reviewers, votesHistoryTimeline });
    const expectedApprovalTime = 2 * 60 * 60;

    expect(result).toBe(expectedApprovalTime);
  });

  it('should return the time difference between the creation date and the latest reviewer approval time (with non required reviewers)', () => {
    const creationDate = new Date('2022-01-01T00:00:00Z');

    const reviewers = {
      1: { author: 'author1', isRequired: true, vote: VOTE.APPROVED },
      2: { author: 'author2', isRequired: false, vote: VOTE.APPROVED },
    };

    const votesHistoryTimeline = [
      { id: 1, author: 'author1', timeOfVote: new Date('2022-01-01T01:00:00Z'), vote: VOTE.APPROVED },
      { id: 2, author: 'author2', timeOfVote: new Date('2022-01-01T02:00:00Z'), vote: VOTE.APPROVED },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime({ creationDate, reviewers, votesHistoryTimeline });
    const expectedApprovalTime = 1 * 60 * 60;

    expect(result).toBe(expectedApprovalTime);
  });

  it('should return the time difference between the creation date and the latest reviewer approval time (approved with suggestions) (with non required reviewers)', () => {
    const creationDate = new Date('2022-01-01T00:00:00Z');

    const reviewers = {
      1: { author: 'author1', isRequired: true, vote: VOTE.APPROVED_WITH_SUGGESTIONS },
      2: { author: 'author2', isRequired: false, vote: VOTE.APPROVED_WITH_SUGGESTIONS },
    };

    const votesHistoryTimeline = [
      { id: 1, author: 'author1', timeOfVote: new Date('2022-01-01T01:00:00Z'), vote: VOTE.APPROVED_WITH_SUGGESTIONS },
      { id: 2, author: 'author2', timeOfVote: new Date('2022-01-01T02:00:00Z'), vote: VOTE.APPROVED_WITH_SUGGESTIONS },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime({ creationDate, reviewers, votesHistoryTimeline });
    const expectedApprovalTime = 1 * 60 * 60;

    expect(result).toBe(expectedApprovalTime);
  });

  it('should return the time difference between the creation date and the latest required reviewer approval time (approved with suggestions)', () => {
    const creationDate = new Date('2022-01-01T00:00:00Z');

    const reviewers = {
      1: { author: 'author1', isRequired: true, vote: VOTE.APPROVED_WITH_SUGGESTIONS },
      2: { author: 'author2', isRequired: false, vote: VOTE.APPROVED },
    };

    const votesHistoryTimeline = [
      { id: 1, author: 'author1', timeOfVote: new Date('2022-01-01T01:00:00Z'), vote: VOTE.APPROVED_WITH_SUGGESTIONS },
      { id: 2, author: 'author2', timeOfVote: new Date('2022-01-01T02:00:00Z'), vote: VOTE.APPROVED },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime({ creationDate, reviewers, votesHistoryTimeline });
    const expectedApprovalTime = 1 * 60 * 60;

    expect(result).toBe(expectedApprovalTime);
  });

  it('should return the time difference between the creation date and the latest required reviewer approval time (repeated approval vote of a reviewer)', () => {
    const creationDate = new Date('2022-01-01T00:00:00Z');

    const reviewers = {
      1: { author: 'author1', isRequired: true, vote: VOTE.APPROVED },
      2: { author: 'author2', isRequired: false, vote: VOTE.APPROVED },
    };

    const votesHistoryTimeline = [
      { id: 1, author: 'author1', timeOfVote: new Date('2022-01-01T01:00:00Z'), vote: VOTE.APPROVED_WITH_SUGGESTIONS },
      { id: 2, author: 'author2', timeOfVote: new Date('2022-01-01T02:00:00Z'), vote: VOTE.APPROVED },
      { id: 1, author: 'author1', timeOfVote: new Date('2022-01-01T03:00:00Z'), vote: VOTE.APPROVED },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime({ creationDate, reviewers, votesHistoryTimeline });
    const expectedApprovalTime = 3 * 60 * 60;

    expect(result).toBe(expectedApprovalTime);
  });

  it('should return the time difference between the creation date and the latest required reviewer approval time (more than 3 days difference)', () => {
    const creationDate = new Date('2022-01-01T00:00:00Z');

    const reviewers = {
      1: { author: 'author1', isRequired: true, vote: VOTE.APPROVED },
      2: { author: 'author2', isRequired: false, vote: VOTE.APPROVED },
    };

    const votesHistoryTimeline = [
      { id: 1, author: 'author1', timeOfVote: new Date('2022-01-05T00:00:00Z'), vote: VOTE.APPROVED },
      { id: 2, author: 'author2', timeOfVote: new Date('2022-01-05T01:00:00Z'), vote: VOTE.APPROVED },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime({ creationDate, reviewers, votesHistoryTimeline });
    const expectedApprovalTime = 4 * 24 * 60 * 60;

    expect(result).toBe(expectedApprovalTime);
  });

  it('should return the time difference between the creation date and the latest non-required reviewer when required reviewer is not available in votes history timeline', () => {
    const creationDate = new Date('2022-01-01T00:00:00Z');

    const reviewers = {
      1: { author: 'author1', isRequired: false, vote: VOTE.APPROVED },
      2: { author: 'author2', isRequired: true, vote: VOTE.APPROVED },
      3: { author: 'author3', isRequired: false, vote: VOTE.WAIT_FOR_AUTHOR },
      4: { author: 'author4', isRequired: false, vote: VOTE.APPROVED },
    };

    const votesHistoryTimeline = [
      { id: 1, author: 'author1', timeOfVote: new Date('2022-01-01T01:00:00Z'), vote: VOTE.APPROVED },
      { id: 4, author: 'author4', timeOfVote: new Date('2022-01-01T02:00:00Z'), vote: VOTE.APPROVED },
      { id: 3, author: 'author3', timeOfVote: new Date('2022-01-01T03:00:00Z'), vote: VOTE.WAIT_FOR_AUTHOR },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime({ creationDate, reviewers, votesHistoryTimeline });
    const expectedApprovalTime = 2 * 60 * 60;

    expect(result).toBe(expectedApprovalTime);
  });

  it('should return the time difference between the creation date and the latest non-required reviewer when required reviewer is not available in votes history timeline (approved with suggestions)', () => {
    const creationDate = new Date('2022-01-01T00:00:00Z');

    const reviewers = {
      1: { author: 'author1', isRequired: false, vote: VOTE.APPROVED },
      2: { author: 'author2', isRequired: true, vote: VOTE.APPROVED_WITH_SUGGESTIONS },
      3: { author: 'author3', isRequired: false, vote: VOTE.WAIT_FOR_AUTHOR },
      4: { author: 'author4', isRequired: false, vote: VOTE.APPROVED },
    };

    const votesHistoryTimeline = [
      { id: 1, author: 'author1', timeOfVote: new Date('2022-01-01T01:00:00Z'), vote: VOTE.APPROVED },
      { id: 4, author: 'author4', timeOfVote: new Date('2022-01-01T02:00:00Z'), vote: VOTE.APPROVED_WITH_SUGGESTIONS },
      { id: 3, author: 'author3', timeOfVote: new Date('2022-01-01T03:00:00Z'), vote: VOTE.WAIT_FOR_AUTHOR },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime({ creationDate, reviewers, votesHistoryTimeline });
    const expectedApprovalTime = 2 * 60 * 60;

    expect(result).toBe(expectedApprovalTime);
  });

  it('should return the time difference between the creation date and the latest non-required reviewer when required reviewer (approved) is not available in votes history timeline (approved with suggestions)', () => {
    const creationDate = new Date('2022-01-01T00:00:00Z');

    const reviewers = {
      1: { author: 'author1', isRequired: false, vote: VOTE.APPROVED },
      2: { author: 'author2', isRequired: true, vote: VOTE.APPROVED },
      3: { author: 'author3', isRequired: false, vote: VOTE.WAIT_FOR_AUTHOR },
      4: { author: 'author4', isRequired: false, vote: VOTE.APPROVED_WITH_SUGGESTIONS },
    };

    const votesHistoryTimeline = [
      { id: 1, author: 'author1', timeOfVote: new Date('2022-01-01T01:00:00Z'), vote: VOTE.APPROVED },
      { id: 4, author: 'author4', timeOfVote: new Date('2022-01-01T02:00:00Z'), vote: VOTE.APPROVED_WITH_SUGGESTIONS },
      { id: 3, author: 'author3', timeOfVote: new Date('2022-01-01T03:00:00Z'), vote: VOTE.WAIT_FOR_AUTHOR },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime({ creationDate, reviewers, votesHistoryTimeline });
    const expectedApprovalTime = 2 * 60 * 60;

    expect(result).toBe(expectedApprovalTime);
  });
});
