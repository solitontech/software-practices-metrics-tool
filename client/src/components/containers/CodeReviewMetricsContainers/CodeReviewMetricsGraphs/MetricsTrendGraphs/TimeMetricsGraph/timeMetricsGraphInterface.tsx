export type TimeMetrics = "firstReviewResponse" | "approval" | "merge";

export interface IPullRequestsTimeMetrics {
  interval: string;
  pullRequestIds: Record<TimeMetrics, number[]>;
  timeInSeconds: Record<TimeMetrics, number[]>;
}
