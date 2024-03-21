import approved from "src/assets/images/approved.svg";
import approvedWithSuggestions from "src/assets/images/approvedWithSuggestions.svg";
import noVote from "src/assets/images/noVote.svg";
import rejected from "src/assets/images/rejected.svg";
import waitForAuthor from "src/assets/images/waitForAuthor.svg";

export const columns = [
  {
    id: "author",
    label: "Reviewed By",
    width: 220,
  },
  {
    id: "time",
    label: "Time",
    width: 135,
  },
  {
    id: "vote",
    label: "Vote",
    width: 30,
  },
];

export const votesLabel = {
  approved: "Approved",
  rejected: "Rejected",
  approvedWithSuggestions: "Approved With Suggestions",
  waitForAuthor: "Wait For Author",
  noVote: "No Vote",
};

export const votesImage = {
  approved: approved,
  approvedWithSuggestions: approvedWithSuggestions,
  rejected: rejected,
  waitForAuthor: waitForAuthor,
  noVote: noVote,
};
