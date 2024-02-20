import { useQuery } from "@tanstack/react-query";

import { CustomError } from "./queryInterface";
import { QUERY_KEY } from "./queryKeyConstants";
import { IClientFilters } from "../components/containers/ClientFilters/clientFiltersInterfaces";
import { fetchClientFilters } from "../fetchers/clientFiltersFetchers";

export const useClientFilters = () => {
  const { isLoading, data, error } = useQuery<IClientFilters, CustomError>({
    queryKey: [QUERY_KEY.CLIENT_FILTERS],
    queryFn: async () => {
      return await fetchClientFilters();
    },
  });

  return {
    isLoading,
    data: data ?? ({ tags: [], squads: [] } as IClientFilters),
    error,
  };
};
