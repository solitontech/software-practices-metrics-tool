import { IFetchedClientFilterResponse, IFetchedClientFilterSquadMember } from "./clientFiltersTypes";

export class ClientFiltersUtils {
  static #getUsers(
    usersRecord: Record<string, string> | undefined,
    isSelected: boolean,
  ): IFetchedClientFilterSquadMember[] {
    if (!usersRecord) return [];

    return Object.entries(usersRecord).map(([id, name]) => {
      return {
        id,
        name,
        isSelected,
      };
    });
  }

  static getFilters({ squads }: IFetchedClientFilterResponse) {
    const SET_AS_SELECTED = true;

    return squads.map(({ squadName, developers, reviewers }) => {
      return {
        squadName,
        developers: this.#getUsers(developers, SET_AS_SELECTED),
        reviewers: this.#getUsers(reviewers, !SET_AS_SELECTED),
      };
    });
  }
}
