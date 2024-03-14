import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { ApiEndPoint, QUERY_KEY } from "src/fetchers";

import { IFetchedTrunkBranchesResponse } from "./types";

export const useTrunkBasedMetricsTotalBranches = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: [QUERY_KEY.TRUNK_BASED_TOTAL_BRANCHES],
    queryFn: async () => {
      const apiURL = ApiEndPoint.trunkBasedTotalBranches();

      const { data } = await axios.get<IFetchedTrunkBranchesResponse>(apiURL.href);

      return data;
    },
  });

  return {
    isPending,
    isError,
    data: data ?? {
      branchesURL: "",
      totalNumberOfBranches: 0,
      percentageOfBranchesFollowingStandard: "",
      branchesFollowingNamingStandard: { count: 0, branches: [] },
      branchesNotFollowingNamingStandard: {
        count: 0,
        branches: [],
      },
    },
    error,
  };
};

/* export interfaces for consumer */
export type { IFetchedTrunkBranchesResponse, IFetchedTrunkMetricsBranches } from "./types";
