import { ICodeReviewTableVotes } from "../../../CodeReviewMetricsTable/codeReviewMetricsTableTypes";

export interface PullRequestsVotesAnalysis {
  interval: string;
  pullRequestIds: Record<ICodeReviewTableVotes, number[]>;
}
