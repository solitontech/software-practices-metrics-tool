import { createContext, useEffect, useState } from "react";

import { useClientFilters } from "src/fetchers";

import { IContextClientFilter, IContextClientFilterSquad } from "./types";

interface IContextClientFilterProps {
  children: React.ReactNode;
}

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

/* interface exports for context consumers*/
export type {
  IContextClientFilter,
  IContextClientFilterSquad,
  IContextClientFilterSquadMembers,
  IContextClientFilterSquadMemberKey,
} from "./types";