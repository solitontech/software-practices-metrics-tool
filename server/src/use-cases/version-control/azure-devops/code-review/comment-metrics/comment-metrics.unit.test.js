import { describe, it, expect } from '@jest/globals';

import { CommentMetrics } from '##/use-cases/version-control/azure-devops/code-review/comment-metrics/comment-metrics.js';

describe('CommentMetrics~getPullRequestComments - method to get the count for nit, major and total comments for a pull request from threads.', () => {
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

    const result = CommentMetrics.getPullRequestComments(threads);

    expect(result).toEqual({
      totalComments: 5,
      numberOfNitComments: 2,
      numberOfMajorComments: 2,
    });
  });

  it('should return all zeros if there are no comments', () => {
    const threads = [];

    const result = CommentMetrics.getPullRequestComments(threads);

    expect(result).toEqual({
      totalComments: 0,
      numberOfNitComments: 0,
      numberOfMajorComments: 0,
    });
  });

  it('should return all zeros if there are no nit or major comments', () => {
    const threads = [
      {
        comments: [{ content: 'This is a general comment' }],
      },
    ];

    const result = CommentMetrics.getPullRequestComments(threads);

    expect(result).toEqual({
      totalComments: 1,
      numberOfNitComments: 0,
      numberOfMajorComments: 0,
    });
  });

  it('should omit deleted comments from the count', () => {
    const threads = [
      {
        comments: [{ content: 'nit: Fix this', isDeleted: true }, { content: 'major:refactor that' }],
      },
      {
        comments: [
          { content: 'nItfix that' },
          { content: 'majOr: fix this', isDeleted: true },
          { content: 'This is a general comment' },
        ],
      },
    ];

    const result = CommentMetrics.getPullRequestComments(threads);

    expect(result).toEqual({
      totalComments: 3,
      numberOfNitComments: 1,
      numberOfMajorComments: 1,
    });
  });
});

describe('CommentMetrics~getPullRequestReviewerComments - method to get the count of reviewers comments for a pull request from threads', () => {
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

    const result = CommentMetrics.getPullRequestReviewerComments(threads);

    expect(result).toEqual([
      { reviewer: 'Author1', comments: 2 },
      { reviewer: 'Author2', comments: 1 },
    ]);
  });

  it('should return an empty array if there are no comments', () => {
    const threads = [];

    const result = CommentMetrics.getPullRequestReviewerComments(threads);

    expect(result).toEqual([]);
  });

  it('should omit deleted comments from the count', () => {
    const threads = [
      {
        comments: [
          { authorId: '1', authorName: 'Author1', content: 'nit: Fix this', isDeleted: true },
          { authorId: '2', authorName: 'Author2', content: 'major:refactor that' },
        ],
      },
      { comments: [{ authorId: '1', authorName: 'Author1', content: 'This is general comments' }] },
    ];

    const result = CommentMetrics.getPullRequestReviewerComments(threads);

    expect(result).toEqual([
      { reviewer: 'Author1', comments: 1 },
      { reviewer: 'Author2', comments: 1 },
    ]);
  });
});
