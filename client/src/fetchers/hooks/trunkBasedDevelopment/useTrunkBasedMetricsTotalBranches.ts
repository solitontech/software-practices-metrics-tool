import { useQuery } from "@tanstack/react-query";

import { ITotalBranches } from "../../../components/containers/TrunkBasedMetricsContainers/TrunkBasedMetricsTiles/interfaces";
import { fetchTotalBranches } from "../../queries/trunkBasedDevelopment/trunkBasedFetchers";
import { QUERY_KEY } from "../../setup/queryKey";
import { ICustomError } from "../types/types";

export const useTrunkBasedMetricsTotalBranches = () => {
  const { isLoading, data, error } = useQuery<ITotalBranches, ICustomError>({
    queryKey: [QUERY_KEY.TRUNK_BASED_TOTAL_BRANCHES],
    queryFn: async () => {
      return await fetchTotalBranches();
    },
  });

  return { isLoading, data: data, error };
};
