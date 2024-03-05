import { ServerConfiguration } from '../../../../configs/server.config.js';

const { organization, projectName, repositoryId } = ServerConfiguration.versionControl;

const getAzureDevOpsRepositoryBaseURL = () => {
  const baseUrl = new URL(`https://dev.azure.com/${organization}/${projectName}/_git/${repositoryId}`);

  return baseUrl.href;
};

export const getAzureDevOpsPullRequestURL = (pullRequestId) => {
  const baseUrl = getAzureDevOpsRepositoryBaseURL();
  const url = new URL(baseUrl + '/pullrequest/' + pullRequestId);

  return url.href;
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
