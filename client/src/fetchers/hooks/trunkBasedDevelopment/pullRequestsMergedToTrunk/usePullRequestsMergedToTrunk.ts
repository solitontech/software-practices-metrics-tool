import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { QUERY_KEY, ApiEndPoint, ApiHelpers } from "src/fetchers/fetchers";

import { IFetchedTrunkBranchPullRequestsResponse } from "./pullRequestsMergedToTrunkTypes";

export async function fetchPullRequestsMergedToTrunk(url: URL, paginationCursor: number) {
  url.searchParams.set("paginationCursor", String(paginationCursor));

  const {
    data: { pullRequests, count },
  } = await axios.get<IFetchedTrunkBranchPullRequestsResponse>(url.href);

  return { data: pullRequests, count };
}

export const usePullRequestsMergedToTrunk = (startDate: Date, endDate: Date) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: [QUERY_KEY.TRUNK_BASED_PULL_REQUESTS, startDate, endDate],
    queryFn: async () => {
      const apiURL = ApiEndPoint.pullRequestsMergedToTrunkBranch(startDate, endDate);

      const { data: pullRequests, errorCount } = await ApiHelpers.continuedFetching(
        fetchPullRequestsMergedToTrunk,
        apiURL,
      );

      return { pullRequests, errorCount };
    },
  });

  return {
    isPending,
    isError,
    data: data ?? { pullRequests: [], errorCount: 0 },
    error,
  };
};

/* interface exports for consumers */
export type { IFetchedTrunkBranchPullRequest } from "./pullRequestsMergedToTrunkTypes";
