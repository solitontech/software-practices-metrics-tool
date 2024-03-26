import axios from 'axios';
import { jest, describe, it, expect, afterEach } from '@jest/globals';

import { AzureDevopsApi } from '##/use-cases/version-control/azure-devops/apis/azure-devops.api.js';
import { AppError } from '##/utils/app-error.util.js';
import { ServerConfiguration } from '##/configs/server.config.js';
import { STATUS_CODE } from '##/constants/constants.js';

import {
  ALL_BRANCHES_AZURE_RESPONSE,
  AZURE_PULL_REQUESTS_RESPONSE,
  AZURE_TRUNK_BRANCH_COMMITS_RESPONSE,
  PULL_REQUESTS_WITH_THREADS,
  PULL_REQUESTS_WITH_THREADS_ERROR,
  PULL_REQUESTS_WITH_THREADS_ERROR_FILTERED,
  PULL_REQUESTS_WITH_THREADS_FILTERED,
  CLIENT_FILTER_SQUADS,
  PULL_REQUESTS_THREADS,
} from './tests/mocks/mocks.js';

import {
  PAGE,
  PAGE_SIZE,
  START_DATE,
  END_DATE,
  AXIOS_REQUEST_BODY_PARAMETERS,
  BASE_URL,
} from './tests/constants/constants.js';

jest.mock('axios');

describe('AzureDevopsApi~fetchAllBranches - returns all branches for repository', () => {
  const AXIOS_REQUEST_PARAMETERS = AXIOS_REQUEST_BODY_PARAMETERS.FETCH_ALL_BRANCHES;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should fetch all branches successfully when data is present in azure repository', async () => {
    const mockResponse = { data: ALL_BRANCHES_AZURE_RESPONSE, status: STATUS_CODE.OK };

    axios.get = jest.fn().mockResolvedValue(mockResponse);

    const response = await AzureDevopsApi.fetchAllBranches();

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);
    expect(response).toEqual(ALL_BRANCHES_AZURE_RESPONSE);
  });

  it('should throw AppError with status 404 when no branches are found in azure repository', async () => {
    const mockResponse = { data: { value: [], count: 0 }, status: STATUS_CODE.OK };

    axios.get = jest.fn().mockResolvedValue(mockResponse);
    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchAllBranches();

    await expect(response).rejects.toThrow(AppError);

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);
    expect(AppError.throwAppError).toHaveBeenCalledWith(AzureDevopsApi.dataNotFound, STATUS_CODE.NOT_FOUND);
  });

  it('should throw AppError with status 404 when request to azure api fails due to 404', async () => {
    axios.get = jest.fn().mockRejectedValue({ response: { status: STATUS_CODE.NOT_FOUND } });
    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchAllBranches();

    await expect(response).rejects.toThrow(AppError);

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);
    expect(AppError.throwAppError).toHaveBeenCalledWith(AzureDevopsApi.invalidRepositoryDetails, STATUS_CODE.NOT_FOUND);
  });

  it('should throw AppError with status 401 when request to azure api fails due to 401', async () => {
    axios.get = jest.fn().mockRejectedValue({ response: { status: STATUS_CODE.UNAUTHORIZED_ACCESS } });
    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchAllBranches();

    await expect(response).rejects.toThrow(AppError);

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);

    expect(AppError.throwAppError).toHaveBeenCalledWith(
      AzureDevopsApi.invalidAzureToken,
      STATUS_CODE.UNAUTHORIZED_ACCESS
    );
  });

  it('should throw AppError with status 401 when request to azure api fails due to 203', async () => {
    axios.get = jest.fn().mockResolvedValue({ status: STATUS_CODE.NON_AUTHORITATIVE_INFORMATION });
    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchAllBranches();

    await expect(response).rejects.toThrow(AppError);

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);

    expect(AppError.throwAppError).toHaveBeenCalledWith(
      AzureDevopsApi.invalidAzureToken,
      STATUS_CODE.UNAUTHORIZED_ACCESS
    );
  });
});

describe('AzureDevopsApi~fetchActivePullRequests - return active pull requests in azure repository within the selected range', () => {
  const AXIOS_REQUEST_PARAMETERS = AXIOS_REQUEST_BODY_PARAMETERS.FETCH_ACTIVE_PULL_REQUESTS;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should fetch active pull requests list successfully in the repository within selected range', async () => {
    const mockResponse = { data: AZURE_PULL_REQUESTS_RESPONSE, status: STATUS_CODE.OK };
    axios.get = jest.fn().mockResolvedValue(mockResponse);

    const response = await AzureDevopsApi.fetchActivePullRequests(PAGE, PAGE_SIZE);

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);
    expect(response).toEqual(mockResponse.data);
  });

  it('should throw AppError with 404 when no pull requests found in azure repository', async () => {
    const mockResponse = { data: { count: 0, value: [] }, status: STATUS_CODE.OK };

    axios.get = jest.fn().mockResolvedValue(mockResponse);
    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchActivePullRequests(PAGE, PAGE_SIZE);

    await expect(response).rejects.toThrow(AppError);

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);
    expect(AppError.throwAppError).toHaveBeenCalledWith(AzureDevopsApi.dataNotFound, STATUS_CODE.NOT_FOUND);
  });

  it('should throw AppError with 404 when request to azure api fails due to 404', async () => {
    axios.get = jest.fn().mockRejectedValue({ response: { status: STATUS_CODE.NOT_FOUND } });
    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchActivePullRequests(PAGE, PAGE_SIZE);

    await expect(response).rejects.toThrow(AppError);

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);
    expect(AppError.throwAppError).toHaveBeenCalledWith(AzureDevopsApi.invalidRepositoryDetails, STATUS_CODE.NOT_FOUND);
  });

  it('should throw AppError with 401 when request to azure api fails due to 401', async () => {
    axios.get = jest.fn().mockRejectedValue({ response: { status: STATUS_CODE.UNAUTHORIZED_ACCESS } });
    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchActivePullRequests(PAGE, PAGE_SIZE);

    await expect(response).rejects.toThrow(AppError);

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);

    expect(AppError.throwAppError).toHaveBeenCalledWith(
      AzureDevopsApi.invalidAzureToken,
      STATUS_CODE.UNAUTHORIZED_ACCESS
    );
  });

  it('should throw AppError with 401 when request to azure api fails due to 203', async () => {
    axios.get = jest.fn().mockResolvedValue({ status: STATUS_CODE.NON_AUTHORITATIVE_INFORMATION });
    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchActivePullRequests(PAGE, PAGE_SIZE);

    await expect(response).rejects.toThrow(AppError);

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);

    expect(AppError.throwAppError).toHaveBeenCalledWith(
      AzureDevopsApi.invalidAzureToken,
      STATUS_CODE.UNAUTHORIZED_ACCESS
    );
  });
});

describe('AzureDevopsApi~fetchCommitsList - return all commits from the trunk branch in the given range.', () => {
  const AXIOS_REQUEST_PARAMETERS = AXIOS_REQUEST_BODY_PARAMETERS.FETCH_COMMITS_LIST;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should fetch commits successfully for the trunk branch in given range', async () => {
    const mockResponse = { data: AZURE_TRUNK_BRANCH_COMMITS_RESPONSE, status: STATUS_CODE.OK };
    axios.get = jest.fn().mockResolvedValue(mockResponse);

    const response = await AzureDevopsApi.fetchCommitsList(START_DATE, END_DATE, PAGE, PAGE_SIZE);

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);
    expect(response).toEqual(AZURE_TRUNK_BRANCH_COMMITS_RESPONSE);
  });

  it('should throw AppError with status 404 when no commits found in the repository', async () => {
    const mockResponse = { data: { count: 0, value: [] }, status: STATUS_CODE.OK };

    axios.get = jest.fn().mockResolvedValue(mockResponse);

    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchCommitsList(START_DATE, END_DATE, PAGE, PAGE_SIZE);

    await expect(response).rejects.toThrow(AppError);

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);
    expect(AppError.throwAppError).toHaveBeenCalledWith(AzureDevopsApi.dataNotFound, STATUS_CODE.NOT_FOUND);
  });

  it('should throw AppError with status 404 when request to azure api fails due to 404', async () => {
    axios.get = jest.fn().mockRejectedValue({ response: { status: STATUS_CODE.NOT_FOUND } });
    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchCommitsList(START_DATE, END_DATE, PAGE, PAGE_SIZE);

    await expect(response).rejects.toThrow(AppError);

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);
    expect(AppError.throwAppError).toHaveBeenCalledWith(AzureDevopsApi.invalidRepositoryDetails, STATUS_CODE.NOT_FOUND);
  });

  it('should throw AppError with status 401 when request to azure api fails due to 401', async () => {
    axios.get = jest.fn().mockRejectedValue({ response: { status: STATUS_CODE.UNAUTHORIZED_ACCESS } });
    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchCommitsList(START_DATE, END_DATE, PAGE, PAGE_SIZE);

    await expect(response).rejects.toThrow(AppError);

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);

    expect(AppError.throwAppError).toHaveBeenCalledWith(
      AzureDevopsApi.invalidAzureToken,
      STATUS_CODE.UNAUTHORIZED_ACCESS
    );
  });

  it('should throw AppError with status 203 when request to azure api fails due to 203', async () => {
    axios.get = jest.fn().mockResolvedValue({ status: STATUS_CODE.NON_AUTHORITATIVE_INFORMATION });
    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchCommitsList(START_DATE, END_DATE, PAGE, PAGE_SIZE);

    await expect(response).rejects.toThrow(AppError);

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);

    expect(AppError.throwAppError).toHaveBeenCalledWith(
      AzureDevopsApi.invalidAzureToken,
      STATUS_CODE.UNAUTHORIZED_ACCESS
    );
  });
});

describe('AzureDevopsApi~fetchPullRequests - return pull requests with threads in azure repository within the selected range', () => {
  const AXIOS_REQUEST_PARAMETERS = AXIOS_REQUEST_BODY_PARAMETERS.FETCH_PULL_REQUESTS;

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
        return Promise.resolve({ data: PULL_REQUESTS_THREADS, status: STATUS_CODE.OK });
      }
      if (url.startsWith(BASE_URL + '/pullRequests/2/threads?')) {
        return Promise.resolve({ data: PULL_REQUESTS_THREADS, status: STATUS_CODE.OK });
      }
      if (url.startsWith(BASE_URL + '/pullRequests/3/threads?')) {
        return Promise.resolve({ data: PULL_REQUESTS_THREADS, status: STATUS_CODE.OK });
      }
      if (url.startsWith(BASE_URL + '/pullRequests?')) {
        return Promise.resolve({ data: AZURE_PULL_REQUESTS_RESPONSE, status: STATUS_CODE.OK });
      }
    });

    const response = await AzureDevopsApi.fetchPullRequests(START_DATE, END_DATE, PAGE, PAGE_SIZE);

    // total 4 API calls are made, 1 API call is for fetching pull requests (count = 3)  and other 3 API calls for threads of each pull request
    expect(axios.get).toHaveBeenCalledTimes(4);

    // check for the first API call to be the pull requests list
    const [firstApiCallParameters] = axios.get.mock.calls;

    expect(firstApiCallParameters).toEqual(AXIOS_REQUEST_PARAMETERS);

    // and next 3 calls to be the threads for each pull request
    axios.get.mock.calls.slice(1, 4).forEach((call, index) => {
      const [url, config] = call;
      const expectedUrl = `${BASE_URL}/pullRequests/${index + 1}/threads?api-version=7.1-preview.1`;
      const [, expectedConfig] = AXIOS_REQUEST_PARAMETERS;

      expect(url).toEqual(expectedUrl);
      expect(config).toEqual(expectedConfig);
    });

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
        return Promise.resolve({ data: PULL_REQUESTS_THREADS, status: STATUS_CODE.OK });
      }
      if (url.startsWith(BASE_URL + '/pullRequests/3/threads?')) {
        return Promise.resolve({ data: PULL_REQUESTS_THREADS, status: STATUS_CODE.OK });
      }
      if (url.startsWith(BASE_URL + '/pullRequests?')) {
        return Promise.resolve({ data: AZURE_PULL_REQUESTS_RESPONSE, status: STATUS_CODE.OK });
      }
    });

    const response = await AzureDevopsApi.fetchPullRequests(START_DATE, END_DATE, PAGE, PAGE_SIZE);

    // total 4 API calls are made, 1 API call is for fetching pull requests (count = 3)  and other 3 API calls for threads of each pull request
    expect(axios.get).toHaveBeenCalledTimes(4);

    // check for the first API call to be the pull requests list
    const [firstApiCallParameters] = axios.get.mock.calls;

    expect(firstApiCallParameters).toEqual(AXIOS_REQUEST_PARAMETERS);

    // and next 3 calls to be the threads for each pull request
    axios.get.mock.calls.slice(1, 4).forEach((call, index) => {
      const [url, config] = call;
      const expectedUrl = `${BASE_URL}/pullRequests/${index + 1}/threads?api-version=7.1-preview.1`;
      const [, expectedConfig] = AXIOS_REQUEST_PARAMETERS;

      expect(url).toEqual(expectedUrl);
      expect(config).toEqual(expectedConfig);
    });

    expect(response).toEqual(PULL_REQUESTS_WITH_THREADS_ERROR);
  });

  it('should fetch pull requests threads successfully when client filters are configured', async () => {
    // when the user configured the filters
    jest.spyOn(ServerConfiguration, 'clientFiltersSquads', 'get').mockImplementation(() => {
      return CLIENT_FILTER_SQUADS;
    });

    // when the data is return successfully from all the API calls
    axios.get = jest.fn().mockImplementation((url) => {
      if (url.startsWith(BASE_URL + '/pullRequests/1/threads?')) {
        return Promise.resolve({ data: PULL_REQUESTS_THREADS, status: STATUS_CODE.OK });
      }
      if (url.startsWith(BASE_URL + '/pullRequests/2/threads?')) {
        return Promise.resolve({ data: PULL_REQUESTS_THREADS, status: STATUS_CODE.OK });
      }
      if (url.startsWith(BASE_URL + '/pullRequests/3/threads?')) {
        return Promise.resolve({ data: PULL_REQUESTS_THREADS, status: STATUS_CODE.OK });
      }
      if (url.startsWith(BASE_URL + '/pullRequests?')) {
        return Promise.resolve({ data: AZURE_PULL_REQUESTS_RESPONSE, status: STATUS_CODE.OK });
      }
    });

    const response = await AzureDevopsApi.fetchPullRequests(START_DATE, END_DATE, PAGE, PAGE_SIZE);

    // total 3 API calls are made, 1 API call is for fetching pull requests (count = 3)  and other 2 API calls for threads of each pull request
    // as a pull request got filtered using squads
    expect(axios.get).toHaveBeenCalledTimes(3);

    // check for the first API call to be the pull requests list
    const [firstApiCallParameters] = axios.get.mock.calls;

    expect(firstApiCallParameters).toEqual(AXIOS_REQUEST_PARAMETERS);

    // and next 2 calls to be the threads for each pull request as a pull request got filtered using squads
    axios.get.mock.calls.slice(1, 3).forEach((call, index) => {
      const [url, config] = call;
      const expectedUrl = `${BASE_URL}/pullRequests/${index + 1}/threads?api-version=7.1-preview.1`;
      const [, expectedConfig] = AXIOS_REQUEST_PARAMETERS;

      expect(url).toEqual(expectedUrl);
      expect(config).toEqual(expectedConfig);
    });

    expect(response).toEqual(PULL_REQUESTS_WITH_THREADS_FILTERED);
  });

  it('should fetch pull requests threads successfully when client filters are configured and any of the pull request threads request failed', async () => {
    // when the user configured the filters
    jest.spyOn(ServerConfiguration, 'clientFiltersSquads', 'get').mockImplementation(() => {
      return CLIENT_FILTER_SQUADS;
    });

    // when the data is return successfully from all the API calls expect the first pull request threads API call
    axios.get = jest.fn().mockImplementation((url) => {
      if (url.startsWith(BASE_URL + '/pullRequests/1/threads?')) {
        return Promise.reject();
      }
      if (url.startsWith(BASE_URL + '/pullRequests/2/threads?')) {
        return Promise.resolve({ data: PULL_REQUESTS_THREADS, status: STATUS_CODE.OK });
      }
      if (url.startsWith(BASE_URL + '/pullRequests/3/threads?')) {
        return Promise.resolve({ data: PULL_REQUESTS_THREADS, status: STATUS_CODE.OK });
      }
      if (url.startsWith(BASE_URL + '/pullRequests?')) {
        return Promise.resolve({ data: AZURE_PULL_REQUESTS_RESPONSE, status: STATUS_CODE.OK });
      }
    });

    const response = await AzureDevopsApi.fetchPullRequests(START_DATE, END_DATE, PAGE, PAGE_SIZE);

    // total 3 API calls are made, 1 API call is for fetching pull requests (count = 3)  and other 2 API calls for threads of each pull request
    // as a pull request got filtered using squads
    expect(axios.get).toHaveBeenCalledTimes(3);

    // check for the first API call to be the pull requests list
    const [firstApiCallParameters] = axios.get.mock.calls;

    expect(firstApiCallParameters).toEqual(AXIOS_REQUEST_PARAMETERS);

    // and next 2 calls to be the threads for each pull request as a pull request got filtered using squads
    axios.get.mock.calls.slice(1, 4).forEach((call, index) => {
      const [url, config] = call;
      const expectedUrl = `${BASE_URL}/pullRequests/${index + 1}/threads?api-version=7.1-preview.1`;
      const [, expectedConfig] = AXIOS_REQUEST_PARAMETERS;

      expect(url).toEqual(expectedUrl);
      expect(config).toEqual(expectedConfig);
    });

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

    await expect(response).rejects.toThrow(AppError);

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);
    expect(AppError.throwAppError).toHaveBeenCalledWith(AzureDevopsApi.dataNotFound, STATUS_CODE.NOT_FOUND);
  });

  it('should throw AppError with status 404 when request to azure api fails due to 404', async () => {
    jest.spyOn(ServerConfiguration, 'clientFiltersSquads', 'get').mockImplementation(() => {
      return [];
    });
    axios.get = jest.fn().mockRejectedValue({ response: { status: STATUS_CODE.NOT_FOUND } });
    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchPullRequests(START_DATE, END_DATE, PAGE, PAGE_SIZE);

    await expect(response).rejects.toThrow(AppError);

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);
    expect(AppError.throwAppError).toHaveBeenCalledWith(AzureDevopsApi.invalidRepositoryDetails, STATUS_CODE.NOT_FOUND);
  });

  it('should throw AppError with status 401 when request to azure api fails due to 401', async () => {
    jest.spyOn(ServerConfiguration, 'clientFiltersSquads', 'get').mockImplementation(() => {
      return [];
    });
    axios.get = jest.fn().mockRejectedValue({ response: { status: STATUS_CODE.UNAUTHORIZED_ACCESS } });
    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchPullRequests(START_DATE, END_DATE, PAGE, PAGE_SIZE);

    await expect(response).rejects.toThrow(AppError);

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);

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

    await expect(response).rejects.toThrow(AppError);

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);

    expect(AppError.throwAppError).toHaveBeenCalledWith(
      AzureDevopsApi.invalidAzureToken,
      STATUS_CODE.UNAUTHORIZED_ACCESS
    );
  });
});

describe('AzureDevopsApi~fetchPullRequestsList - return pull requests in azure repository within the selected range', () => {
  const AXIOS_REQUEST_PARAMETERS = AXIOS_REQUEST_BODY_PARAMETERS.FETCH_PULL_REQUESTS_LIST;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should fetch pull requests list successfully from azure repository within selected range', async () => {
    const mockResponse = { data: AZURE_PULL_REQUESTS_RESPONSE, status: STATUS_CODE.OK };
    axios.get = jest.fn().mockResolvedValue(mockResponse);

    const response = await AzureDevopsApi.fetchPullRequestsList(START_DATE, END_DATE, PAGE, PAGE_SIZE);

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);
    expect(response).toEqual(mockResponse.data);
  });

  it('should throw AppError with 404 when when no pull requests found in azure repository', async () => {
    const mockResponse = { data: { count: 0, value: [] }, status: STATUS_CODE.OK };
    axios.get = jest.fn().mockResolvedValue(mockResponse);
    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchPullRequestsList(START_DATE, END_DATE, PAGE, PAGE_SIZE);

    await expect(response).rejects.toThrow(AppError);

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);
    expect(AppError.throwAppError).toHaveBeenCalledWith(AzureDevopsApi.dataNotFound, STATUS_CODE.NOT_FOUND);
  });

  it('should throw AppError with 404 when request to azure api fails due to 404', async () => {
    axios.get = jest.fn().mockRejectedValue({ response: { status: STATUS_CODE.NOT_FOUND } });

    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchPullRequestsList(START_DATE, END_DATE, PAGE, PAGE_SIZE);

    await expect(response).rejects.toThrow(AppError);

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);
    expect(AppError.throwAppError).toHaveBeenCalledWith(AzureDevopsApi.invalidRepositoryDetails, STATUS_CODE.NOT_FOUND);
  });

  it('should throw AppError with 401 when request to azure api fails due to 401', async () => {
    axios.get = jest.fn().mockRejectedValue({ response: { status: STATUS_CODE.UNAUTHORIZED_ACCESS } });
    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchPullRequestsList(START_DATE, END_DATE, PAGE, PAGE_SIZE);

    await expect(response).rejects.toThrow(AppError);

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);

    expect(AppError.throwAppError).toHaveBeenCalledWith(
      AzureDevopsApi.invalidAzureToken,
      STATUS_CODE.UNAUTHORIZED_ACCESS
    );
  });

  it('should throw AppError with 401 when request to azure api fails due to 203', async () => {
    axios.get = jest.fn().mockResolvedValue({ status: STATUS_CODE.NON_AUTHORITATIVE_INFORMATION });
    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchPullRequestsList(START_DATE, END_DATE, PAGE, PAGE_SIZE);

    await expect(response).rejects.toThrow(AppError);

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);

    expect(AppError.throwAppError).toHaveBeenCalledWith(
      AzureDevopsApi.invalidAzureToken,
      STATUS_CODE.UNAUTHORIZED_ACCESS
    );
  });
});
