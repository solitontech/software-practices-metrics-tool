import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { IFetchedTrunkBranchCommitsResponse } from "./types";
import { ApiEndPoint, ApiHelpers } from "../../../api";
import { QUERY_KEY } from "../../../setup/queryKey";

export async function fetchTrunkBranchCommits(url: URL, paginationCursor: number) {
  url.searchParams.set("paginationCursor", String(paginationCursor));

  const {
    data: { commits, count },
  } = await axios.get<IFetchedTrunkBranchCommitsResponse>(url.href);

  return { data: commits, count };
}

export const useTrunkBranchCommits = (startDate: Date, endDate: Date) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: [QUERY_KEY.TRUNK_BASED_BRANCH_COMMITS, startDate, endDate],
    queryFn: async () => {
      const apiURL = ApiEndPoint.trunkBranchCommits(startDate, endDate);

      const { data: commits, errorCount } = await ApiHelpers.continuedFetching(fetchTrunkBranchCommits, apiURL);

      return { commits, errorCount };
    },
  });

  return {
    isPending,
    isError,
    data: data ?? { commits: [], errorCount: 0 },
    error,
  };
};
