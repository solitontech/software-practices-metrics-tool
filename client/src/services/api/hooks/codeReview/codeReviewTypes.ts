interface IFetchedPullRequestReviewerComments {
  reviewer: string;
  comments: number;
}

interface IFetchedPullRequestComments {
  totalComments: number;
  numberOfNitComments: number;
  numberOfMajorComments: number;
}

interface IFetchedPullRequestVotes {
  approved: number;
  approvedWithSuggestions: number;
  waitForAuthor: number;
  rejected: number;
  noVote: number;
}

export interface IFetchedPullRequestVotesTimeline {
  id: string;
  author: string;
  vote: keyof IFetchedPullRequestVotes;
  timeOfVote: Date; //TODO: date is "string format" in the API and add this field wit null type
}

export interface IFetchedCodeReviewPullRequest {
  id: number;
  title: string;
  status: string;
  createdBy: string;
  authorId: string;
  isRequiredReviewers: boolean;
  creationDate: string;
  closedDate: string | null;
  votes: IFetchedPullRequestVotes;
  votesTimeline: IFetchedPullRequestVotesTimeline[];
  votesHistory: IFetchedPullRequestVotes; //TODO: Omit<IPullRequestVotes, "noVote">
  votesHistoryTimeline: IFetchedPullRequestVotesTimeline[];
  comments: IFetchedPullRequestComments;
  reviewerComments: IFetchedPullRequestReviewerComments[];
  tags: string[];
  firstReviewResponseTimeInSeconds: number | null;
  approvalTimeInSeconds: number | null;
  mergeTimeInSeconds: number | null;
  url: string;
}

export interface IFetchedCodeReviewResponse {
  count: number;
  pullRequests: IFetchedCodeReviewPullRequest[];
  errorCount: number;
  filteredCount: number;
}
