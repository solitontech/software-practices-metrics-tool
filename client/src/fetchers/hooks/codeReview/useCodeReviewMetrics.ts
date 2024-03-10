import { useContext } from "react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { IFetchedCodeReviewResponse } from "./types";
import { CodeReviewUtils } from "./utils";
import { ClientFilterContext } from "../../../context";
import { ApiEndPoint, ApiUtils } from "../../api";
import { QUERY_KEY } from "../../constants/queryKey.constant";

async function fetchCodeReviewMetrics(api: URL, paginationCursor: number) {
  api.searchParams.set("paginationCursor", paginationCursor.toString());

  const { data } = await axios.get<IFetchedCodeReviewResponse>(api.href);

  return {
    data: data.pullRequests,
    count: data.count,
    errorCount: data.errorCount,
    filteredCount: data.filteredCount,
  };
}

export const useCodeReviewMetrics = (startDate: Date, endDate: Date) => {
  const { filters } = useContext(ClientFilterContext);

  const { isPending, isError, data, error } = useQuery({
    queryKey: [QUERY_KEY.CODE_REVIEW, startDate, endDate],
    queryFn: async () => {
      const apiURL = ApiEndPoint.codeReviewMetrics(startDate, endDate);

      const { data: pullRequests, errorCount } = await ApiUtils.continuedFetching(fetchCodeReviewMetrics, apiURL);

      return { pullRequests, errorCount };
    },
  });

  const pullRequests = CodeReviewUtils.getFilteredPullRequests(data, filters);

  return {
    isPending,
    isError,
    data: pullRequests ?? { pullRequests: [], errorCount: 0 },
    error,
  };
};

/* interface exports */
export type { IFetchedCodeReviewPullRequest } from "./types";
