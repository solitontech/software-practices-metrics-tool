import { useQuery } from "@tanstack/react-query";

import { CustomError } from "./queryInterface";
import { QUERY_KEY } from "./queryKeyConstants";
import { IActiveBranchSuccessInfo } from "../components/containers/TrunkBasedMetricsContainers/TrunkBasedMetricsTiles/interfaces";
import { fetchActiveBranches } from "../fetchers/trunkBasedFetchers";

export const useTrunkBasedMetricsActiveBranches = () => {
  const { isLoading, data, error } = useQuery<
    IActiveBranchSuccessInfo,
    CustomError
  >({
    queryKey: [QUERY_KEY.TRUNK_BASED_ACTIVE_BRANCHES],
    queryFn: async () => {
      return await fetchActiveBranches();
    },
  });

  return {
    isLoading,
    data: data ?? ({ activeBranchesList: [] } as IActiveBranchSuccessInfo),
    error,
  };
};
