import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { ApiURL } from "../../api";
import { QUERY_KEY } from "../../constants/queryKey.constant";

export interface IApiClientFilterResponse {
  tags: [];
  squads: Array<{
    squadName: string;
    developers: Record<string, string>;
    reviewers: Record<string, string>;
  }>;
}

export const useClientFilters = () => {
  const clientFiltersQuery = useQuery({
    queryKey: [QUERY_KEY.CLIENT_FILTERS],
    queryFn: async () => {
      const { data } = await axios.get<IApiClientFilterResponse>(ApiURL.clientFilters());

      return data;
    },
  });

  return clientFiltersQuery;
};
