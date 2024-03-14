import { IFetchedTrunkBranchPullRequest } from "src/fetchers";

export function getMergedPullRequest(pullRequests: IFetchedTrunkBranchPullRequest[]) {
  const mergedCount = pullRequests.filter((pr) => pr.status === "completed").length;

  return {
    percentage: mergedCount ? `${((mergedCount / pullRequests.length) * 100).toFixed()}%` : "0%",
    count: `${mergedCount} branches is merged out of ${pullRequests.length} branches`,
  };
}
