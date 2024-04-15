import { useContext } from "react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { ClientFilterContext } from "src/context/context";
import { QUERY_KEY, ApiEndPoint, ApiHelpers } from "src/services/api/api";

import { IFetchedRawCodeReviewResponse } from "./codeReviewTypes";
import { CodeReviewMetricsUtils } from "./codeReviewUtils";

async function fetchCodeReviewMetrics(url: URL, paginationCursor: number) {
  url.searchParams.set("paginationCursor", String(paginationCursor));

  const {
    data: { pullRequests, count, errorCount, filteredCount },
  } = await axios.get<IFetchedRawCodeReviewResponse>(url.href);

  return {
    data: pullRequests,
    count,
    errorCount,
    filteredCount,
  };
}

export const useCodeReviewMetrics = (startDate: Date, endDate: Date) => {
  const { filters } = useContext(ClientFilterContext);

  const { isPending, isError, data, error } = useQuery({
    queryKey: [QUERY_KEY.CODE_REVIEW, startDate, endDate],
    queryFn: async () => {
      const apiURL = ApiEndPoint.codeReviewMetrics(startDate, endDate);

      const { data: pullRequests, errorCount } = await ApiHelpers.continuedFetching(fetchCodeReviewMetrics, apiURL);

      return { pullRequests, errorCount };
    },
  });

  const pullRequests = CodeReviewMetricsUtils.getFilteredPullRequests(data, filters);

  const filteredPullRequests = CodeReviewMetricsUtils.getFilteredPullRequestsByReviewers(pullRequests, filters);

  return {
    isPending,
    isError,
    data: filteredPullRequests ?? { pullRequests: [], errorCount: 0 },
    error,
  };
};

/* interface exports for consumers */
export type {
  IFetchedCodeReviewPullRequest,
  IFetchedPullRequestVotesTimeline,
  IFetchedPullRequestVotes,
  IFetchedPullRequestReviewerComments,
  IFetchedPullRequestComments,
} from "./codeReviewTypes";
