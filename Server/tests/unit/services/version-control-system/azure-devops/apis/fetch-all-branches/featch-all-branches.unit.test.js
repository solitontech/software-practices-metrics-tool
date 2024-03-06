import axios from 'axios';
import btoa from 'btoa';

import { jest, describe, it, expect, afterEach } from '@jest/globals';
import { ALL_BRANCHES_AZURE_RESPONSE } from './fetch-all-branches.mock.js';
import { AzureDevopsApi } from '../../../../../../../src/services/version-control/azure-devops/apis/azure-devops.api.js';
import { AppError } from '../../../../../../../src/utils/app-error.js';
import { ServerConfiguration } from '../../../../../../../src/configs/server.config.js';

jest.mock('axios');

const {
  organization: ORGANIZATION,
  projectName: PROJECT,
  repositoryId: REPOSITORY_ID,
  authToken: TOKEN,
} = ServerConfiguration.versionControl;
const HEADER = ':' + TOKEN;

describe('AzureDevopsApi~fetchAllBranches - returns all branches for repository', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should fetch all branches successfully when data is present', async () => {
    const mockResponse = { data: ALL_BRANCHES_AZURE_RESPONSE, status: 200 };
    axios.get = jest.fn().mockResolvedValue(mockResponse);

    const response = await AzureDevopsApi.fetchAllBranches();

    expect(response).toEqual(ALL_BRANCHES_AZURE_RESPONSE);
    expect(axios.get).toHaveBeenCalledWith(
      `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_apis/git/repositories/${REPOSITORY_ID}/refs?filter=heads&api-version=7.1-preview.1`,
      {
        headers: {
          Authorization: `Basic ${btoa(HEADER)}`,
          'Content-Type': 'application/json',
        },
      }
    );
  });

  it('should throw AppError with status 404 when no branches are found', async () => {
    const mockResponse = { data: { value: [], count: 0 }, status: 200 };
    axios.get = jest.fn().mockResolvedValue(mockResponse);
    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchAllBranches();

    await expect(response).rejects.toThrow(AppError);
    expect(AppError.throwAppError).toHaveBeenCalledWith(AzureDevopsApi.dataNotFound, 404);
    expect(axios.get).toHaveBeenCalledWith(
      `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_apis/git/repositories/${REPOSITORY_ID}/refs?filter=heads&api-version=7.1-preview.1`,
      {
        headers: {
          Authorization: `Basic ${btoa(HEADER)}`,
          'Content-Type': 'application/json',
        },
      }
    );
  });

  it('should throw AppError with status 404 when request fails due to 404', async () => {
    axios.get = jest.fn().mockRejectedValue({ response: { status: 404 } });
    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchAllBranches();
    await expect(response).rejects.toThrow(AppError);
    expect(AppError.throwAppError).toHaveBeenCalledWith(AzureDevopsApi.invalidRepositoryDetails, 404);
    expect(axios.get).toHaveBeenCalledWith(
      `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_apis/git/repositories/${REPOSITORY_ID}/refs?filter=heads&api-version=7.1-preview.1`,
      {
        headers: {
          Authorization: `Basic ${btoa(HEADER)}`,
          'Content-Type': 'application/json',
        },
      }
    );
  });

  it('should throw AppError with status 401 when request fails due to 401', async () => {
    axios.get = jest.fn().mockRejectedValue({ response: { status: 401 } });
    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchAllBranches();
    await expect(response).rejects.toThrow(AppError);
    expect(AppError.throwAppError).toHaveBeenCalledWith(AzureDevopsApi.invalidAzureToken, 401);
    expect(axios.get).toHaveBeenCalledWith(
      `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_apis/git/repositories/${REPOSITORY_ID}/refs?filter=heads&api-version=7.1-preview.1`,
      {
        headers: {
          Authorization: `Basic ${btoa(HEADER)}`,
          'Content-Type': 'application/json',
        },
      }
    );
  });

  it('should throw AppError with status 401 when request fails due to 203', async () => {
    axios.get = jest.fn().mockResolvedValue({ data: { count: 0, value: [] }, status: 203 });
    jest.spyOn(AppError, 'throwAppError');

    const response = AzureDevopsApi.fetchAllBranches();
    await expect(response).rejects.toThrow(AppError);
    expect(AppError.throwAppError).toHaveBeenCalledWith(AzureDevopsApi.invalidAzureToken, 401);
    expect(axios.get).toHaveBeenCalledWith(
      `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_apis/git/repositories/${REPOSITORY_ID}/refs?filter=heads&api-version=7.1-preview.1`,
      {
        headers: {
          Authorization: `Basic ${btoa(HEADER)}`,
          'Content-Type': 'application/json',
        },
      }
    );
  });
});
