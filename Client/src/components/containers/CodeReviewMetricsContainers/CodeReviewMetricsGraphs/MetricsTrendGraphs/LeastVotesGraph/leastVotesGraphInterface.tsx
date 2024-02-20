import { Vote } from "../../../CodeReviewMetricsTable/interfaces";

export interface PullRequestsVotesAnalysis {
  interval: string;
  pullRequestIds: Record<Vote, number[]>;
}
