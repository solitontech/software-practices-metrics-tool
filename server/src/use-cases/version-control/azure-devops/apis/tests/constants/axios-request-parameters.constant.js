import { getAxiosBodyParameters } from '../utils/index.js';

import { PAGE, PAGE_SIZE, START_DATE, END_DATE } from '../constants/index.js';

import { ServerConfiguration } from '##/configs/server.config.js';

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
  PAGE - 1 // this is shortcut to find the skip when page is 1, DO NOT CHANGE VALUE OF 'page', this will break
}&api-version=7.1-preview.1`;

const FETCH_COMMITS_LIST_MAIN_URL = `commits?searchCriteria.itemVersion.version=main&searchCriteria.fromDate=${START_DATE}&searchCriteria.toDate=${END_DATE}&api-version=7.1-preview.1&%24top=${PAGE_SIZE}&%24skip=${
  PAGE - 1 // this is shortcut to find the skip when page is 1, DO NOT CHANGE VALUE OF 'page', this will break
}`;

const FETCH_PULL_REQUESTS_MAIN_URL = `pullRequests?searchCriteria.status=all&searchCriteria.targetRefName=refs%2Fheads%2Fmain&searchCriteria.queryTimeRangeType=created&searchCriteria.minTime=${START_DATE}&searchCriteria.maxTime=${END_DATE}&%24top=${PAGE_SIZE}&%24skip=${
  PAGE - 1 // this is shortcut to find the skip when page is 1, DO NOT CHANGE VALUE OF 'page', this will break
}&api-version=7.1-preview.1`;

const FETCH_PULL_REQUESTS_LIST_MAIN_URL = `pullRequests?searchCriteria.status=all&searchCriteria.targetRefName=refs%2Fheads%2Fmain&searchCriteria.queryTimeRangeType=created&searchCriteria.minTime=${START_DATE}&searchCriteria.maxTime=${END_DATE}&%24top=${PAGE_SIZE}&%24skip=${
  PAGE - 1 // this is shortcut to find the skip when page is 1, DO NOT CHANGE VALUE OF 'page', this will break
}&api-version=7.1-preview.1`;

export const AXIOS_REQUEST_BODY_PARAMETERS = {
  FETCH_ALL_BRANCHES: getAxiosBodyParameters(HEADER, BASE_URL, FETCH_ALL_BRANCHES_MAIN_URL),
  FETCH_ACTIVE_PULL_REQUESTS: getAxiosBodyParameters(HEADER, BASE_URL, FETCH_ACTIVE_PULL_REQUESTS_MAIN_URL),
  FETCH_COMMITS_LIST: getAxiosBodyParameters(HEADER, BASE_URL, FETCH_COMMITS_LIST_MAIN_URL),
  FETCH_PULL_REQUESTS: getAxiosBodyParameters(HEADER, BASE_URL, FETCH_PULL_REQUESTS_MAIN_URL),
  FETCH_PULL_REQUESTS_LIST: getAxiosBodyParameters(HEADER, BASE_URL, FETCH_PULL_REQUESTS_LIST_MAIN_URL),
};
