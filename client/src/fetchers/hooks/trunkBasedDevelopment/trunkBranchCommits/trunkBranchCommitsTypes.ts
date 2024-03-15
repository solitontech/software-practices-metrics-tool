interface IFetchedTrunkBranchCommitAuthor {
  name: string;
  email: string;
  date: string;
}

export interface IFetchedTrunkBranchCommit {
  id: string;
  comment: string;
  author: IFetchedTrunkBranchCommitAuthor;
}

export interface IFetchedTrunkBranchCommitsResponse {
  count: number;
  commits: IFetchedTrunkBranchCommit[];
}
