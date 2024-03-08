import axios from "axios";

import { getBaseURL } from "../../fetchersUtils";
import { IClientFilters } from "../../../components/containers/ClientFilters/clientFiltersInterfaces";

export const fetchClientFilters = async (): Promise<IClientFilters> => {
  const api = new URL(`${getBaseURL()}/api/v1/metrics/client-filters`);

  const { data } = await axios.get<IClientFilters>(api.href);

  return data;
};
