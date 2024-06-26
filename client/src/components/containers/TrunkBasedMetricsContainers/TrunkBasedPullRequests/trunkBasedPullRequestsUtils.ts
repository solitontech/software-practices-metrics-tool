import { IFetchedTrunkBranchPullRequest } from "src/services/api/api";
import { getFormattedDateWithoutTime } from "src/utils/utils";

export function filterPullRequests(searchKeyword: string, pullRequests: IFetchedTrunkBranchPullRequest[]) {
  if (!searchKeyword) {
    return pullRequests;
  }

  const searchTerm = searchKeyword.toLocaleLowerCase().trim();

  return pullRequests.filter(({ title, creationDate, closedDate, name, status }) => {
    const formattedCreationDate = getFormattedDateWithoutTime(creationDate);
    const formattedClosedDate = getFormattedDateWithoutTime(closedDate);

    return (
      title.toLocaleLowerCase().includes(searchTerm) ||
      creationDate.toLocaleLowerCase().includes(searchTerm) ||
      formattedCreationDate.toLocaleLowerCase().includes(searchTerm) ||
      formattedClosedDate.toLocaleLowerCase().includes(searchTerm) ||
      name.toLocaleLowerCase().includes(searchTerm) ||
      status.toLocaleLowerCase().includes(searchTerm)
    );
  });
}
