import { useContext } from "react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { IFetchedCodeReviewResponse } from "./types";
import { CodeReviewMetricsUtil } from "./utils";
import { ClientFilterContext } from "../../../context";
import { ApiEndPoint, ApiUtils } from "../../api";
import { QUERY_KEY } from "../../setup/queryKey";

async function fetchCodeReviewMetrics(url: URL, paginationCursor: number) {
  url.searchParams.set("paginationCursor", String(paginationCursor));

  const {
    data: { pullRequests, count, errorCount, filteredCount },
  } = await axios.get<IFetchedCodeReviewResponse>(url.href);

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

      const { data: pullRequests, errorCount } = await ApiUtils.continuedFetching(fetchCodeReviewMetrics, apiURL);

      return { pullRequests, errorCount };
    },
  });

  const pullRequests = CodeReviewMetricsUtil.getFilteredPullRequests(data, filters);

  return {
    isPending,
    isError,
    data: pullRequests ?? { pullRequests: [], errorCount: 0 },
    error,
  };
};

/* interface exports */
export type { IFetchedCodeReviewPullRequest } from "./types";
