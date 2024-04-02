import { describe, it, expect } from '@jest/globals';

import { AzureDevopsURL } from './url.helpers.js';
import { ServerConfiguration } from '##/configs/server.config.js';

const {
  organization: ORGANIZATION,
  projectName: PROJECT,
  repositoryId: REPOSITORY_ID,
} = ServerConfiguration.versionControl;

describe('AzureDevopsURL~getPullRequestURL - method to return azure devops pull request URL for given pull request id', () => {
  it('should return the correct URL for a pull request', () => {
    const pullRequestId = 1750;

    const url = AzureDevopsURL.getPullRequestURL(pullRequestId);

    expect(url).toBe(
      `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/pullrequest/${pullRequestId}`
    );
  });
});

describe('AzureDevopsURL~getBranchesURL - method to return azure devops branches URL', () => {
  it('should return the correct URL for branches', () => {
    const url = AzureDevopsURL.getBranchesURL();

    expect(url).toBe(`https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}/branches?a=all&_a=all`);
  });
});

describe('AzureDevopsURL~getBranchURL - method to return azure devops branch URL for given branch', () => {
  it('should return the correct URL for a branch', () => {
    const url = AzureDevopsURL.getBranchURL('testBranch');

    expect(url).toBe(`https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}?version=GBtestBranch`);
  });
});
