import { useQuery } from "@tanstack/react-query";

import { IActiveBranchSuccessInfo } from "../../../components/containers/TrunkBasedMetricsContainers/TrunkBasedMetricsTiles/interfaces";
import { QUERY_KEY } from "../../constants/queryKey.constant";
import { fetchActiveBranches } from "../../queries/trunkBasedDevelopment/trunkBasedFetchers";
import { ICustomError } from "../types/types";

export const useTrunkBasedMetricsActiveBranches = () => {
  const { isLoading, data, error } = useQuery<IActiveBranchSuccessInfo, ICustomError>({
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
