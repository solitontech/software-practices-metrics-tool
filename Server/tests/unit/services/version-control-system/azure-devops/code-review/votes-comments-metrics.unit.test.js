import { describe, it, expect } from '@jest/globals';

import { VotesCommentsMetrics } from '../../../../../../src/services/version-control/azure-devops/code-review/votes-comments-metrics.js';

describe('VotesCommentsMetrics~getPullRequestVotes - method to get pull request votes from reviewers', () => {
  it('should return pull request votes for pull request reviewers', () => {
    const reviewers = [
      { author: 'Author1', isRequired: true, vote: 'approved' },
      { author: 'Author2', isRequired: false, vote: 'approvedWithSuggestions' },
      { author: 'Author3', isRequired: true, vote: 'rejected' },
      { author: 'Author4', isRequired: false, vote: 'approved' },
      { author: 'Author5', isRequired: false, vote: 'noVote' },
      { author: 'Author6', isRequired: false, vote: 'waitForAuthor' },
    ];

    const result = VotesCommentsMetrics.getPullRequestVotes(reviewers);

    expect(result).toEqual({
      approved: 2,
      approvedWithSuggestions: 1,
      noVote: 1,
      waitForAuthor: 1,
      rejected: 1,
    });
  });

  it('should return all zeros if there are no reviewers', () => {
    const reviewers = [];

    const result = VotesCommentsMetrics.getPullRequestVotes(reviewers);

    expect(result).toEqual({
      approved: 0,
      approvedWithSuggestions: 0,
      noVote: 0,
      waitForAuthor: 0,
      rejected: 0,
    });
  });
});

describe('VotesCommentsMetrics~getPullRequestVotesTimeline - method to get pull request votes timeline from reviewers, votes history timeline.', () => {
  it('should return the timeline of pull request votes from reviewers, votes history timeline.', () => {
    const reviewers = {
      1: { author: 'Author1', isRequired: true, vote: 'approved' },
      2: { author: 'Author2', isRequired: true, vote: 'rejected' },
    };

    const votesHistoryTimeline = [
      { id: '1', author: 'Author1', vote: 'approved', timeOfVote: '2022-01-01T00:00:00Z' },
      { id: '2', author: 'Author2', vote: 'rejected', timeOfVote: '2022-01-02T00:00:00Z' },
    ];

    const result = VotesCommentsMetrics.getPullRequestVotesTimeline(reviewers, votesHistoryTimeline);

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

    const result = VotesCommentsMetrics.getPullRequestVotesTimeline(reviewers, votesHistoryTimeline);

    expect(result).toEqual([
      { id: '1', author: 'Author1', timeOfVote: '2022-01-01T00:00:00Z', vote: 'approved' },
      { id: '3', author: 'Author3', timeOfVote: null, vote: 'approved' },
    ]);
  });

  it('should return an empty array if there are no reviewers', () => {
    const reviewers = {};

    const votesHistoryTimeline = [];

    const result = VotesCommentsMetrics.getPullRequestVotesTimeline(reviewers, votesHistoryTimeline);

    expect(result).toEqual([]);
  });

  it('should return an empty array if there are no votes in the timeline', () => {
    const reviewers = {
      1: { author: 'Author1', isRequired: true, vote: 'noVote' },
      2: { author: 'Author2', isRequired: true, vote: 'noVote' },
    };

    const votesHistoryTimeline = [];

    const result = VotesCommentsMetrics.getPullRequestVotesTimeline(reviewers, votesHistoryTimeline);

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

describe('VotesCommentsMetrics~getPullRequestVotesHistory - method to get pull request votes history from votes history timeline.', () => {
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

    const result = VotesCommentsMetrics.getPullRequestVotesHistory(votesCycle);

    expect(result).toEqual({
      approved: 2,
      approvedWithSuggestions: 1,
      waitForAuthor: 1,
      rejected: 1,
    });
  });

  it('should return all zeros if there are no votes', () => {
    const votesCycle = [];

    const result = VotesCommentsMetrics.getPullRequestVotesHistory(votesCycle);

    expect(result).toEqual({
      approved: 0,
      approvedWithSuggestions: 0,
      waitForAuthor: 0,
      rejected: 0,
    });
  });
});

describe('VotesCommentsMetrics~getPullRequestComments - method to get the count for nit, major and total comments for a pull request from threads.', () => {
  it('should correctly count comments', () => {
    const threads = [
      {
        comments: [{ content: 'nit: Fix this' }, { content: 'major:refactor that' }],
      },
      {
        comments: [
          { content: 'nItfix that' },
          { content: 'majOr: fix this' },
          { content: 'This is a general comment' },
        ],
      },
    ];

    const result = VotesCommentsMetrics.getPullRequestComments(threads);

    expect(result).toEqual({
      totalComments: 5,
      numberOfNitComments: 2,
      numberOfMajorComments: 2,
    });
  });

  it('should return all zeros if there are no comments', () => {
    const threads = [];

    const result = VotesCommentsMetrics.getPullRequestComments(threads);

    expect(result).toEqual({
      totalComments: 0,
      numberOfNitComments: 0,
      numberOfMajorComments: 0,
    });
  });
});

describe('VotesCommentsMetrics~getPullRequestReviewerComments - method to get the count of reviewers comments for a pull request from threads', () => {
  it('should correctly count comments per reviewer', () => {
    const threads = [
      {
        comments: [
          { authorId: '1', authorName: 'Author1', content: 'nit: Fix this' },
          { authorId: '2', authorName: 'Author2', content: 'major:refactor that' },
        ],
      },
      { comments: [{ authorId: '1', authorName: 'Author1', content: 'This is general comments' }] },
    ];

    const result = VotesCommentsMetrics.getPullRequestReviewerComments(threads);

    expect(result).toEqual([
      { reviewer: 'Author1', comments: 2 },
      { reviewer: 'Author2', comments: 1 },
    ]);
  });

  it('should return an empty array if there are no comments', () => {
    const threads = [];

    const result = VotesCommentsMetrics.getPullRequestReviewerComments(threads);

    expect(result).toEqual([]);
  });
});
