import { useContext } from "react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { IApiCodeReviewResponse, IFetchersCodeReviewPullRequest } from "./types";
import { CodeReviewUtils } from "./utils";
import { ClientFilterContext } from "../../../context";
import { ApiEndPoint, ApiUtils } from "../../api";
import { QUERY_KEY } from "../../constants/queryKey.constant";
import { ICustomError } from "../types/types";

interface IApiCollectedData<T> {
  data: T[];
  count: number;
  errorCount?: number;
  filteredCount?: number;
}

async function fetchCodeReviewMetrics(
  api: URL,
  paginationCursor: number,
): Promise<IApiCollectedData<IFetchersCodeReviewPullRequest>> {
  api.searchParams.set("paginationCursor", paginationCursor.toString());

  const { data } = await axios.get<IApiCodeReviewResponse>(api.href);

  return {
    data: data.pullRequests,
    count: data.count,
    errorCount: data.errorCount,
    filteredCount: data.filteredCount,
  };
}

interface Result {
  pullRequests: IFetchersCodeReviewPullRequest[];
  errorCount: number;
}

export const useCodeReviewMetrics = (startDate: Date, endDate: Date) => {
  const { filters } = useContext(ClientFilterContext);

  const { isPending, isError, data, error } = useQuery<Result, ICustomError>({
    queryKey: [QUERY_KEY.CODE_REVIEW, startDate, endDate],
    queryFn: async () => {
      const apiURL = ApiEndPoint.codeReviewMetrics(startDate, endDate);

      const { data: pullRequests, errorCount } = await ApiUtils.continuedFetching(fetchCodeReviewMetrics, apiURL);

      return { pullRequests, errorCount };
    },
  });

  console.log("DEBUG: TEST", filters, data);

  const filteredPullRequests = CodeReviewUtils.getClientFilteredPullRequests(data, filters);

  return {
    isPending,
    isError,
    data: filteredPullRequests ? filteredPullRequests : { pullRequests: [], errorCount: 0 },
    error,
  };
};

/* interface exports */
export type { IFetchersCodeReviewPullRequest } from "./types";
