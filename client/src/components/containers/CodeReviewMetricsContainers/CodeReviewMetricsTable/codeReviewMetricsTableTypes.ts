import { IFetchedCodeReviewPullRequest, IFetchedPullRequestVotes } from "src/services/api/api";

interface ICodeReviewTableAction {
  filter: Record<keyof IFetchedPullRequestVotes, boolean>;
  showNoVote: boolean;
  handleSort: (order: string) => void;
  handleFilter: (vote: keyof IFetchedPullRequestVotes, value: boolean) => void;
  handleFilterReset: () => void;
}

export interface ICodeReviewTableColumn {
  id: keyof IFetchedCodeReviewPullRequest;
  label: string;
  align: "left" | "right" | "center";
  width: number;
  action?: (props: ICodeReviewTableAction) => JSX.Element;
}

export type ICodeReviewTableVotesFilterColumn = "votes" | "votesHistory";
