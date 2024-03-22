import { IFetchedPullRequestVotes } from "src/services/api/api";
export interface PullRequestsVotesAnalysis {
  interval: string;
  pullRequestIds: Record<keyof IFetchedPullRequestVotes, number[]>;
}
