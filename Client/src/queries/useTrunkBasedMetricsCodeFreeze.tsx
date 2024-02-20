import { useQuery } from "@tanstack/react-query";

import { CustomError } from "./queryInterface";
import { QUERY_KEY } from "./queryKeyConstants";
import { ICommitSuccessInfo } from "../components/containers/TrunkBasedMetricsContainers/TrunkBasedMetricsGraphs/interfaces";
import { fetchCodeFreezeMetrics } from "../fetchers/trunkBasedFetchers";

export const useTrunkBasedMetricsCodeFreeze = (
  startDate: Date,
  endDate: Date,
) => {
  const { isLoading, data, error } = useQuery<ICommitSuccessInfo, CustomError>({
    queryKey: [QUERY_KEY.TRUNK_BASED_CODE_FREEZE_PERIOD, startDate, endDate],
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
