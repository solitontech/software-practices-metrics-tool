import { describe, it, expect } from '@jest/globals';

import { VoteMetrics } from '##/use-cases/version-control/azure-devops/code-review/vote-metrics/vote-metrics.js';

describe('VoteMetrics~getPullRequestVotesTimeline - method to get pull request votes timeline from reviewers, votes history timeline.', () => {
  it('should return the timeline of pull request votes from reviewers, votes history timeline.', () => {
    const reviewers = {
      1: { author: 'Author1', isRequired: true, vote: 'approved' },
      2: { author: 'Author2', isRequired: true, vote: 'rejected' },
    };

    const votesHistoryTimeline = [
      { id: '1', author: 'Author1', vote: 'approved', timeOfVote: '2022-01-01T00:00:00Z' },
      { id: '2', author: 'Author2', vote: 'rejected', timeOfVote: '2022-01-02T00:00:00Z' },
    ];

    const result = VoteMetrics.getPullRequestVotesTimeline(reviewers, votesHistoryTimeline);

    expect(result).toEqual([
      { id: '1', author: 'Author1', timeOfVote: '2022-01-01T00:00:00Z', vote: 'approved' },
      { id: '2', author: 'Author2', timeOfVote: '2022-01-02T00:00:00Z', vote: 'rejected' },
    ]);
  });

  it('should return null for the time of vote if the reviewer is not in the timeline', () => {
    const reviewers = {
      1: { author: 'Author1', isRequired: true, vote: 'approved' },
      3: { author: 'Author3', isRequired: true, vote: 'approved' },
    };

    const votesHistoryTimeline = [{ id: '1', author: 'Author1', vote: 'approved', timeOfVote: '2022-01-01T00:00:00Z' }];

    const result = VoteMetrics.getPullRequestVotesTimeline(reviewers, votesHistoryTimeline);

    expect(result).toEqual([
      { id: '1', author: 'Author1', timeOfVote: '2022-01-01T00:00:00Z', vote: 'approved' },
      { id: '3', author: 'Author3', timeOfVote: null, vote: 'approved' },
    ]);
  });

  it('should return an empty array if there are no reviewers', () => {
    const reviewers = {};

    const votesHistoryTimeline = [];

    const result = VoteMetrics.getPullRequestVotesTimeline(reviewers, votesHistoryTimeline);

    expect(result).toEqual([]);
  });

  it('should return an empty array if there are no votes in the timeline', () => {
    const reviewers = {
      1: { author: 'Author1', isRequired: true, vote: 'noVote' },
      2: { author: 'Author2', isRequired: true, vote: 'noVote' },
    };

    const votesHistoryTimeline = [];

    const result = VoteMetrics.getPullRequestVotesTimeline(reviewers, votesHistoryTimeline);

    expect(result).toEqual([
      {
        author: 'Author1',
        id: '1',
        timeOfVote: null,
        vote: 'noVote',
      },
      {
        author: 'Author2',
        id: '2',
        timeOfVote: null,
        vote: 'noVote',
      },
    ]);
  });
});

describe('VoteMetrics~getPullRequestVotesHistory - method to get pull request votes history from votes history timeline.', () => {
  it('should return the history of pull request votes from votes history timeline.', () => {
    const votesCycle = [
      {
        id: '1',
        author: 'Author1',
        timeOfVote: '2022-01-01T00:00:00Z',
        vote: 'approved',
      },
      {
        id: '2',
        author: 'Author2',
        timeOfVote: '2022-01-01T00:00:00Z',
        vote: 'approvedWithSuggestions',
      },
      {
        id: '3',
        author: 'Author3',
        timeOfVote: '2022-01-01T00:00:00Z',
        vote: 'rejected',
      },
      {
        id: '4',
        author: 'Author4',
        timeOfVote: '2022-01-01T00:00:00Z',
        vote: 'waitForAuthor',
      },
      {
        id: '3',
        author: 'Author3',
        timeOfVote: '2022-01-01T00:00:00Z',
        vote: 'approved',
      },
    ];

    const result = VoteMetrics.getPullRequestVotesHistory(votesCycle);

    expect(result).toEqual({
      approved: 2,
      approvedWithSuggestions: 1,
      waitForAuthor: 1,
      rejected: 1,
    });
  });

  it('should return all zeros if there are no votes', () => {
    const votesCycle = [];

    const result = VoteMetrics.getPullRequestVotesHistory(votesCycle);

    expect(result).toEqual({
      approved: 0,
      approvedWithSuggestions: 0,
      waitForAuthor: 0,
      rejected: 0,
    });
  });
});
