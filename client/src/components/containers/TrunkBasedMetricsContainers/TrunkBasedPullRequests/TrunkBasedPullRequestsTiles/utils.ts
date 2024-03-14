import { IFetchedTrunkBranchPullRequest } from "src/fetchers";

function getBranchSuffix(length: number) {
  const branchSuffix: string = length <= 1 ? "branch" : "branches";

  return branchSuffix;
}

export function getMergedPullRequest(pullRequests: IFetchedTrunkBranchPullRequest[]) {
  const COMPLETED = "completed";
  const pullRequestsCount = pullRequests.length;

  const mergedCount = pullRequests.filter((pr) => pr.status === COMPLETED).length;

  return {
    percentage: mergedCount ? `${((mergedCount / pullRequests.length) * 100).toFixed()}%` : "0%",
    count: `${mergedCount} ${getBranchSuffix(mergedCount)} is merged out of  ${pullRequestsCount} ${getBranchSuffix(
      pullRequestsCount,
    )}`,
  };
}
