import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { IFetchedTrunkBranchPullRequestsResponse } from "./types";
import { ApiEndPoint, ApiUtil } from "../../api";
import { QUERY_KEY } from "../../setup/queryKey";

export async function fetchPullRequestsMergedToTrunkBranch(url: URL, paginationCursor: number) {
  url.searchParams.set("paginationCursor", String(paginationCursor));

  const {
    data: { pullRequests, count },
  } = await axios.get<IFetchedTrunkBranchPullRequestsResponse>(url.href);

  return { data: pullRequests, count };
}

export const useTrunkMergedPullRequests = (startDate: Date, endDate: Date) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: [QUERY_KEY.TRUNK_BASED_PULL_REQUESTS, startDate, endDate],
    queryFn: async () => {
      const apiURL = ApiEndPoint.pullRequestsMergedToTrunkBranch(startDate, endDate);

      const { data: pullRequests, errorCount } = await ApiUtil.continuedFetching(
        fetchPullRequestsMergedToTrunkBranch,
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
