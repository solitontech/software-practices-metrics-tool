import { Filter } from "../interfaces";

export const VOTES = {
  APPROVED: "approved",
  APPROVED_WITH_SUGGESTIONS: "approvedWithSuggestions",
  WAIT_FOR_AUTHOR: "waitForAuthor",
  REJECTED: "rejected",
  NO_VOTE: "noVote",
};

export const VOTES_FILTER_DEFAULT_STATE = {
  [VOTES.APPROVED]: false,
  [VOTES.APPROVED_WITH_SUGGESTIONS]: false,
  [VOTES.WAIT_FOR_AUTHOR]: false,
  [VOTES.REJECTED]: false,
  [VOTES.NO_VOTE]: false,
} as Filter;
