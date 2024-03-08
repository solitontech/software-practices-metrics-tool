import { useQuery } from "@tanstack/react-query";

import { ITotalBranches } from "../../../components/containers/TrunkBasedMetricsContainers/TrunkBasedMetricsTiles/interfaces";
import { QUERY_KEY } from "../../constants/queryKey.constant";
import { fetchTotalBranches } from "../../queries/trunkBasedDevelopment/trunkBasedFetchers";
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
