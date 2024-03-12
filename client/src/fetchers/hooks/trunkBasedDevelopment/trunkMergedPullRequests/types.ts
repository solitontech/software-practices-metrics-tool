export interface IFetchedTrunkBranchPullRequest {
  branchURL: string;
  name: string;
  title: string;
  creationDate: string;
  closedDate: string; // TODO: Possible null value
  pullRequestURL: string;
  status: string;
}

export interface IFetchedTrunkBranchPullRequestsResponse {
  count: number;
  pullRequests: IFetchedTrunkBranchPullRequest[];
}
