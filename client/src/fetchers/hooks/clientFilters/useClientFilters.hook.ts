import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { ApiEndPoint, QUERY_KEY } from "src/fetchers";

import { ClientFiltersUtils } from "./clientFiltersUtils";
import { IFetchedClientFilterResponse } from "./types";

export const useClientFilters = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: [QUERY_KEY.CLIENT_FILTERS],
    queryFn: async () => {
      const apiURL = ApiEndPoint.clientFilters();

      const { data } = await axios.get<IFetchedClientFilterResponse>(apiURL.href);

      return data;
    },
    select: (data) => {
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

/* interface exports for consumers*/
export type { IFetchedClientFilterSquadMember } from "./types";
