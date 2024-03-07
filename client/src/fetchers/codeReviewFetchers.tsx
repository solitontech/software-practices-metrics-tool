import { PAGINATION_LIMIT } from "./fetchersConstants";
import {
  continueFetching,
  fetchDataForPullRequests,
  formatDate,
  getBaseURL,
} from "./fetchersUtils";
import {
  IPullRequestList,
  IPullRequestSuccessInfo,
} from "../components/containers/CodeReviewMetricsContainers/CodeReviewMetricsTable/interfaces";

const baseURL = getBaseURL();
const codeReviewMetricsAPI = `${baseURL}/api/v1/metrics/code-review`;

export const fetchPullRequests = async (
  startDate: Date,
  endDate: Date,
): Promise<IPullRequestSuccessInfo> => {
  const formattedStartDate: string = formatDate(startDate);
  const formattedEndDate: string = formatDate(endDate);

  const api = new URL(`${codeReviewMetricsAPI}`);

  api.searchParams.append("startDate", formattedStartDate);
  api.searchParams.append("endDate", formattedEndDate);
  api.searchParams.append("paginationCursor", "1");
  api.searchParams.append("paginationSize", `${PAGINATION_LIMIT}`);

  const { list, errorCount } = await continueFetching(
    fetchDataForPullRequests,
    api,
  );
  const pullRequestList: IPullRequestList[] = list;

  return { pullRequestList, errorCount };
};
