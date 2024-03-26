import { IFetchedPullRequestVotes } from "src/services/api/api";

import { ICodeReviewTableVotesFilterColumn, ICodeReviewTableColumn } from "../codeReviewMetricsTableTypes";

export interface ICodeReviewTableHeaderProps {
  column: ICodeReviewTableColumn;
  filters: Record<ICodeReviewTableVotesFilterColumn, Record<keyof IFetchedPullRequestVotes, boolean>>;
  handleSort: (columnName: string, order: string) => void;
  handleFilterReset: () => void;
  handleFilterChange: (
    columnName: ICodeReviewTableVotesFilterColumn,
    voteKey: keyof IFetchedPullRequestVotes,
    value: boolean,
  ) => void;
}
