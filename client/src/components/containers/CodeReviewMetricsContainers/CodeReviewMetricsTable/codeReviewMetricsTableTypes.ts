import { IFetchedPullRequestVotesTimeline } from "src/services/api/api";

export type ICodeReviewTableVotes = "approved" | "approvedWithSuggestions" | "noVote" | "waitForAuthor" | "rejected";

export type ICodeReviewTableVotesFilter = Record<ICodeReviewTableVotes, boolean>;

export type ICodeReviewTableVotesFilterColumn = "votes" | "votesHistory";

export interface ICustomSortingIconProps {
  handleSort: (order: string) => void;
  filter: ICodeReviewTableVotesFilter;
  showNoVote: boolean;
  handleFilter: (vote: ICodeReviewTableVotes, value: boolean) => void;
  handleFilterReset: () => void;
}

export interface IVotes {
  approved: number;
  approvedWithSuggestions: number;
  noVote: number;
  waitForAuthor: number;
  rejected: number;
}

export interface IVotesTimeline {
  author: string;
  id: string;
  timeOfVote: Date;
  vote: string;
}

export interface IReviewerComments {
  reviewer: string;
  comments: number;
}

export interface ICodeReviewTableColumn {
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
  minWidth: number;
  align: "left" | "right" | "center";
  action?: (props: ICustomSortingIconProps) => JSX.Element;
}

export interface ITimeLine {
  timeLine: IFetchedPullRequestVotesTimeline[];
  title: string;
  url: string;
}
