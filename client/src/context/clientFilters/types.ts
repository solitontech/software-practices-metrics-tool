import { IFetchedClientFilterSquadMember } from "../../fetchers";

export interface IContextClientFilterSquad {
  squadName: string;
  developers: IFetchedClientFilterSquadMember[];
  reviewers: IFetchedClientFilterSquadMember[];
}
export type IContextClientFilterSquadMembers = IFetchedClientFilterSquadMember[];

export type IContextClientFilterSquadMemberKey = keyof Pick<IContextClientFilterSquad, "developers" | "reviewers">;

export interface IContextClientFilter {
  filters: IContextClientFilterSquad[];
  setFilters: React.Dispatch<React.SetStateAction<IContextClientFilterSquad[]>>;
}

export interface IContextClientFilterProps {
  children: React.ReactNode;
}
