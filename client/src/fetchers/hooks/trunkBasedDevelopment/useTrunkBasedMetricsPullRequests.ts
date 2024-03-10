import { useQuery } from "@tanstack/react-query";

import { IPullRequestsMergedToMainSuccessInfo } from "../../../components/containers/TrunkBasedMetricsContainers/TrunkBasedPullRequestsTable/interfaces";
import { fetchPullRequestsMergedToMain } from "../../queries/trunkBasedDevelopment/trunkBasedFetchers";
import { QUERY_KEY } from "../../setup/queryKey";
import { ICustomError } from "../types/types";

export const useTrunkBasedMetricsPullRequests = (startDate: Date, endDate: Date) => {
  const { isLoading, data, error } = useQuery<IPullRequestsMergedToMainSuccessInfo, ICustomError>({
    queryKey: [QUERY_KEY.TRUNK_BASED_PULL_REQUESTS, startDate, endDate],
    queryFn: async () => {
      return await fetchPullRequestsMergedToMain(startDate, endDate);
    },
  });
  return {
    isLoading,
    data: data ?? ({ pullRequestsMergedList: [] } as IPullRequestsMergedToMainSuccessInfo),
    error,
  };
};
