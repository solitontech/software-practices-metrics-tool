import { describe, it, expect } from '@jest/globals';

import { VotesCommentsMetrics } from '../../../../../../src/services/version-control-system/azure-devops/code-review/votes-comments-metrics.js';

describe('VotesCommentsMetrics', () => {
  describe('getPullRequestVotes', () => {
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

  describe('getPullRequestVotesTimeline', () => {
    it('should return the timeline of pull request votes', () => {
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

      const votesHistoryTimeline = [
        { id: '1', author: 'Author1', vote: 'approved', timeOfVote: '2022-01-01T00:00:00Z' },
      ];

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
  });

  describe('getPullRequestVotesHistory', () => {
    it('should correctly count the history of votes', () => {
      const votesCycle = [
        {
          id: '1',
          author: 'Author1',
          timeOfVote: '2022-01-01T00:00:00Z',
          vote: 'approved',
        },
        {
          id: '1',
          author: 'Author1',
          timeOfVote: '2022-01-01T00:00:00Z',
          vote: 'approvedWithSuggestions',
        },
        {
          id: '1',
          author: 'Author1',
          timeOfVote: '2022-01-01T00:00:00Z',
          vote: 'rejected',
        },
        {
          id: '1',
          author: 'Author1',
          timeOfVote: '2022-01-01T00:00:00Z',
          vote: 'approved',
        },
        {
          id: '1',
          author: 'Author1',
          timeOfVote: '2022-01-01T00:00:00Z',
          vote: 'waitForAuthor',
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

  describe('getPullRequestComments', () => {
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

  describe('getPullRequestReviewerComments', () => {
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
});
