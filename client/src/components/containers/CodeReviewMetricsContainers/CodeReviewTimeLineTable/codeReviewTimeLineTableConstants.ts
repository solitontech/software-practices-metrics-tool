import { IColumn, IVotesLabel } from "./interfaces";
import approved from "../../../../assets/images/approved.svg";
import approvedWithSuggestions from "../../../../assets/images/approvedWithSuggestions.svg";
import noVote from "../../../../assets/images/noVote.svg";
import rejected from "../../../../assets/images/rejected.svg";
import waitForAuthor from "../../../../assets/images/waitForAuthor.svg";

export const columns: readonly IColumn[] = [
  {
    id: "author",
    label: "Reviewed By",
    width: 220,
    align: "left",
  },
  {
    id: "time",
    label: "Time",
    width: 135,
    align: "left",
  },
  {
    id: "vote",
    label: "Vote",
    width: 30,
    align: "left",
  },
];

export const votesLabel: IVotesLabel = {
  approved: "Approved",
  rejected: "Rejected",
  approvedWithSuggestions: "Approved With Suggestions",
  waitForAuthor: "Wait For Author",
  noVote: "No Vote",
};

export const votesImage: IVotesLabel = {
  approved: approved,
  approvedWithSuggestions: approvedWithSuggestions,
  rejected: rejected,
  waitForAuthor: waitForAuthor,
  noVote: noVote,
};
