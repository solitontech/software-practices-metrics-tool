import { IContextClientFiltersSquadUser } from "../../../context";

export const isValidUsers = (users: [string, IContextClientFiltersSquadUser][]) => {
  return users.length > 0;
};
