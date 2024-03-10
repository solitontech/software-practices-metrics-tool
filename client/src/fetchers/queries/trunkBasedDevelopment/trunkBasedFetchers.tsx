import axios from "axios";

import {
  ICommit,
  ICommitSuccessInfo,
} from "../../../components/containers/TrunkBasedMetricsContainers/TrunkBasedMetricsGraphs/interfaces";
import {
  ITotalBranches,
  IActiveBranchSuccessInfo,
  IActiveBranch,
} from "../../../components/containers/TrunkBasedMetricsContainers/TrunkBasedMetricsTiles/interfaces";
import {
  IPullRequestsMergedToMain,
  IPullRequestsMergedToMainSuccessInfo,
} from "../../../components/containers/TrunkBasedMetricsContainers/TrunkBasedPullRequestsTable/interfaces";
import {
  continueFetching,
  fetchDataForCommits,
  fetchDataForActiveBranches,
  formatDate,
  fetchDataForPullRequestsMergedToMain,
  trunkBasedMetricsAPI,
} from "../../fetchersUtils";

const PAGINATION_LIMIT = 300;

export const fetchTotalBranches = async (): Promise<ITotalBranches> => {
  const api = new URL(`${trunkBasedMetricsAPI}/branches`);

  const { data } = await axios.get<ITotalBranches>(api.href);

  return data;
};

export const fetchCodeFreezeMetrics = async (startDate: Date, endDate: Date): Promise<ICommitSuccessInfo> => {
  const formattedStartDate: string = formatDate(startDate);
  const formattedEndDate: string = formatDate(endDate);

  const api = new URL(`${trunkBasedMetricsAPI}/commits`);

  api.searchParams.append("startDate", formattedStartDate);
  api.searchParams.append("endDate", formattedEndDate);
  api.searchParams.append("paginationCursor", "1");
  api.searchParams.append("paginationSize", `${PAGINATION_LIMIT}`);

  const { list, errorCount } = await continueFetching(fetchDataForCommits, api);

  const commitList: ICommit[] = list;

  return { commitList, errorCount };
};

export const fetchActiveBranches = async (): Promise<IActiveBranchSuccessInfo> => {
  const api = new URL(`${trunkBasedMetricsAPI}/activeBranches`);

  api.searchParams.append("paginationCursor", "1");
  api.searchParams.append("paginationSize", `${PAGINATION_LIMIT}`);

  const { list, errorCount } = await continueFetching(fetchDataForActiveBranches, api);

  const activeBranchesList: IActiveBranch[] = list;

  return { activeBranchesList, errorCount };
};

export const fetchPullRequestsMergedToMain = async (
  startDate: Date,
  endDate: Date,
): Promise<IPullRequestsMergedToMainSuccessInfo> => {
  const formattedStartDate: string = formatDate(startDate);
  const formattedEndDate: string = formatDate(endDate);

  const api = new URL(`${trunkBasedMetricsAPI}/pullRequests`);

  api.searchParams.append("startDate", formattedStartDate);
  api.searchParams.append("endDate", formattedEndDate);
  api.searchParams.append("paginationCursor", "1");
  api.searchParams.append("paginationSize", `${PAGINATION_LIMIT}`);

  const { list, errorCount } = await continueFetching(fetchDataForPullRequestsMergedToMain, api);

  const pullRequestsMergedList: IPullRequestsMergedToMain[] = list;

  return { pullRequestsMergedList, errorCount };
};
