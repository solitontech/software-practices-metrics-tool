import { useContext } from "react";

import { useQuery } from "@tanstack/react-query";

import { IPullRequestSuccessInfo } from "../../../components/containers/CodeReviewMetricsContainers/CodeReviewMetricsTable/interfaces";
import { ClientFiltersContext } from "../../../contexts/clientFiltersContext/clientFiltersContext";
import { getClientFilteredPullRequests } from "../../../utils/clientFilters";
import { QUERY_KEY } from "../../constants/queryKey.constant";
import { fetchPullRequests } from "../../queries/codeReview/codeReviewFetchers";
import { ICustomError } from "../types/types";

export const useCodeReviewMetrics = (startDate: Date, endDate: Date) => {
  const { filters } = useContext(ClientFiltersContext);
  const { isLoading, data, error } = useQuery<IPullRequestSuccessInfo, ICustomError>({
    queryKey: [QUERY_KEY.CODE_REVIEW, startDate, endDate],
    queryFn: async () => {
      return await fetchPullRequests(startDate, endDate);
    },
  });

  const filteredPullRequests = getClientFilteredPullRequests(data, filters);

  return {
    isLoading,
    data: filteredPullRequests ?? ({ pullRequestList: [], errorCount: 0 } as IPullRequestSuccessInfo),
    error,
  };
};
