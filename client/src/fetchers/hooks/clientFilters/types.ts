interface IFetchedClientFilterSquad {
  squadName: string;
  developers: Record<string, string>;
  reviewers: Record<string, string>;
}

export interface IFetchedClientFilterResponse {
  squads: IFetchedClientFilterSquad[];
}

export interface IFetchedClientFilterSquadMember {
  id: string;
  name: string;
  isSelected: boolean;
}
