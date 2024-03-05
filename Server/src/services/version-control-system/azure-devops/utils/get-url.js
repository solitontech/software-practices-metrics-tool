import { ServerConfiguration } from '../../../../configs/server.config.js';

const {
  organization: ORGANIZATION,
  projectName: PROJECT,
  repositoryId: REPOSITORY_ID,
} = ServerConfiguration.versionControl;

export const getAzureDevOpsRepositoryBaseURL = () => {
  const baseUrl = new URL(`https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_git/${REPOSITORY_ID}`);

  return baseUrl.href;
};

export const getAzureDevOpsPullRequestURL = (pullRequestId) => {
  const baseUrl = getAzureDevOpsRepositoryBaseURL();

  return `${baseUrl}/pullrequest/${pullRequestId}`;
};

export const getAzureDevopsBranchesURL = () => {
  const baseUrl = getAzureDevOpsRepositoryBaseURL();
  const url = new URL(baseUrl + '/branches');

  url.searchParams.append('a', 'all');
  url.searchParams.append('_a', 'all');

  return url.href;
};

export const getAzureDevOpsBranchURL = (name) => {
  const baseUrl = getAzureDevOpsRepositoryBaseURL();
  const url = new URL(baseUrl);

  url.searchParams.append('version', `GB${name}`);

  return url.href;
};
