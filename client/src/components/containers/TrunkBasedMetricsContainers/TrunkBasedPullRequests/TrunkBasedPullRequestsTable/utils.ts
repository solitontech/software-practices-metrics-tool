import { IFetchedTrunkBranchPullRequest } from "src/fetchers";
import { formatDateWithoutTime } from "src/utils";

export function filterPullRequests(searchTerm: string, pullRequests: IFetchedTrunkBranchPullRequest[]) {
  if (!searchTerm) {
    return pullRequests;
  }

  const normalizedSearchTerm = searchTerm.toLocaleLowerCase().trim();

  return pullRequests.filter(({ title, creationDate, closedDate, name, status }) => {
    const formattedCreationDate = formatDateWithoutTime(creationDate);
    const formattedClosedDate = formatDateWithoutTime(closedDate);

    return (
      title.toLocaleLowerCase().includes(normalizedSearchTerm) ||
      creationDate.toLocaleLowerCase().includes(normalizedSearchTerm) ||
      formattedCreationDate.toLocaleLowerCase().includes(normalizedSearchTerm) ||
      formattedClosedDate.toLocaleLowerCase().includes(normalizedSearchTerm) ||
      name.toLocaleLowerCase().includes(normalizedSearchTerm) ||
      status.toLocaleLowerCase().includes(normalizedSearchTerm)
    );
  });
}
