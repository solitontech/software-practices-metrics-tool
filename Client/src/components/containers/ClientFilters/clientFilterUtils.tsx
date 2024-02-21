import { IUser } from "../../../contexts/clientFiltersContext/clientFiltersContextInterface";

export const isValidUsers = (users: [string, IUser][]) => {
  return users.length > 0;
};
