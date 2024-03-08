import { ReactNode, createContext, useEffect, useState } from "react";

import { IContextClientFilters, IContextClientFiltersSquad } from "./types";
import { ClientFiltersContextUtils } from "./utils";
import { useClientFilters } from "../../fetchers";

export const ClientFiltersContext = createContext<IContextClientFilters>({
  filters: [],
  setFilters: () => {},
});

export const ClientFiltersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isPending, isError, data } = useClientFilters();

  const [filters, setFilters] = useState<IContextClientFiltersSquad[]>([]);

  useEffect(() => {
    if (isPending || isError) {
      return;
    }

    setFilters(ClientFiltersContextUtils.getFilters(data));
  }, [isPending, isError, data]);

  return <ClientFiltersContext.Provider value={{ filters, setFilters }}>{children}</ClientFiltersContext.Provider>;
};
