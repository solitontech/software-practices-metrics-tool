import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { ApiEndPoint, QUERY_KEY } from "src/fetchers/fetchers";

import { IFetchedClientFilterResponse } from "./clientFiltersTypes";
import { ClientFiltersUtils } from "./clientFiltersUtils";

export const useClientFilters = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: [QUERY_KEY.CLIENT_FILTERS],
    queryFn: async () => {
      const apiURL = ApiEndPoint.clientFilters();

      const { data } = await axios.get<IFetchedClientFilterResponse>(apiURL.href);

      return ClientFiltersUtils.getFilters(data);
    },
  });

  return {
    isPending,
    isError,
    data,
    error,
  };
};

/* interface exports for consumers */
export type { IFetchedClientFilterSquadMember } from "./clientFiltersTypes";
