import { createContext, useEffect, useState } from "react";

import { IContextClientFilter, IContextClientFilterSquad, IContextClientFilterProps } from "./types";
import { useClientFilters } from "../../fetchers";

export const ClientFilterContext = createContext<IContextClientFilter>({
  filters: [],
  setFilters: () => {},
});

export const ClientFilterProvider = ({ children }: IContextClientFilterProps) => {
  const [filters, setFilters] = useState<IContextClientFilterSquad[]>([]);

  const { isPending, isError, data } = useClientFilters();

  useEffect(() => {
    if (isPending || isError) {
      return;
    }

    setFilters(data);
  }, [isPending, isError, data]);

  return <ClientFilterContext.Provider value={{ filters, setFilters }}>{children}</ClientFilterContext.Provider>;
};

/* interface exports */
export type {
  IContextClientFilter,
  IContextClientFilterSquad,
  IContextClientFilterSquadMembers,
  IContextClientFilterSquadMemberKey,
} from "./types";
