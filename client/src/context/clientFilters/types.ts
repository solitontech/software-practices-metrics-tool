export interface IContextClientFiltersSquadUser {
  name: string;
  isSelected: boolean;
}

export interface IContextClientFiltersSquad {
  squadName: string;
  developers: Record<string, IContextClientFiltersSquadUser>;
  reviewers: Record<string, IContextClientFiltersSquadUser>;
}

export interface IContextClientFilters {
  filters: IContextClientFiltersSquad[];
  setFilters: React.Dispatch<React.SetStateAction<IContextClientFiltersSquad[]>>;
}
