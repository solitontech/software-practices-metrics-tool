export interface IFetchersClientFilterSquadMember {
  id: string;
  name: string;
  isSelected: boolean;
}

export interface IApiClientFilterSquadResponse {
  squadName: string;
  developers: Record<string, string>;
  reviewers: Record<string, string>;
}

export interface IApiClientFilterResponse {
  squads: IApiClientFilterSquadResponse[];
}
