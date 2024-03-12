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
