export interface IBranchInfo {
  id: string;
  name: string;
  url: string;
}

interface IBranches {
  count: number;
  branches: IBranchInfo[];
}

export interface IActiveBranch {
  name: string;
  title: string;
  creationDate: string;
  createdBy: string;
  pullRequestURL: string;
  branchURL: string;
}

export interface IActiveBranchSuccessInfo {
  activeBranchesList: IActiveBranch[];
  errorCount?: number;
}

export interface ITotalBranches {
  branchesURL: string;
  totalNumberOfBranches: number;
  percentageOfBranchesFollowingStandard: string;
  branchesFollowingNamingStandard: IBranches;
  branchesNotFollowingNamingStandard: IBranches;
}

export interface IActiveBranches {
  count: number;
  branches: IActiveBranch[];
}
