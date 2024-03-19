import axios from 'axios';
import btoa from 'btoa';
import { URL } from 'node:url';

import { STATUS_CODE } from '##/constants/index.js';
import { AppError } from '##/utils/index.js';
import { ServerConfiguration } from '##/configs/server.config.js';

const {
  organization: ORGANIZATION,
  projectName: PROJECT,
  repositoryId: REPOSITORY_ID,
  targetBranch: TARGET_BRANCH,
  authToken: TOKEN,
} = ServerConfiguration.versionControl;

export class AzureDevopsApi {
  static #baseUrl = new URL(`https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_apis/git/repositories/${REPOSITORY_ID}`);
  static #apiVersion = '7.1-preview.1';

  static #dataNotFound = 'No data found.';
  static #invalidAzureToken =
    'Unauthorized access. Either invalid Azure DevOps token or invalid organization found in the configuration.';
  static #invalidRepositoryDetails =
    'No data found. You either do not have permission for the provided token or verify the organization, project, repository & trunk branch in the configuration.';

  static #throwErrorMessages(response) {
    if (response.status === STATUS_CODE.NON_AUTHORITATIVE_INFORMATION) {
      return AppError.throwAppError(this.#invalidAzureToken, STATUS_CODE.UNAUTHORIZED_ACCESS);
    }
  }

  static #throwAxiosErrorMessages(response) {
    if (response.status === STATUS_CODE.NOT_FOUND) {
      return AppError.throwAppError(this.#invalidRepositoryDetails, STATUS_CODE.NOT_FOUND);
    }

    if (response.status === STATUS_CODE.UNAUTHORIZED_ACCESS) {
      return AppError.throwAppError(this.#invalidAzureToken, STATUS_CODE.UNAUTHORIZED_ACCESS);
    }
  }

  static #validateResponse(response) {
    if (!response.count) {
      return AppError.throwAppError(this.#dataNotFound, STATUS_CODE.NOT_FOUND);
    }
  }

  static #getFilteredPullRequests(pullRequests) {
    const squads = ServerConfiguration.clientFiltersSquads;
    const developerIds = squads.flatMap((squad) => Object.keys(squad.developers));

    if (!developerIds.length) {
      return pullRequests;
    }

    return pullRequests.filter(({ createdBy }) => developerIds.includes(createdBy.id));
  }

  static async #fetchApi(url) {
    let apiResponse;

    try {
      const response = await axios.get(url, {
        headers: {
          // authorization format - 'username:password'.
          Authorization: `Basic ${btoa(':' + TOKEN)}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === STATUS_CODE.OK) {
        return response.data;
      }

      apiResponse = response;
    } catch (error) {
      this.#throwAxiosErrorMessages(error.response);
    }

    this.#throwErrorMessages(apiResponse);
  }

  static async #fetchPullRequestsThreads(pullRequests) {
    const threads = pullRequests.map(async ({ pullRequestId }) => {
      const url = new URL(this.#baseUrl + `/pullRequests/${pullRequestId}/threads`);

      url.searchParams.append('api-version', this.#apiVersion);

      const response = await this.#fetchApi(url.href);
      this.#validateResponse(response);

      return response;
    });

    return await Promise.allSettled(threads);
  }

  static get invalidAzureToken() {
    return this.#invalidAzureToken;
  }

  static get invalidRepositoryDetails() {
    return this.#invalidRepositoryDetails;
  }

  static get dataNotFound() {
    return this.#dataNotFound;
  }

  static async fetchPullRequestsList(startDate, endDate, paginationCursor, paginationSize) {
    const skip = (paginationCursor - 1) * paginationSize;
    const url = new URL(this.#baseUrl + '/pullRequests');

    url.searchParams.append('searchCriteria.status', 'all');
    url.searchParams.append('searchCriteria.targetRefName', `refs/heads/${TARGET_BRANCH}`);
    url.searchParams.append('searchCriteria.queryTimeRangeType', 'created');
    url.searchParams.append('searchCriteria.minTime', startDate);
    url.searchParams.append('searchCriteria.maxTime', endDate);
    url.searchParams.append('$top', paginationSize);
    url.searchParams.append('$skip', skip);
    url.searchParams.append('api-version', this.#apiVersion);

    const response = await this.#fetchApi(url.href);
    this.#validateResponse(response);

    return response;
  }

  static async fetchPullRequests(startDate, endDate, paginationCursor, paginationSize) {
    const { value: pullRequests } = await this.fetchPullRequestsList(
      startDate,
      endDate,
      paginationCursor,
      paginationSize
    );

    const filteredPullRequests = this.#getFilteredPullRequests(pullRequests);

    const pullRequestsThreads = await this.#fetchPullRequestsThreads(filteredPullRequests);

    const pullRequestsWithThreads = filteredPullRequests.filter((pullRequest, idx) => {
      if (pullRequestsThreads[idx].status === 'fulfilled') {
        pullRequest.threads = pullRequestsThreads[idx].value.value;

        return pullRequest;
      }
    });

    return {
      pullRequests: pullRequestsWithThreads,
      filteredCount: pullRequests.length - filteredPullRequests.length,
      errorCount: filteredPullRequests.length - pullRequestsWithThreads.length,
    };
  }

  static async fetchAllBranches() {
    const url = new URL(this.#baseUrl + '/refs');

    url.searchParams.append('filter', 'heads');
    url.searchParams.append('api-version', this.#apiVersion);

    const response = await this.#fetchApi(url.href);
    this.#validateResponse(response);

    return response;
  }

  static async fetchActivePullRequests(paginationCursor, paginationSize) {
    const skip = (paginationCursor - 1) * paginationSize;

    const url = new URL(this.#baseUrl + '/pullRequests');

    url.searchParams.append('searchCriteria.status', 'active');
    url.searchParams.append('searchCriteria.targetRefName', `refs/heads/${TARGET_BRANCH}`);
    url.searchParams.append('$top', paginationSize);
    url.searchParams.append('$skip', skip);
    url.searchParams.append('api-version', this.#apiVersion);

    const response = await this.#fetchApi(url.href);
    this.#validateResponse(response);

    return response;
  }

  static async fetchCommitsList(startDate, endDate, paginationCursor, paginationSize) {
    const skip = (paginationCursor - 1) * paginationSize;
    const url = new URL(this.#baseUrl + '/commits');

    url.searchParams.append('searchCriteria.itemVersion.version', TARGET_BRANCH);
    url.searchParams.append('searchCriteria.fromDate', startDate);
    url.searchParams.append('searchCriteria.toDate', endDate);
    url.searchParams.append('api-version', this.#apiVersion);
    url.searchParams.append('$top', paginationSize);
    url.searchParams.append('$skip', skip);

    const response = await this.#fetchApi(url.href);
    this.#validateResponse(response);

    return response;
  }
}
