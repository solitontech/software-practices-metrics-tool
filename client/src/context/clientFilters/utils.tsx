import { IContextClientFiltersSquad, IContextClientFiltersSquadUser } from "./types";
import { IApiClientFilterResponse } from "../../fetchers";

export class ClientFiltersContextUtils {
  static #getUsers(users: Record<string, string>, selectedState: boolean) {
    const clientFilterUsers: Record<string, IContextClientFiltersSquadUser> = {};

    for (const user in users) {
      clientFilterUsers[user] = {
        name: users[user],
        isSelected: selectedState,
      };
    }

    return clientFilterUsers;
  }

  static getFilters(data: IApiClientFilterResponse): IContextClientFiltersSquad[] {
    const SET_STATE_AS_ENABLED = true;
    const SET_STATE_AS_DISABLED = false;

    return data.squads.map((squad) => {
      return {
        squadName: squad.squadName,
        developers: this.#getUsers(squad.developers, SET_STATE_AS_ENABLED),
        reviewers: this.#getUsers(squad.reviewers, SET_STATE_AS_DISABLED),
      };
    });
  }
}
