import { describe, it, expect } from '@jest/globals';

import { TrunkBasedDevelopment } from './trunk-based-development.js';
import * as mock from './tests/trunk-based-development.mock.js';

describe('TrunkBasedDevelopment~getBranchMetrics - method to get branches following and not following naming standard', () => {
  it('should return branches following and not following naming standard', () => {
    const result = TrunkBasedDevelopment.getBranchMetrics(mock.AZURE_ALL_BRANCHES_RESPONSE);

    expect(result).toEqual(mock.SERVER_ALL_BRANCHES_RESPONSE);
  });

  it('should return branches count as zero when there is no branches', () => {
    const result = TrunkBasedDevelopment.getBranchMetrics(mock.AZURE_COUNT_ZERO_RESPONSE);

    expect(result).toEqual(mock.SERVER_COUNT_ZERO_ALL_BRANCHES_RESPONSE);
  });
});

describe('TrunkBasedDevelopment~getActiveBranchMetrics - method to get active branches', () => {
  it('should return active branches', () => {
    const result = TrunkBasedDevelopment.getActiveBranchMetrics(mock.AZURE_ACTIVE_BRANCHES_RESPONSE);

    expect(result).toEqual(mock.SERVER_ACTIVE_BRANCHES_RESPONSE);
  });

  it('should return branch count as zero when there is no active branches', () => {
    const result = TrunkBasedDevelopment.getActiveBranchMetrics(mock.AZURE_COUNT_ZERO_RESPONSE);

    expect(result).toEqual(mock.SERVER_COUNT_ZERO_ACTIVE_BRANCHES_RESPONSE);
  });
});

describe('TrunkBasedDevelopment~getPullRequestMetrics - method to get pull requests', () => {
  it('should return pull requests', () => {
    const result = TrunkBasedDevelopment.getPullRequestMetrics(mock.AZURE_PULL_REQUESTS_RESPONSE);

    expect(result).toEqual(mock.SERVER_PULL_REQUESTS_RESPONSE);
  });

  it('should return pull request count as zero when there is no pull requests', () => {
    const result = TrunkBasedDevelopment.getPullRequestMetrics(mock.AZURE_COUNT_ZERO_RESPONSE);

    expect(result).toEqual(mock.SERVER_COUNT_ZERO_PULL_REQUESTS_RESPONSE);
  });
});

describe('TrunkBasedDevelopment~getTrunkBranchCommits - method to get commits of trunk branch', () => {
  it('should return commits with commits count', () => {
    const result = TrunkBasedDevelopment.getTrunkBranchCommits(mock.AZURE_TRUNK_BRANCH_COMMITS_RESPONSE);

    expect(result).toEqual(mock.SERVER_TRUNK_BRANCH_COMMITS_RESPONSE);
  });

  it('should return commits count as zero when there is no commits', () => {
    const result = TrunkBasedDevelopment.getTrunkBranchCommits(mock.AZURE_COUNT_ZERO_RESPONSE);

    expect(result).toEqual(mock.SERVER_COUNT_ZERO_TRUNK_BRANCH_COMMITS_RESPONSE);
  });
});
