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
