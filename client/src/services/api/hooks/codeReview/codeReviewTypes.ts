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

export interface IFetchedRawPullRequestThreads {
  comments: IFetchedRawPullRequestComments[];
}

export interface IFetchedRawPullRequestComments {
  content: string;
  authorName: string;
  authorId: string;
}

interface IFetchedRawCodeReviewPullRequest {
  id: number;
  title: string;
  status: string;
  createdBy: string;
  authorId: string;
  creationDate: string;
  closedDate: string | null;
  votesTimeline: IFetchedPullRequestVotesTimeline[];
  votesHistoryTimeline: IFetchedPullRequestVotesTimeline[];
  threads: IFetchedRawPullRequestThreads[];
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

export interface IFetchedRawCodeReviewResponse {
  count: number;
  pullRequests: IFetchedRawCodeReviewPullRequest[];
  errorCount: number;
  filteredCount: number;
}

export interface IFetchedCodeReviewResponse {
  pullRequests: IFetchedCodeReviewPullRequest[];
  errorCount: number;
}
