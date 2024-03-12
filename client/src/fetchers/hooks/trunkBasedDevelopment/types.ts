interface IFetchedTrunkBasedActiveBranches {
  name: string;
  title: string;
  createdBy: string;
  creationDate: string;
  pullRequestURL: string;
  branchURL: string;
}

export interface IFetchedTrunkBasedActiveBranchesResponse {
  count: number;
  branches: IFetchedTrunkBasedActiveBranches[];
}

interface IFetchedTrunkBranchCommitAuthor {
  name: string;
  email: string;
  date: string;
}

interface IFetchedTrunkBranchCommit {
  id: string;
  comment: string;
  author: IFetchedTrunkBranchCommitAuthor;
}

export interface IFetchedTrunkBranchCommitsResponse {
  count: number;
  commits: IFetchedTrunkBranchCommit[];
}

interface IFetchedTrunkMetricsBranch {
  id: string;
  name: string;
  url: string;
}

interface IFetchedTrunkMetricsBranches {
  count: number;
  branches: IFetchedTrunkMetricsBranch[];
}

export interface IFetchedTrunkBranchesResponse {
  branchesURL: string;
  totalNumberOfBranches: number;
  percentageOfBranchesFollowingStandard: string;
  branchesFollowingNamingStandard: IFetchedTrunkMetricsBranches;
  branchesNotFollowingNamingStandard: IFetchedTrunkMetricsBranches;
}

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
