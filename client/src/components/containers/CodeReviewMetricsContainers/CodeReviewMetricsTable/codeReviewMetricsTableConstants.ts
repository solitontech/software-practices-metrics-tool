import { CodeReviewSortingIcon } from "src/components/components";
import { VOTES, sortMap } from "src/constants/constants";
import { IFetchedPullRequestVotes } from "src/services/api/api";

import { ICodeReviewTableColumn, ICodeReviewTableVotesFilterColumn } from "./codeReviewMetricsTableTypes";
import { CustomFilterIcon } from "./VotesFilter/CustomFilterIcon";

export const columns: ICodeReviewTableColumn[] = [
  {
    id: "creationDate",
    label: "Start Date",
    minWidth: 98,
    align: "left",
  },
  {
    id: "closedDate",
    label: "End Date",
    minWidth: 98,
    align: "left",
  },
  {
    id: "title",
    label: "Title",
    minWidth: 340,
    align: "left",
  },
  {
    id: "tags",
    label: "Tags",
    minWidth: 150,
    align: "left",
  },
  {
    id: "createdBy",
    label: "Author",
    minWidth: 150,
    align: "left",
  },
  {
    id: "comments",
    label: "Comments",
    minWidth: 150,
    align: "left",
    action: CodeReviewSortingIcon,
  },
  {
    id: "votesHistory",
    label: "Votes History",
    minWidth: 155,
    align: "center",
    action: CustomFilterIcon,
  },
  {
    id: "votes",
    label: "Current Votes",
    minWidth: 180,
    align: "center",
    action: CustomFilterIcon,
  },
  {
    id: "firstReviewResponseTimeInSeconds",
    label: "First Review Response Time",
    align: "left",
    minWidth: 160,
    action: CodeReviewSortingIcon,
  },
  {
    id: "approvalTimeInSeconds",
    label: "Approval Time",
    align: "left",
    minWidth: 135,
    action: CodeReviewSortingIcon,
  },
  {
    id: "mergeTimeInSeconds",
    label: "Merge Time",
    align: "left",
    minWidth: 120,
    action: CodeReviewSortingIcon,
  },
  {
    id: "status",
    label: "Status",
    align: "left",
    minWidth: 120,
  },
];

export const DEFAULT_SORT_STATE = {
  comments: sortMap.noSort,
  firstReviewResponseTimeInSeconds: sortMap.noSort,
  approvalTimeInSeconds: sortMap.noSort,
  mergeTimeInSeconds: sortMap.noSort,
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
