import btoa from 'btoa';

import { ServerConfiguration } from '##/configs/server.config.js';

export const PAGE = 1; // DO NOT CHANGE VALUE, this will break test cases
export const PAGE_SIZE = 10;
export const START_DATE = '2022-01-01';
export const END_DATE = '2022-12-31';

const {
  organization: ORGANIZATION,
  projectName: PROJECT,
  repositoryId: REPOSITORY_ID,
  authToken: TOKEN,
} = ServerConfiguration.versionControl;

const HEADER = ':' + TOKEN;
export const BASE_URL = `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_apis/git/repositories/${REPOSITORY_ID}`;

const FETCH_ALL_BRANCHES_MAIN_URL = `refs?filter=heads&api-version=7.1-preview.1`;

const FETCH_ACTIVE_PULL_REQUESTS_MAIN_URL = `pullRequests?searchCriteria.status=active&searchCriteria.targetRefName=refs%2Fheads%2Fmain&%24top=${PAGE_SIZE}&%24skip=${
  PAGE - 1
}&api-version=7.1-preview.1`;

const FETCH_COMMITS_LIST_MAIN_URL = `commits?searchCriteria.itemVersion.version=main&searchCriteria.fromDate=${START_DATE}&searchCriteria.toDate=${END_DATE}&api-version=7.1-preview.1&%24top=${PAGE_SIZE}&%24skip=${
  PAGE - 1
}`;

const FETCH_PULL_REQUESTS_MAIN_URL = `pullRequests?searchCriteria.status=all&searchCriteria.targetRefName=refs%2Fheads%2Fmain&searchCriteria.queryTimeRangeType=created&searchCriteria.minTime=${START_DATE}&searchCriteria.maxTime=${END_DATE}&%24top=${PAGE_SIZE}&%24skip=${
  PAGE - 1
}&api-version=7.1-preview.1`;

const FETCH_PULL_REQUESTS_LIST_MAIN_URL = `pullRequests?searchCriteria.status=all&searchCriteria.targetRefName=refs%2Fheads%2Fmain&searchCriteria.queryTimeRangeType=created&searchCriteria.minTime=${START_DATE}&searchCriteria.maxTime=${END_DATE}&%24top=${PAGE_SIZE}&%24skip=${
  PAGE - 1
}&api-version=7.1-preview.1`;

const getAxiosBodyParameters = (mainUrl) => {
  return [
    `${BASE_URL}/${mainUrl}`,
    {
      headers: {
        Authorization: `Basic ${btoa(HEADER)}`,
        'Content-Type': 'application/json',
      },
    },
  ];
};

export const AXIOS_REQUEST_BODY_PARAMETERS = {
  FETCH_ALL_BRANCHES: getAxiosBodyParameters(FETCH_ALL_BRANCHES_MAIN_URL),
  FETCH_ACTIVE_PULL_REQUESTS: getAxiosBodyParameters(FETCH_ACTIVE_PULL_REQUESTS_MAIN_URL),
  FETCH_COMMITS_LIST: getAxiosBodyParameters(FETCH_COMMITS_LIST_MAIN_URL),
  FETCH_PULL_REQUESTS: getAxiosBodyParameters(FETCH_PULL_REQUESTS_MAIN_URL),
  FETCH_PULL_REQUESTS_LIST: getAxiosBodyParameters(FETCH_PULL_REQUESTS_LIST_MAIN_URL),
};
