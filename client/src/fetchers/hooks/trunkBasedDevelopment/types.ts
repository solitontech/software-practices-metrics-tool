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
