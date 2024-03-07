import { useContext } from "react";

import { useQuery } from "@tanstack/react-query";

import { CustomError } from "./queryInterface";
import { QUERY_KEY } from "./queryKeyConstants";
import { IPullRequestSuccessInfo } from "../components/containers/CodeReviewMetricsContainers/CodeReviewMetricsTable/interfaces";
import { ClientFiltersContext } from "../contexts/clientFiltersContext/clientFiltersContext";
import { fetchPullRequests } from "../fetchers/codeReviewFetchers";
import { getClientFilteredPullRequests } from "../utils/clientFilters";

export const useCodeReviewMetrics = (startDate: Date, endDate: Date) => {
  const { filters } = useContext(ClientFiltersContext);
  const { isLoading, data, error } = useQuery<
    IPullRequestSuccessInfo,
    CustomError
  >({
    queryKey: [QUERY_KEY.CODE_REVIEW, startDate, endDate],
    queryFn: async () => {
      return await fetchPullRequests(startDate, endDate);
    },
  });

  const filteredPullRequests = getClientFilteredPullRequests(data, filters);

  return {
    isLoading,
    data:
      filteredPullRequests ??
      ({ pullRequestList: [], errorCount: 0 } as IPullRequestSuccessInfo),
    error,
  };
};
