import { CodeReviewSortingIcon } from "src/components/containers/CodeReviewMetricsContainers/CodeReviewSortingIcon/CodeReviewSortingIcon";
import { VOTES, SORT_MAP } from "src/constants/constants";
import { IFetchedPullRequestVotes } from "src/services/api/api";

import { ICodeReviewTableColumn, ICodeReviewTableVotesFilterColumn } from "./codeReviewMetricsTableTypes";
import { CodeReviewTableVotesFilter } from "./CodeReviewTableVotesFilter/CodeReviewTableVotesFilter";

export const DEFAULT_SORT_STATE = {
  comments: SORT_MAP.NO_SORT,
  firstReviewResponseTimeInSeconds: SORT_MAP.NO_SORT,
  approvalTimeInSeconds: SORT_MAP.NO_SORT,
  mergeTimeInSeconds: SORT_MAP.NO_SORT,
};

const VOTES_FILTER_DEFAULT_STATE: Record<keyof IFetchedPullRequestVotes, boolean> = {
  [VOTES.APPROVED]: false,
  [VOTES.APPROVED_WITH_SUGGESTIONS]: false,
  [VOTES.WAIT_FOR_AUTHOR]: false,
  [VOTES.REJECTED]: false,
  [VOTES.NO_VOTE]: false,
};

export const DEFAULT_FILTER_STATE: Record<
  ICodeReviewTableVotesFilterColumn,
  Record<keyof IFetchedPullRequestVotes, boolean>
> = {
  votesHistory: VOTES_FILTER_DEFAULT_STATE,
  votes: VOTES_FILTER_DEFAULT_STATE,
};

export const FILTER_COLUMN_VOTES = "votes";
export const FILTER_COLUMN_VOTES_HISTORY = "votesHistory";

export const columns: ICodeReviewTableColumn[] = [
  {
    id: "creationDate",
    label: "Start Date",
    width: 98,
    align: "left",
  },
  {
    id: "closedDate",
    label: "End Date",
    width: 98,
    align: "left",
  },
  {
    id: "title",
    label: "Title",
    width: 340,
    align: "left",
  },
  {
    id: "tags",
    label: "Tags",
    width: 130,
    align: "left",
  },
  {
    id: "createdBy",
    label: "Author",
    width: 150,
    align: "left",
  },
  {
    id: "comments",
    label: "Comments",
    width: 150,
    align: "left",
    action: CodeReviewSortingIcon,
  },
  {
    id: "votesHistory",
    label: "Votes History",
    width: 155,
    align: "center",
    action: CodeReviewTableVotesFilter,
  },
  {
    id: "votes",
    label: "Current Votes",
    width: 180,
    align: "center",
    action: CodeReviewTableVotesFilter,
  },
  {
    id: "firstReviewResponseTimeInSeconds",
    label: "First Review Response Time",
    align: "left",
    width: 160,
    action: CodeReviewSortingIcon,
  },
  {
    id: "approvalTimeInSeconds",
    label: "Approval Time",
    align: "left",
    width: 135,
    action: CodeReviewSortingIcon,
  },
  {
    id: "mergeTimeInSeconds",
    label: "Merge Time",
    align: "left",
    width: 120,
    action: CodeReviewSortingIcon,
  },
  {
    id: "status",
    label: "Status",
    align: "left",
    width: 120,
  },
];
