import { useQuery } from "@tanstack/react-query";

import { IClientFilters } from "../../../components/containers/ClientFilters/clientFiltersInterfaces";
import { QUERY_KEY } from "../../constants/queryKey.constant";
import { fetchClientFilters } from "../../queries/clientFilters/clientFiltersFetchers";
import { ICustomError } from "../types/types";

export const useClientFilters = () => {
  const { isLoading, data, error } = useQuery<IClientFilters, ICustomError>({
    queryKey: [QUERY_KEY.CLIENT_FILTERS],
    queryFn: fetchClientFilters,
  });

  return {
    isLoading,
    data: data ?? ({ tags: [], squads: [] } as IClientFilters),
    error,
  };
};
