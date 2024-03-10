import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { IApiClientFilterResponse } from "./types";
import { ClientFiltersUtils } from "./utils";
import { ApiEndPoint } from "../../api";
import { QUERY_KEY } from "../../constants/queryKey.constant";

export const useClientFilters = () => {
  const clientFiltersQuery = useQuery({
    queryKey: [QUERY_KEY.CLIENT_FILTERS],
    queryFn: async () => {
      const { data } = await axios.get<IApiClientFilterResponse>(ApiEndPoint.clientFilters());

      return data;
    },
    select: (data) => {
      return ClientFiltersUtils.getFilters(data);
    },
  });

  return clientFiltersQuery;
};

/*TODO: verify the real need of these types*/
/* interface exports */
export type { IApiClientFilterResponse, IFetchersClientFilterSquadMember } from "./types";
