import { ISquad, IUser } from "./clientFiltersContextInterface";
import { IClientFilters } from "../../components/containers/ClientFilters/clientFiltersInterfaces";

const SET_STATE_AS_ENABLED = true;
const SET_STATE_AS_DISABLED = false;

export function getFilters(data: IClientFilters): ISquad[] {
  return data.squads.map((squad) => {
    return {
      squadName: squad.squadName,
      developers: getUsers(squad.developers, SET_STATE_AS_ENABLED),
      reviewers: getUsers(squad.reviewers, SET_STATE_AS_DISABLED),
    };
  });
}

function getUsers(users: Record<string, string>, selectedState: boolean) {
  const clientFilterUsers: Record<string, IUser> = {};

  for (const user in users) {
    clientFilterUsers[user] = {
      name: users[user],
      isSelected: selectedState,
    };
  }

  return clientFilterUsers;
}
