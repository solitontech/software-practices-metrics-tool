export type Vote = "approved" | "approvedWithSuggestions" | "noVote" | "waitForAuthor" | "rejected";

export type Filter = Record<Vote, boolean>;

export type FilterColumn = "votes" | "votesHistory";

export type Filters = Record<FilterColumn, Filter>;

export interface ICustomSortingIconProps {
  handleSort: (order: string) => void;
  filter: Filter;
  showNoVote: boolean;
  handleFilter: (vote: Vote, value: boolean) => void;
  handleFilterReset: () => void;
}

export interface IVotes {
  approved: number;
  approvedWithSuggestions: number;
  noVote: number;
  waitForAuthor: number;
  rejected: number;
}

interface IComments {
  totalComments: number;
  numberOfNitComments: number;
  numberOfMajorComments: number;
}

export interface IVotesTimeline {
  author: string;
  id: string;
  timeOfVote: Date;
  vote: string;
}

export interface IPullRequestList {
  closedDate: string;
  id: number;
  title: string;
  status: string;
  createdBy: string;
  authorId: string;
  isRequiredReviewers: boolean;
  creationDate: string;
  votes: IVotes;
  votesTimeline: IVotesTimeline[];
  votesHistory: IVotes;
  votesHistoryTimeline: IVotesTimeline[];
  comments: IComments;
  reviewerComments: IReviewerComments[];
  tags: string[];
  firstReviewResponseTimeInSeconds: number | null;
  approvalTimeInSeconds: number | null;
  mergeTimeInSeconds: number | null;
  url: string;
}

export interface IReviewerComments {
  reviewer: string;
  comments: number;
}

export interface IPullRequestSuccessInfo {
  pullRequestList: IPullRequestList[];
  errorCount: number;
}

export interface IPullRequestInfo {
  count: number;
  pullRequests: IPullRequestList[];
  errorCount: number;
  filteredCount: number;
}

export interface IColumn {
  id:
    | "startDate"
    | "endDate"
    | "title"
    | "tags"
    | "status"
    | "comments"
    | "votesHistory"
    | "votes"
    | "firstReviewResponseTimeInSeconds"
    | "approvalTimeInSeconds"
    | "mergeTimeInSeconds"
    | "createdBy";
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
  action?: (props: ICustomSortingIconProps) => JSX.Element;
}

export interface ITimeLine {
  timeLine: IVotesTimeline[];
  title: string;
  url: string;
}
