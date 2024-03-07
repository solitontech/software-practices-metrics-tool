import {
  IPullRequestMergedCount,
  IPullRequestsMergedToMain,
} from "./interfaces";
import {
  BASE_PERCENTAGE,
  COMPLETED,
} from "./trunkBasedPullRequestsTableConstants";
import { formatDateWithoutTime } from "../../../../utils/formatTimeUtils";

export const filterPullRequests = (
  pullRequests: IPullRequestsMergedToMain[],
  searchTerm: string,
): IPullRequestsMergedToMain[] => {
  const normalizedSearchTerm = searchTerm.toLocaleLowerCase();

  return pullRequests.filter((row) => {
    const { title, creationDate, closedDate, name, status } = row;

    const formattedCreationDate = formatDateWithoutTime(creationDate);
    const formattedClosedDate = formatDateWithoutTime(closedDate);

    return (
      title.toLocaleLowerCase().includes(normalizedSearchTerm) ||
      creationDate.toLocaleLowerCase().includes(normalizedSearchTerm) ||
      formattedCreationDate
        .toLocaleLowerCase()
        .includes(normalizedSearchTerm) ||
      formattedClosedDate.toLocaleLowerCase().includes(normalizedSearchTerm) ||
      name.toLocaleLowerCase().includes(normalizedSearchTerm) ||
      status.toLocaleLowerCase().includes(normalizedSearchTerm)
    );
  });
};

function getBranchSuffix(length: number) {
  const branchSuffix: string = length <= 1 ? "branch" : "branches";

  return branchSuffix;
}

export function getMergedPullRequest(
  pullRequests: IPullRequestsMergedToMain[],
): IPullRequestMergedCount {
  const completedPRs = pullRequests.filter((pr) => pr.status === COMPLETED);
  const mergedPRsCount = completedPRs.length;

  return {
    count: `${mergedPRsCount} ${getBranchSuffix(
      mergedPRsCount,
    )} is merged out of  ${pullRequests.length} ${getBranchSuffix(
      pullRequests.length,
    )}`,
    percentage: mergedPRsCount
      ? `${(
          (mergedPRsCount / pullRequests.length) *
          BASE_PERCENTAGE
        ).toFixed()}%`
      : "0%",
  };
}
