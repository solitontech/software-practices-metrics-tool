interface IFetchedTrunkMetricsBranch {
  id: string;
  name: string;
  url: string;
}

export interface IFetchedTrunkMetricsBranches {
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
