import axios from 'axios';
import { jest, describe, it, expect, afterEach } from '@jest/globals';

import { AppError } from '../../../../../../../src/utils/app-error.js';
import { ServerConfiguration } from '../../../../../../../src/configs/server.config.js';
import { AzureDevopsApi } from '../../../../../../../src/services/version-control/azure-devops/apis/azure-devops.api.js';

import { STATUS_CODE } from '../../../../../../../src/constants/http-status-code.constant.js';
import {
  AZURE_PULL_REQUESTS_RESPONSE,
  PULL_REQUESTS_WITH_THREADS,
  PULL_REQUESTS_WITH_THREADS_ERROR,
  PULL_REQUESTS_WITH_THREADS_ERROR_FILTERED,
  PULL_REQUESTS_WITH_THREADS_FILTERED,
  SQUADS,
  THREADS,
} from './fetch-pull-requests.mock.js';

jest.mock('axios');

const {
  organization: ORGANIZATION,
  projectName: PROJECT,
  repositoryId: REPOSITORY_ID,
  authToken: TOKEN,
} = ServerConfiguration.versionControl;

const HEADER = ':' + TOKEN;
const BASE_URL = `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_apis/git/repositories/${REPOSITORY_ID}`;
const START_DATE = '2022-01-01';
const END_DATE = '2022-12-31';
const PAGE = 1;
const PAGE_SIZE = 10;
const AXIOS_REQUEST_PARAMETERS = [
  `${BASE_URL}/pullRequests?searchCriteria.status=all&searchCriteria.targetRefName=refs%2Fheads%2Fmain&searchCriteria.queryTimeRangeType=created&searchCriteria.minTime=${START_DATE}&searchCriteria.maxTime=${END_DATE}&%24top=${PAGE_SIZE}&%24skip=${
    PAGE - 1 // this is shortcut to find the skip when page is 1, DO NOT CHANGE VALUE OF 'page', this will break
  }&api-version=7.1-preview.1`,
  {
    headers: {
      Authorization: `Basic ${btoa(HEADER)}`,
      'Content-Type': 'application/json',
    },
  },
];

describe('AzureDevopsApi~fetchPullRequests - return pull requests with threads in azure repository within the selected range', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should fetch pull requests with threads successfully from azure repository for selected range', async () => {
    jest.spyOn(ServerConfiguration, 'clientFiltersSquads', 'get').mockImplementation(() => {
      return [];
    });

    // when the data is return successfully from all the API calls
    axios.get = jest.fn().mockImplementation((url) => {
      if (url.startsWith(BASE_URL + '/pullRequests/1/threads?')) {
        return Promise.resolve({ data: THREADS, status: STATUS_CODE.OK });
      }
      if (url.startsWith(BASE_URL + '/pullRequests/2/threads?')) {
        return Promise.resolve({ data: THREADS, status: STATUS_CODE.OK });
      }
      if (url.startsWith(BASE_URL + '/pullRequests/3/threads?')) {
        return Promise.resolve({ data: THREADS, status: STATUS_CODE.OK });
      }
      if (url.startsWith(BASE_URL + '/pullRequests?')) {
        return Promise.resolve({ data: AZURE_PULL_REQUESTS_RESPONSE, status: STATUS_CODE.OK });
      }
    });

    const response = await AzureDevopsApi.fetchPullRequests(START_DATE, END_DATE, PAGE, PAGE_SIZE);

    expect(axios.get).toHaveBeenCalledTimes(4);

    // check for the first API call to be the pull requests list
    expect(axios.get.mock.calls[0][0]).toEqual(AXIOS_REQUEST_PARAMETERS[0]);
    expect(axios.get.mock.calls[0][1]).toEqual(AXIOS_REQUEST_PARAMETERS[1]);

    // and next 3 calls to be the threads for each pull request
    for (let i = 1; i < 4; i++) {
      expect(axios.get.mock.calls[i][0]).toEqual(BASE_URL + `/pullRequests/${i}/threads?api-version=7.1-preview.1`);
      expect(axios.get.mock.calls[i][1]).toEqual(AXIOS_REQUEST_PARAMETERS[1]);
    }

    expect(response).toEqual(PULL_REQUESTS_WITH_THREADS);
  });

  it('should fetch pull requests threads successfully even any pull request thread request failed', async () => {
    jest.spyOn(ServerConfiguration, 'clientFiltersSquads', 'get').mockImplementation(() => {
      return [];
    });

    // when the data is return successfully from all the API calls expect the first pull request threads API call
    axios.get = jest.fn().mockImplementation((url) => {
      if (url.startsWith(BASE_URL + '/pullRequests/1/threads?')) {
        return Promise.reject();
      }
      if (url.startsWith(BASE_URL + '/pullRequests/2/threads?')) {
        return Promise.resolve({ data: THREADS, status: STATUS_CODE.OK });
      }
      if (url.startsWith(BASE_URL + '/pullRequests/3/threads?')) {
        return Promise.resolve({ data: THREADS, status: STATUS_CODE.OK });
      }
      if (url.startsWith(BASE_URL + '/pullRequests?')) {
        return Promise.resolve({ data: AZURE_PULL_REQUESTS_RESPONSE, status: STATUS_CODE.OK });
      }
    });

    const response = await AzureDevopsApi.fetchPullRequests(START_DATE, END_DATE, PAGE, PAGE_SIZE);

    expect(axios.get).toHaveBeenCalledTimes(4);

    // check for the first API call to be the pull requests list
    expect(axios.get.mock.calls[0][0]).toEqual(AXIOS_REQUEST_PARAMETERS[0]);
    expect(axios.get.mock.calls[0][1]).toEqual(AXIOS_REQUEST_PARAMETERS[1]);

    // and next 3 calls to be the threads for each pull request
    for (let i = 1; i < 4; i++) {
      expect(axios.get.mock.calls[i][0]).toEqual(BASE_URL + `/pullRequests/${i}/threads?api-version=7.1-preview.1`);
      expect(axios.get.mock.calls[i][1]).toEqual(AXIOS_REQUEST_PARAMETERS[1]);
    }

    expect(response).toEqual(PULL_REQUESTS_WITH_THREADS_ERROR);
  });

  it('should fetch pull requests threads successfully when client filters are configured', async () => {
    // when the user configured the filters
    jest.spyOn(ServerConfiguration, 'clientFiltersSquads', 'get').mockImplementation(() => {
      return SQUADS;
    });

    // when the data is return successfully from all the API calls
    axios.get = jest.fn().mockImplementation((url) => {
      if (url.startsWith(BASE_URL + '/pullRequests/1/threads?')) {
        return Promise.resolve({ data: THREADS, status: STATUS_CODE.OK });
      }
      if (url.startsWith(BASE_URL + '/pullRequests/2/threads?')) {
        return Promise.resolve({ data: THREADS, status: STATUS_CODE.OK });
      }
      if (url.startsWith(BASE_URL + '/pullRequests/3/threads?')) {
        return Promise.resolve({ data: THREADS, status: STATUS_CODE.OK });
      }
      if (url.startsWith(BASE_URL + '/pullRequests?')) {
        return Promise.resolve({ data: AZURE_PULL_REQUESTS_RESPONSE, status: STATUS_CODE.OK });
      }
    });

    const response = await AzureDevopsApi.fetchPullRequests(START_DATE, END_DATE, PAGE, PAGE_SIZE);

    expect(axios.get).toHaveBeenCalledTimes(3);

    // check for the first API call to be the pull requests list
    expect(axios.get.mock.calls[0][0]).toEqual(AXIOS_REQUEST_PARAMETERS[0]);
    expect(axios.get.mock.calls[0][1]).toEqual(AXIOS_REQUEST_PARAMETERS[1]);

    // and next 2 calls to be the threads for each pull request as a pull request got filtered using squads
    for (let i = 1; i < 3; i++) {
      expect(axios.get.mock.calls[i][0]).toEqual(BASE_URL + `/pullRequests/${i}/threads?api-version=7.1-preview.1`);
      expect(axios.get.mock.calls[i][1]).toEqual(AXIOS_REQUEST_PARAMETERS[1]);
    }

    expect(response).toEqual(PULL_REQUESTS_WITH_THREADS_FILTERED);
  });

  it('should fetch pull requests threads successfully when client filters are configured and any of the pull request threads request failed', async () => {
    // when the user configured the filters
    jest.spyOn(ServerConfiguration, 'clientFiltersSquads', 'get').mockImplementation(() => {
      return SQUADS;
    });

    // when the data is return successfully from all the API calls expect the first pull request threads API call
    axios.get = jest.fn().mockImplementation((url) => {
      if (url.startsWith(BASE_URL + '/pullRequests/1/threads?')) {
        return Promise.reject();
      }
      if (url.startsWith(BASE_URL + '/pullRequests/2/threads?')) {
        return Promise.resolve({ data: THREADS, status: STATUS_CODE.OK });
      }
      if (url.startsWith(BASE_URL + '/pullRequests/3/threads?')) {
        return Promise.resolve({ data: THREADS, status: STATUS_CODE.OK });
      }
      if (url.startsWith(BASE_URL + '/pullRequests?')) {
        return Promise.resolve({ data: AZURE_PULL_REQUESTS_RESPONSE, status: STATUS_CODE.OK });
      }
    });

    const response = await AzureDevopsApi.fetchPullRequests(START_DATE, END_DATE, PAGE, PAGE_SIZE);

    expect(axios.get).toHaveBeenCalledTimes(3);

    // check for the first API call to be the pull requests list
    expect(axios.get.mock.calls[0][0]).toEqual(AXIOS_REQUEST_PARAMETERS[0]);
    expect(axios.get.mock.calls[0][1]).toEqual(AXIOS_REQUEST_PARAMETERS[1]);

    // and next 2 calls to be the threads for each pull request as a pull request got filtered using squads
    for (let i = 1; i < 3; i++) {
      expect(axios.get.mock.calls[i][0]).toEqual(BASE_URL + `/pullRequests/${i}/threads?api-version=7.1-preview.1`);
      expect(axios.get.mock.calls[i][1]).toEqual(AXIOS_REQUEST_PARAMETERS[1]);
    }

    expect(response).toEqual(PULL_REQUESTS_WITH_THREADS_ERROR_FILTERED);
  });

  it('should throw AppError with status 404 when no pull requests are found in repository', async () => {
    jest.spyOn(ServerConfiguration, 'clientFiltersSquads', 'get').mockImplementation(() => {
      return [];
    });
    const mockResponse = { data: { count: 0, value: [] }, status: STATUS_CODE.OK };

    axios.get = jest.fn().mockResolvedValue(mockResponse);
    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchPullRequests(START_DATE, END_DATE, PAGE, PAGE_SIZE);

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);
    await expect(response).rejects.toThrow(AppError);
    expect(AppError.throwAppError).toHaveBeenCalledWith(AzureDevopsApi.dataNotFound, STATUS_CODE.NOT_FOUND);
  });

  it('should throw AppError with status 404 when request to azure api fails due to 404', async () => {
    jest.spyOn(ServerConfiguration, 'clientFiltersSquads', 'get').mockImplementation(() => {
      return [];
    });
    axios.get = jest.fn().mockRejectedValue({ response: { status: STATUS_CODE.NOT_FOUND } });
    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchPullRequests(START_DATE, END_DATE, PAGE, PAGE_SIZE);

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);
    await expect(response).rejects.toThrow(AppError);
    expect(AppError.throwAppError).toHaveBeenCalledWith(AzureDevopsApi.invalidRepositoryDetails, STATUS_CODE.NOT_FOUND);
  });

  it('should throw AppError with status 401 when request to azure api fails due to 401', async () => {
    jest.spyOn(ServerConfiguration, 'clientFiltersSquads', 'get').mockImplementation(() => {
      return [];
    });
    axios.get = jest.fn().mockRejectedValue({ response: { status: STATUS_CODE.UNAUTHORIZED_ACCESS } });
    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchPullRequests(START_DATE, END_DATE, PAGE, PAGE_SIZE);

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);
    await expect(response).rejects.toThrow(AppError);
    expect(AppError.throwAppError).toHaveBeenCalledWith(
      AzureDevopsApi.invalidAzureToken,
      STATUS_CODE.UNAUTHORIZED_ACCESS
    );
  });

  it('should throw AppError with status 401 when request to azure api fails due to 203', async () => {
    jest.spyOn(ServerConfiguration, 'clientFiltersSquads', 'get').mockImplementation(() => {
      return [];
    });
    axios.get = jest.fn().mockResolvedValue({ status: STATUS_CODE.NON_AUTHORITATIVE_INFORMATION });
    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchPullRequests(START_DATE, END_DATE, PAGE, PAGE_SIZE);

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);
    await expect(response).rejects.toThrow(AppError);
    expect(AppError.throwAppError).toHaveBeenCalledWith(
      AzureDevopsApi.invalidAzureToken,
      STATUS_CODE.UNAUTHORIZED_ACCESS
    );
  });
});
