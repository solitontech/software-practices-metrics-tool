export interface IFetchedPullRequestReviewerComments {
  reviewer: string;
  comments: number;
}

interface IFetchedPullRequestComments {
  totalComments: number;
  numberOfNitComments: number;
  numberOfMajorComments: number;
}

export interface IFetchedPullRequestVotes {
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
  timeOfVote: string | null;
}

export interface IFetchedRawCodeReviewPullRequest {
  id: number;
  title: string;
  status: string;
  createdBy: string;
  authorId: string;
  creationDate: string;
  closedDate: string | null;
  votesTimeline: IFetchedPullRequestVotesTimeline[];
  votesHistory: Omit<IFetchedPullRequestVotes, "noVote">; //TODO: Omit<IPullRequestVotes, "noVote">
  votesHistoryTimeline: IFetchedPullRequestVotesTimeline[];
  comments: IFetchedPullRequestComments;
  reviewerComments: IFetchedPullRequestReviewerComments[];
  tags: string[];
  firstReviewResponseTimeInSeconds: number | null;
  approvalTimeInSeconds: number | null;
  mergeTimeInSeconds: number | null;
  url: string;
}

export interface IFetchedCodeReviewPullRequest {
  id: number;
  title: string;
  status: string;
  createdBy: string;
  authorId: string;
  creationDate: string;
  closedDate: string | null;
  votes: IFetchedPullRequestVotes;
  votesTimeline: IFetchedPullRequestVotesTimeline[];
  votesHistory: Omit<IFetchedPullRequestVotes, "noVote">; //TODO: Omit<IPullRequestVotes, "noVote">
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
  pullRequests: IFetchedRawCodeReviewPullRequest[];
  errorCount: number;
  filteredCount: number;
}
