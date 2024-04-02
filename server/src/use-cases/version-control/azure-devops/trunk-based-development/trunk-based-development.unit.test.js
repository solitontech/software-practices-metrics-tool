import { describe, it, expect } from '@jest/globals';

import { TrunkBasedDevelopment } from './trunk-based-development.js';

import { ServerConfiguration } from '##/configs/server.config.js';

const {
  organization: ORGANIZATION,
  projectName: PROJECT,
  repositoryId: REPOSITORY_ID,
} = ServerConfiguration.versionControl;

describe('TrunkBasedDevelopment~getBranchMetrics - method to transform branches into following and not following branch naming standard', () => {
  it('should transform branches into following and not following naming standard', () => {
    const branches = [
      { name: 'users/dev/branch-name', objectId: 'a30a4b19037819eed3ded296ae074f7443f803f2' },
      { name: 'branch-name', objectId: 'a30a4b19037819eed3ded296ae074f7443f803f2' },
      { name: 'users/dev/branch-name2', objectId: 'a30a4b19037819eed3ded296ae074f7443f803f2' },
      { name: 'branch-name2', objectId: 'a30a4b19037819eed3ded296ae074f7443f803f2' },
    ];

    const result = TrunkBasedDevelopment.getBranchMetrics({ value: branches, count: branches.length });

    expect(result).toEqual({
      branchesURL: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/branches?a=all&_a=all`,
      totalNumberOfBranches: 4,
      percentageOfBranchesFollowingStandard: '50.00%',
      branchesFollowingNamingStandard: {
        count: 2,
        branches: [
          {
            id: 'a30a4b19037819eed3ded296ae074f7443f803f2',
            name: 'users/dev/branch-name',
            url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBusers%2Fdev%2Fbranch-name`,
          },
          {
            id: 'a30a4b19037819eed3ded296ae074f7443f803f2',
            name: 'users/dev/branch-name2',
            url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBusers%2Fdev%2Fbranch-name2`,
          },
        ],
      },
      branchesNotFollowingNamingStandard: {
        count: 2,
        branches: [
          {
            id: 'a30a4b19037819eed3ded296ae074f7443f803f2',
            name: 'branch-name',
            url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBbranch-name`,
          },
          {
            id: 'a30a4b19037819eed3ded296ae074f7443f803f2',
            name: 'branch-name2',
            url: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBbranch-name2`,
          },
        ],
      },
    });
  });

  it('should handle no branches', () => {
    const branches = [];

    const result = TrunkBasedDevelopment.getBranchMetrics({ value: branches, count: branches.length });

    expect(result).toEqual({
      branchesURL: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/branches?a=all&_a=all`,
      totalNumberOfBranches: 0,
      percentageOfBranchesFollowingStandard: 'NaN%',
      branchesFollowingNamingStandard: { count: 0, branches: [] },
      branchesNotFollowingNamingStandard: { count: 0, branches: [] },
    });
  });
});

describe('TrunkBasedDevelopment~getActiveBranchMetrics - method to transform active branches', () => {
  it('should transform active branches', () => {
    const branches = [
      {
        pullRequestId: '2627',
        title: 'title1',
        sourceRefName: 'branch1',
        creationDate: '2024-02-12T10:58:33.4719437Z',
        createdBy: { displayName: 'user1' },
      },
      {
        pullRequestId: '2628',
        title: 'title2',
        sourceRefName: 'branch2',
        creationDate: '2024-02-12T10:58:33.4719437Z',
        createdBy: { displayName: 'user2' },
      },
    ];

    const result = TrunkBasedDevelopment.getActiveBranchMetrics({ count: branches.length, value: branches });

    expect(result).toEqual({
      count: 2,
      branches: [
        {
          name: 'branch1',
          title: '2627 - title1',
          createdBy: 'user1',
          creationDate: '2024-02-12T10:58:33.4719437Z',
          pullRequestURL: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2627`,
          branchURL: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBbranch1`,
        },
        {
          name: 'branch2',
          title: '2628 - title2',
          createdBy: 'user2',
          creationDate: '2024-02-12T10:58:33.4719437Z',
          pullRequestURL: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2628`,
          branchURL: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBbranch2`,
        },
      ],
    });
  });

  it('should handle no active branches', () => {
    const branches = [];

    const result = TrunkBasedDevelopment.getActiveBranchMetrics({ count: branches.length, value: branches });

    expect(result).toEqual({
      count: 0,
      branches: [],
    });
  });
});

describe('TrunkBasedDevelopment~getPullRequestMetrics - method to transform pull requests', () => {
  it('should transform pull requests', () => {
    const pullRequests = [
      {
        pullRequestId: '2628',
        title: 'title2',
        sourceRefName: 'branch2',
        creationDate: '2024-02-12T10:58:33.4719437Z',
        status: 'completed',
        closedDate: '2024-02-12T10:58:33.4719437Z',
      },
    ];

    const result = TrunkBasedDevelopment.getPullRequestMetrics({ count: pullRequests.length, value: pullRequests });

    expect(result).toEqual({
      count: 1,
      pullRequests: [
        {
          name: 'branch2',
          title: '2628 - title2',
          status: 'completed',
          creationDate: '2024-02-12T10:58:33.4719437Z',
          closedDate: '2024-02-12T10:58:33.4719437Z',
          pullRequestURL: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2628`,
          branchURL: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBbranch2`,
        },
      ],
    });
  });

  it('should transform pull requests with no closed date', () => {
    const pullRequests = [
      {
        pullRequestId: '2627',
        title: 'title1',
        sourceRefName: 'branch1',
        creationDate: '2024-02-12T10:58:33.4719437Z',
        status: 'active',
      },
    ];

    const result = TrunkBasedDevelopment.getPullRequestMetrics({ count: pullRequests.length, value: pullRequests });

    expect(result).toEqual({
      count: 1,
      pullRequests: [
        {
          name: 'branch1',
          title: '2627 - title1',
          status: 'active',
          creationDate: '2024-02-12T10:58:33.4719437Z',
          closedDate: null,
          pullRequestURL: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/2627`,
          branchURL: `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBbranch1`,
        },
      ],
    });
  });

  it('should handle no pull requests', () => {
    const pullRequests = [];

    const result = TrunkBasedDevelopment.getPullRequestMetrics({ count: pullRequests.length, value: pullRequests });

    expect(result).toEqual({
      count: 0,
      pullRequests: [],
    });
  });
});

describe('TrunkBasedDevelopment~getTrunkBranchCommits - method to transform commits of trunk branch', () => {
  it('should transform commits', () => {
    const commits = [
      { commitId: '5747f0d8e98c818228c4841a4916d2ab478c4b82', comment: 'comment1', author: 'author1' },
      { commitId: '5747f0d8e98c818228c4841a4916d2ab478c4b82', comment: 'comment2', author: 'author2' },
    ];

    const result = TrunkBasedDevelopment.getTrunkBranchCommits({ count: commits.length, value: commits });

    expect(result).toEqual({
      count: 2,
      commits: [
        { id: '5747f0d8e98c818228c4841a4916d2ab478c4b82', comment: 'comment1', author: 'author1' },
        { id: '5747f0d8e98c818228c4841a4916d2ab478c4b82', comment: 'comment2', author: 'author2' },
      ],
    });
  });

  it('should handle no commits', () => {
    const commits = [];

    const result = TrunkBasedDevelopment.getTrunkBranchCommits({ count: commits.length, value: commits });

    expect(result).toEqual({
      count: 0,
      commits: [],
    });
  });
});
