import axios from 'axios';
import btoa from 'btoa';
import { jest, describe, it, expect, afterEach } from '@jest/globals';

import { AzureDevopsApi } from '../../../../../../../src/services/version-control/azure-devops/apis/azure-devops.api.js';
import { AppError } from '../../../../../../../src/utils/app-error.js';
import { ServerConfiguration } from '../../../../../../../src/configs/server.config.js';

import { ALL_BRANCHES_AZURE_RESPONSE } from './fetch-all-branches.mock.js';
import { STATUS_CODE } from '../../../../../../../src/constants/http-status-code.constant.js';

jest.mock('axios');

const {
  organization: ORGANIZATION,
  projectName: PROJECT,
  repositoryId: REPOSITORY_ID,
  authToken: TOKEN,
} = ServerConfiguration.versionControl;

const HEADER = ':' + TOKEN;

const AXIOS_REQUEST_PARAMETERS = [
  `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_apis/git/repositories/${REPOSITORY_ID}/refs?filter=heads&api-version=7.1-preview.1`,
  {
    headers: {
      Authorization: `Basic ${btoa(HEADER)}`,
      'Content-Type': 'application/json',
    },
  },
];

describe('AzureDevopsApi~fetchAllBranches - returns all branches for repository', () => {
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

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);
    await expect(response).rejects.toThrow(AppError);
    expect(AppError.throwAppError).toHaveBeenCalledWith(AzureDevopsApi.dataNotFound, STATUS_CODE.NOT_FOUND);
  });

  it('should throw AppError with status 404 when request to azure api fails due to 404', async () => {
    axios.get = jest.fn().mockRejectedValue({ response: { status: STATUS_CODE.NOT_FOUND } });
    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchAllBranches();

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);
    await expect(response).rejects.toThrow(AppError);
    expect(AppError.throwAppError).toHaveBeenCalledWith(AzureDevopsApi.invalidRepositoryDetails, STATUS_CODE.NOT_FOUND);
  });

  it('should throw AppError with status 401 when request to azure fails due to 401', async () => {
    axios.get = jest.fn().mockRejectedValue({ response: { status: STATUS_CODE.UNAUTHORIZED_ACCESS } });
    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchAllBranches();

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);
    await expect(response).rejects.toThrow(AppError);
    expect(AppError.throwAppError).toHaveBeenCalledWith(
      AzureDevopsApi.invalidAzureToken,
      STATUS_CODE.UNAUTHORIZED_ACCESS
    );
  });

  it('should throw AppError with status 401 when request to azure fails due to 203', async () => {
    axios.get = jest.fn().mockResolvedValue({ status: STATUS_CODE.NON_AUTHORITATIVE_INFORMATION });
    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchAllBranches();

    expect(axios.get).toHaveBeenCalledWith(...AXIOS_REQUEST_PARAMETERS);
    await expect(response).rejects.toThrow(AppError);
    expect(AppError.throwAppError).toHaveBeenCalledWith(
      AzureDevopsApi.invalidAzureToken,
      STATUS_CODE.UNAUTHORIZED_ACCESS
    );
  });
});
