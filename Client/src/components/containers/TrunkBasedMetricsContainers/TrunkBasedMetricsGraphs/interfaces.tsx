interface IAuthor {
  name: string;
  email: string;
  date: string;
}

export interface ICommit {
  id: string;
  comment: string;
  author: IAuthor;
}

export interface ICodeFreeze {
  count: number;
  commits: ICommit[];
}

export interface ICommitsForDate {
  [date: string]: number;
}

export interface NormalizedDateRange {
  normalizedStartDate: Date;
  normalizedEndDate: Date;
}

export interface ICommitSuccessInfo {
  commitList: ICommit[];
  errorCount?: number;
}
