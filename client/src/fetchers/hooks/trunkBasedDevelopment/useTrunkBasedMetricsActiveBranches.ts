import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { IFetchedTrunkBasedActiveBranchesResponse } from "./types";
import { ApiEndPoint, ApiUtil } from "../../api";
import { QUERY_KEY } from "../../setup/queryKey";

export async function fetchActiveBranches(url: URL, paginationCursor: number) {
  url.searchParams.set("paginationCursor", String(paginationCursor));

  const {
    data: { branches, count },
  } = await axios.get<IFetchedTrunkBasedActiveBranchesResponse>(url.href);

  return { data: branches, count };
}

export const useTrunkBasedMetricsActiveBranches = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: [QUERY_KEY.TRUNK_BASED_ACTIVE_BRANCHES],
    queryFn: async () => {
      const apiURL = ApiEndPoint.trunkBasedActiveBranches();

      const { data: activeBranches, errorCount } = await ApiUtil.continuedFetching(fetchActiveBranches, apiURL);

      return { activeBranches, errorCount };
    },
  });

  return {
    isPending,
    isError,
    data: data ?? { activeBranches: [], errorCount: 0 },
    error,
  };
};
