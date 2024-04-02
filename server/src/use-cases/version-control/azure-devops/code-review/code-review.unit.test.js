import { describe, it, expect } from '@jest/globals';

import { CodeReview } from './code-review.js';
import * as mock from './tests/code-review.mock.js';

describe('CodeReview~getCodeReviewMetrics', () => {
  it('should return the code review metrics', () => {
    const result = CodeReview.getCodeReviewMetrics(mock.RAW_CODE_REVIEW_METRICS);

    expect(result).toEqual(mock.CODE_REVIEW_METRICS);
  });

  it('should return code review metrics with closed date as null if the pull request not contain closed date', () => {
    const result = CodeReview.getCodeReviewMetrics(mock.RAW_CODE_REVIEW_WITHOUT_CLOSED_DATE);

    expect(result).toEqual(mock.CODE_REVIEW_WITHOUT_CLOSED_DATE);
  });

  it('should return code review metrics with empty votes timeline if the pull request not contain votes threads', () => {
    const result = CodeReview.getCodeReviewMetrics(mock.RAW_CODE_REVIEW_NO_VOTE_THREADS);

    expect(result).toEqual(mock.CODE_REVIEW_NO_VOTE_THREADS);
  });

  it('should return code review metrics by omitting deleted threads & comments', () => {
    const result = CodeReview.getCodeReviewMetrics(mock.RAW_CODE_REVIEW_METRICS_THREADS);

    expect(result).toEqual(mock.CODE_REVIEW_METRICS_THREADS);
  });

  it('should return pull requests with out tags if the raw pull request not contain labels', () => {
    const result = CodeReview.getCodeReviewMetrics(mock.RAW_CODE_REVIEW_WITHOUT_LABELS);

    expect(result).toEqual(mock.CODE_REVIEW_WITHOUT_TAGS);
  });
});
