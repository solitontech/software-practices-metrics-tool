export interface IClientFilters {
  tags: [];
  squads: ISquad[];
}

export interface ISquad {
  squadName: string;
  developers: Record<string, string>;
  reviewers: Record<string, string>;
}
