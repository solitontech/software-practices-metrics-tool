import axios from 'axios';
import btoa from 'btoa';
import { URL } from 'node:url';

import { STATUS_CODE } from '../../../../constants/constants.js';
import { AppError } from '../../../../utils/app-error.js';
import { ServerConfiguration } from '../../../../configs/server-config.js';
import { getFilteredPullRequests } from './api-utils.js';

const {
  organization: ORGANIZATION,
  projectName: PROJECT,
  repositoryId: REPOSITORY_ID,
  targetBranch: TARGET_BRANCH,
  authToken: TOKEN,
} = ServerConfiguration.versionControl;

const { OK, NON_AUTHORITATIVE_INFORMATION, NOT_FOUND, UNAUTHORIZED_ACCESS } = STATUS_CODE;

export class AzureDevopsApi {
  static #baseUrl = new URL(`https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_apis/git/repositories/${REPOSITORY_ID}`);
  // basic authorization header format - 'username:password'.
  static #header = ':' + TOKEN;
  static #authorizationHeader = `Basic ${btoa(this.#header)}`;
  static #apiVersion = '7.1-preview.1';
  static #promiseFulfilled = 'fulfilled';
  static #invalidAzureToken =
    'Unauthorized access. Either invalid Azure DevOps token or invalid organization found in the configuration.';
  static #dataNotFound = 'No data found.';
  static #invalidRepositoryDetails =
    'No data found. You either do not have permission for the provided token or verify the organization, project, repository & trunk branch in the configuration.';

  static async #fetchApi(url) {
    let apiResponse;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: this.#authorizationHeader,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === OK) {
        return response.data;
      }

      apiResponse = response;
    } catch (error) {
      this.#throwAxiosErrorMessages(error);
    }

    this.#throwErrorMessages(apiResponse);
  }

  static #throwErrorMessages(response) {
    if (response.status === NON_AUTHORITATIVE_INFORMATION) {
      AppError.throwAppError(this.#invalidAzureToken, UNAUTHORIZED_ACCESS);
    }
  }

  static #validateResponse(response) {
    if (!response.count) {
      AppError.throwAppError(this.#dataNotFound, NOT_FOUND);
    }
  }

  static #throwAxiosErrorMessages(error) {
    if (error.response.status === NOT_FOUND) {
      AppError.throwAppError(this.#invalidRepositoryDetails, NOT_FOUND);
    }

    if (error.response.status === UNAUTHORIZED_ACCESS) {
      AppError.throwAppError(this.#invalidAzureToken, UNAUTHORIZED_ACCESS);
    }
  }

  static hasOneItem(length) {
    return length === 1;
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

  static async #fetchPullRequestsThreads(pullRequests) {
    const pullRequestData = await Promise.allSettled(
      pullRequests.map(async ({ pullRequestId }) => {
        const url = new URL(this.#baseUrl + `/pullRequests/${pullRequestId}/threads`);

        url.searchParams.append('api-version', this.#apiVersion);

        const response = await this.#fetchApi(url.href);
        this.#validateResponse(response);

        return response;
      })
    );

    return pullRequestData;
  }

  static async fetchPullRequests(startDate, endDate, paginationCursor, paginationSize) {
    const { value: pullRequests } = await this.fetchPullRequestsList(
      startDate,
      endDate,
      paginationCursor,
      paginationSize
    );

    const filteredPullRequests = getFilteredPullRequests(pullRequests);

    const pullRequestsThreads = await this.#fetchPullRequestsThreads(filteredPullRequests);

    const pullRequestsWithThreads = filteredPullRequests.filter((pullRequest, index) => {
      if (pullRequestsThreads[index].status === this.#promiseFulfilled) {
        pullRequest.threads = pullRequestsThreads[index].value.value;

        return pullRequest;
      }
    });

    return {
      pullRequests: pullRequestsWithThreads,
      errorCount: filteredPullRequests.length - pullRequestsWithThreads.length,
      filteredCount: pullRequests.length - filteredPullRequests.length,
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
