interface IPullRequestReviewerComments {
  reviewer: string;
  comments: number;
}

interface IPullRequestComments {
  totalComments: number;
  numberOfNitComments: number;
  numberOfMajorComments: number;
}

interface IPullRequestVotesTimeline {
  id: string;
  author: string;
  vote: string;
  timeOfVote: Date; //TODO: date is "string format" in the API and add this field wit null type
}

interface IPullRequestVotes {
  approved: number;
  approvedWithSuggestions: number;
  waitForAuthor: number;
  rejected: number;
  noVote: number;
}

export interface IFetchersCodeReviewPullRequest {
  id: number;
  title: string;
  status: string;
  createdBy: string;
  authorId: string;
  isRequiredReviewers: boolean;
  creationDate: string;
  closedDate: string | null;
  votes: IPullRequestVotes;
  votesTimeline: IPullRequestVotesTimeline[];
  votesHistory: IPullRequestVotes; //TODO: Omit<IPullRequestVotes, "noVote">
  votesHistoryTimeline: IPullRequestVotesTimeline[];
  comments: IPullRequestComments;
  reviewerComments: IPullRequestReviewerComments[];
  tags: string[];
  firstReviewResponseTimeInSeconds: number | null;
  approvalTimeInSeconds: number | null;
  mergeTimeInSeconds: number | null;
  url: string;
}

export interface IApiCodeReviewResponse {
  count: number;
  pullRequests: IFetchersCodeReviewPullRequest[];
  errorCount: number;
  filteredCount: number;
}
