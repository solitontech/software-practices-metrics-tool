import { useQuery } from "@tanstack/react-query";

import { CustomError } from "./queryInterface";
import { QUERY_KEY } from "./queryKeyConstants";
import { ITotalBranches } from "../components/containers/TrunkBasedMetricsContainers/TrunkBasedMetricsTiles/interfaces";
import { fetchTotalBranches } from "../fetchers/trunkBasedFetchers";

export const useTrunkBasedMetricsTotalBranches = () => {
  const { isLoading, data, error } = useQuery<ITotalBranches, CustomError>({
    queryKey: [QUERY_KEY.TRUNK_BASED_TOTAL_BRANCHES],
    queryFn: async () => {
      return await fetchTotalBranches();
    },
  });

  return { isLoading, data: data, error };
};
