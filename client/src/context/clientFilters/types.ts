import { IFetchersClientFilterSquadMember } from "../../fetchers";

export interface IContextClientFilterSquad {
  squadName: string;
  developers: IFetchersClientFilterSquadMember[];
  reviewers: IFetchersClientFilterSquadMember[];
}
export type IContextClientFilterSquadMembers = IFetchersClientFilterSquadMember[];

export type IContextClientFilterSquadMemberKey = keyof Pick<IContextClientFilterSquad, "developers" | "reviewers">;

export interface IContextClientFilter {
  filters: IContextClientFilterSquad[];
  setFilters: React.Dispatch<React.SetStateAction<IContextClientFilterSquad[]>>;
}

export interface IContextClientFilterProps {
  children: React.ReactNode;
}
