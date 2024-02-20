export interface IColumn {
  id: "name" | "title" | "creationDate" | "closedDate" | "status";
  label: string;
  width?: number;
  align?: "center" | "left" | "right";
}

export interface IPullRequestsMergedToMain {
  creationDate: string;
  closedDate: string;
  name: string;
  title: string;
  status: string;
  pullRequestURL: string;
  branchURL: string;
}

export interface IPullRequestsMergedToMainSuccessInfo {
  pullRequestsMergedList: IPullRequestsMergedToMain[];
  errorCount?: number;
}

export interface IPullRequestsInfoMergedToMain {
  count: number;
  pullRequests: IPullRequestsMergedToMain[];
}

export interface IPullRequestMergedCount {
  count: string;
  percentage: string;
}
