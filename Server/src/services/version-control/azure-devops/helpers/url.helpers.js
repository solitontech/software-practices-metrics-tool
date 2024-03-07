import { ServerConfiguration } from '../../../../configs/server.config.js';

export class AzureDevopsURL {
  static #baseUrl;

  static {
    const { organization, projectName, repositoryId } = ServerConfiguration.versionControl;

    const url = new URL(`https://dev.azure.com/${organization}/${projectName}/_git/${repositoryId}`);

    this.#baseUrl = url.href;
  }

  static getPullRequestURL(pullRequestId) {
    const url = new URL(`${this.#baseUrl}/pullrequest/${pullRequestId}`);

    return url.href;
  }

  static getBranchesURL() {
    const url = new URL(`${this.#baseUrl}/branches`);

    url.searchParams.append('a', 'all');
    url.searchParams.append('_a', 'all');

    return url.href;
  }

  static getBranchURL(name) {
    const url = new URL(this.#baseUrl);

    url.searchParams.append('version', `GB${name}`);

    return url.href;
  }
}
