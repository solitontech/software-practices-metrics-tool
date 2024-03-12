import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { ClientFiltersUtils } from "./clientFiltersUtils";
import { IFetchedClientFilterResponse } from "./types";
import { ApiEndPoint } from "../../api";
import { QUERY_KEY } from "../../setup/queryKey";

export const useClientFilters = () => {
  const clientFiltersQuery = useQuery({
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

  return clientFiltersQuery;
};

/* interface exports */
export type { IFetchedClientFilterSquadMember } from "./types";
