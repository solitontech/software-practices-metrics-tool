export interface IClientFiltersContext {
  filters: ISquad[];
  setFilters: React.Dispatch<React.SetStateAction<ISquad[]>>;
}

export interface ISquad {
  squadName: string;
  developers: Record<string, IUser>;
  reviewers: Record<string, IUser>;
}

export interface IUser {
  name: string;
  isSelected: boolean;
}
