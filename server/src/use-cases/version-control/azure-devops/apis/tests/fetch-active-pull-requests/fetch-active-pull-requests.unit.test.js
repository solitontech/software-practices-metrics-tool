import axios from 'axios';
import { jest, describe, it, expect, afterEach } from '@jest/globals';

import { AzureDevopsApi } from '##/use-cases/version-control/azure-devops/apis/azure-devops.api.js';
import { AppError } from '##/utils/app-error.util.js';
import { ServerConfiguration } from '##/configs/server.config.js';

import { STATUS_CODE } from '##/constants/http-status-code.constant.js';
import { AZURE_PULL_REQUESTS_RESPONSE } from '../common-mock/azure-pull-request.mock.js';

const {
  organization: ORGANIZATION,
  projectName: PROJECT,
  repositoryId: REPOSITORY_ID,
  authToken: TOKEN,
} = ServerConfiguration.versionControl;

const PAGE = 1;
const PAGE_SIZE = 10;
const HEADER = ':' + TOKEN;
const BASE_URL = `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_apis/git/repositories/${REPOSITORY_ID}`;
const AXIOS_REQUEST_PARAMETERS = [
  `${BASE_URL}/pullRequests?searchCriteria.status=active&searchCriteria.targetRefName=refs%2Fheads%2Fmain&%24top=${PAGE_SIZE}&%24skip=${
    PAGE - 1 // this is shortcut to find the skip when page is 1, DO NOT CHANGE VALUE OF 'page', this will break
  }&api-version=7.1-preview.1`,
  {
    headers: {
      Authorization: `Basic ${btoa(HEADER)}`,
      'Content-Type': 'application/json',
    },
  },
];

jest.mock('axios');

describe('AzureDevopsApi~fetchActivePullRequests - return active pull requests in azure repository within the selected range', () => {
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
