import { IFetchedCodeReviewPullRequest } from "src/services/api/api";

export const GRAPH_KEY_LABEL: Record<string, { LABEL: string; KEY: keyof IFetchedCodeReviewPullRequest }> = {
  FIRST_REVIEW_RESPONSE: {
    LABEL: "first review response",
    KEY: "firstReviewResponseTimeInSeconds",
  },
  APPROVAL_TIME: { LABEL: "approval", KEY: "approvalTimeInSeconds" },
  MERGE_TIME: { LABEL: "merge", KEY: "mergeTimeInSeconds" },
};
