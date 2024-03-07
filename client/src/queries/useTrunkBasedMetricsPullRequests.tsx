import { useQuery } from "@tanstack/react-query";

import { CustomError } from "./queryInterface";
import { QUERY_KEY } from "./queryKeyConstants";
import { IPullRequestsMergedToMainSuccessInfo } from "../components/containers/TrunkBasedMetricsContainers/TrunkBasedPullRequestsTable/interfaces";
import { fetchPullRequestsMergedToMain } from "../fetchers/trunkBasedFetchers";

export const useTrunkBasedMetricsPullRequests = (
  startDate: Date,
  endDate: Date,
) => {
  const { isLoading, data, error } = useQuery<
    IPullRequestsMergedToMainSuccessInfo,
    CustomError
  >({
    queryKey: [QUERY_KEY.TRUNK_BASED_PULL_REQUESTS, startDate, endDate],
    queryFn: async () => {
      return await fetchPullRequestsMergedToMain(startDate, endDate);
    },
  });
  return {
    isLoading,
    data:
      data ??
      ({ pullRequestsMergedList: [] } as IPullRequestsMergedToMainSuccessInfo),
    error,
  };
};
