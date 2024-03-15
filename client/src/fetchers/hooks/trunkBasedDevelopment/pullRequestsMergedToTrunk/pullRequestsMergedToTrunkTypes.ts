export interface IFetchedTrunkBranchPullRequest {
  branchURL: string;
  name: string;
  title: string;
  creationDate: string;
  closedDate: string | null;
  pullRequestURL: string;
  status: "active" | "completed" | "abandoned";
}

export interface IFetchedTrunkBranchPullRequestsResponse {
  count: number;
  pullRequests: IFetchedTrunkBranchPullRequest[];
}
