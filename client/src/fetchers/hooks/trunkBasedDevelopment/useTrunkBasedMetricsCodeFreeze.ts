import { useQuery } from "@tanstack/react-query";

import { ICommitSuccessInfo } from "../../../components/containers/TrunkBasedMetricsContainers/TrunkBasedMetricsGraphs/interfaces";
import { QUERY_KEY } from "../../constants/queryKey.constant";
import { fetchCodeFreezeMetrics } from "../../queries/trunkBasedDevelopment/trunkBasedFetchers";
import { ICustomError } from "../types/types";

export const useTrunkBasedMetricsCodeFreeze = (startDate: Date, endDate: Date) => {
  const { isLoading, data, error } = useQuery<ICommitSuccessInfo, ICustomError>({
    queryKey: [QUERY_KEY.TRUNK_BASED_BRANCH_COMMITS, startDate, endDate],
    queryFn: async () => {
      return await fetchCodeFreezeMetrics(startDate, endDate);
    },
  });

  return {
    isLoading,
    data: data ?? ({ commitList: [] } as ICommitSuccessInfo),
    error,
  };
};
