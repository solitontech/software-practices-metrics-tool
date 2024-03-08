import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { IClientFilters } from "../../../components/containers/ClientFilters/clientFiltersInterfaces";
import { API } from "../../api";
import { QUERY_KEY } from "../../constants/queryKey.constant";
import { ICustomError } from "../types/types";

async function fetchClientFilters() {
  const { data } = await axios.get<IClientFilters>(API.clientFilters());

  return data;
}

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
