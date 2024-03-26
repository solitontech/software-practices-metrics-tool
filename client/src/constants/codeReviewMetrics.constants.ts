export enum VOTES {
  APPROVED = "approved",
  APPROVED_WITH_SUGGESTIONS = "approvedWithSuggestions",
  WAIT_FOR_AUTHOR = "waitForAuthor",
  REJECTED = "rejected",
  NO_VOTE = "noVote",
}

export const VOTES_LABEL = {
  APPROVED: "Approved",
  APPROVED_WITH_SUGGESTIONS: "Approved with suggestions",
  WAIT_FOR_AUTHOR: "Wait for author",
  REJECTED: "Rejected",
  NO_VOTE: "No vote",
};

export const VOTES_COLOR = {
  APPROVED: "#008000",
  APPROVED_WITH_SUGGESTIONS: "#90EE90",
  WAIT_FOR_AUTHOR: "#FFA500",
  REJECTED: "#FF0000",
  NO_VOTE: "#d9d9d9",
};

export const SORT_MAP = {
  ASCENDING: "asc",
  DESCENDING: "desc",
  NO_SORT: " noSort",
};
