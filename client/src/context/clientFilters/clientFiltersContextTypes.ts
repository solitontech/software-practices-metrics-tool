import { IFetchedClientFilterSquadMember } from "src/services/api/api";

export type IContextClientFilterSquadMembers = IFetchedClientFilterSquadMember[];
export interface IContextClientFilterSquad {
  squadName: string;
  developers: IContextClientFilterSquadMembers;
  reviewers: IContextClientFilterSquadMembers;
}

export interface IContextClientFilter {
  filters: IContextClientFilterSquad[];
  setFilters: React.Dispatch<React.SetStateAction<IContextClientFilterSquad[]>>;
}

export type IContextClientFilterSquadMemberKey = keyof Pick<IContextClientFilterSquad, "developers" | "reviewers">;
