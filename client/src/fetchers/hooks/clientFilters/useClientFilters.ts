import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { IFetchedClientFilterResponse } from "./types";
import { ClientFiltersUtils } from "./utils";
import { ApiEndPoint } from "../../api";
import { QUERY_KEY } from "../../setup/queryKey";

export const useClientFilters = () => {
  const clientFiltersQuery = useQuery({
    queryKey: [QUERY_KEY.CLIENT_FILTERS],
    queryFn: async () => {
      const { data } = await axios.get<IFetchedClientFilterResponse>(ApiEndPoint.clientFilters());

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
