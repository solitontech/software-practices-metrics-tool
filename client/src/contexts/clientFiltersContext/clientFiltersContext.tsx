import { ReactNode, createContext, useEffect, useState } from "react";

import { IClientFiltersContext, ISquad } from "./clientFiltersContextInterface";
import { getFilters } from "./clientFiltersContextUtils";
import { useClientFilters } from "../../queries/useClientFilters";

export const ClientFiltersContext = createContext<IClientFiltersContext>({
  filters: [],
  setFilters: () => {},
});

export const ClientFiltersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data } = useClientFilters();

  const [filters, setFilters] = useState<ISquad[]>([]);

  useEffect(() => {
    if (data) {
      setFilters(getFilters(data));
    }
  }, [data]);

  return (
    <ClientFiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </ClientFiltersContext.Provider>
  );
};
