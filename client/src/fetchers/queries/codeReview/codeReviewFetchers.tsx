import {
  IPullRequestList,
  IPullRequestSuccessInfo,
} from "../../../components/containers/CodeReviewMetricsContainers/CodeReviewMetricsTable/interfaces";
import { PAGINATION_LIMIT } from "../../constants/query.constant";
import { continueFetching, fetchDataForPullRequests, formatDate, getBaseURL } from "../../fetchersUtils";

const baseURL = getBaseURL();
const codeReviewMetricsAPI = `${baseURL}/api/v1/metrics/code-review`;

export const fetchPullRequests = async (startDate: Date, endDate: Date): Promise<IPullRequestSuccessInfo> => {
  const formattedStartDate: string = formatDate(startDate);
  const formattedEndDate: string = formatDate(endDate);

  const api = new URL(`${codeReviewMetricsAPI}`);

  api.searchParams.append("startDate", formattedStartDate);
  api.searchParams.append("endDate", formattedEndDate);
  api.searchParams.append("paginationCursor", "1");
  api.searchParams.append("paginationSize", `${PAGINATION_LIMIT}`);

  const { list, errorCount } = await continueFetching(fetchDataForPullRequests, api);
  const pullRequestList: IPullRequestList[] = list;

  return { pullRequestList, errorCount };
};
