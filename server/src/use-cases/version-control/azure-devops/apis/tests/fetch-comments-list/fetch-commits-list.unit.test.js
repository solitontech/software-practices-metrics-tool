import axios from 'axios';
import { jest, describe, it, expect, afterEach } from '@jest/globals';

import { AzureDevopsApi } from '##/use-cases/version-control/azure-devops/apis/azure-devops.api.js';
import { AppError } from '##/utils/app-error.util.js';
import { ServerConfiguration } from '##/configs/server.config.js';

import { STATUS_CODE } from '##/constants/index.js';
import { AZURE_TRUNK_BRANCH_COMMITS_RESPONSE } from './fetch-commits-list.mock.js';

const {
  organization: ORGANIZATION,
  projectName: PROJECT,
  repositoryId: REPOSITORY_ID,
  authToken: TOKEN,
} = ServerConfiguration.versionControl;

const START_DATE = '2022-01-01';
const END_DATE = '2022-12-31';
const PAGE = 1;
const PAGE_SIZE = 10;
const HEADER = ':' + TOKEN;
const AXIOS_REQUEST_PARAMETERS = [
  `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_apis/git/repositories/${REPOSITORY_ID}/commits?searchCriteria.itemVersion.version=main&searchCriteria.fromDate=${START_DATE}&searchCriteria.toDate=${END_DATE}&api-version=7.1-preview.1&%24top=${PAGE_SIZE}&%24skip=${
    PAGE - 1
  }`,
  {
    headers: {
      Authorization: `Basic ${btoa(HEADER)}`,
      'Content-Type': 'application/json',
    },
  },
];

jest.mock('axios');

describe('AzureDevopsApi~fetchCommitsList - return all commits from the trunk branch in the given range.', () => {
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
