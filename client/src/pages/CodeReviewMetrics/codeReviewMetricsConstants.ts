import { IFetchedCodeReviewPullRequest } from "src/services/api/api";

export const CODE_REVIEW_METRICS: Record<string, keyof IFetchedCodeReviewPullRequest> = {
  FIRST_REVIEW_RESPONSE: "firstReviewResponseTimeInSeconds",
  APPROVAL_TIME: "approvalTimeInSeconds",
  MERGE_TIME: "mergeTimeInSeconds",
};

export const CHIPS: Array<{
  key: string;
  label: string;
  pullRequestKey: keyof IFetchedCodeReviewPullRequest;
  placeholder: string;
}> = [
  {
    key: "startdate",
    label: "Start Date",
    pullRequestKey: "creationDate",
    placeholder: "Search for start date",
  },
  {
    key: "enddate",
    label: "End Date",
    pullRequestKey: "closedDate",
    placeholder: "Search for end date",
  },
  {
    key: "title",
    label: "Title",
    pullRequestKey: "title",
    placeholder: "Search for title",
  },
  {
    key: "tags",
    label: "Tags",
    pullRequestKey: "tags",
    placeholder: "Search for tags",
  },
  {
    key: "author",
    label: "Author",
    pullRequestKey: "createdBy",
    placeholder: "Search for author",
  },
  {
    key: "reviewer",
    label: "Reviewer",
    pullRequestKey: "votesHistoryTimeline",
    placeholder: "Search for reviewer",
  },
  {
    key: "status",
    label: "Status",
    pullRequestKey: "status",
    placeholder: "Search for status",
  },
];
