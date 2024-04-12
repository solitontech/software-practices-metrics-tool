import { VOTES } from "src/constants/codeReviewMetrics.constants";

import { IFetchedPullRequestVotesTimeline } from "./codeReviewTypes";
import { TimeMetrics } from "./timeMetricsUtils";

describe("TimeMetrics~getFirstReviewResponseTime - method to get the first review response time of pull request", () => {
  it("should return the time difference between the first review vote to the reviewer added date", () => {
    const votesHistoryTimeline: IFetchedPullRequestVotesTimeline[] = [
      {
        timeOfVote: "2022-01-01T01:00:00Z",
        vote: VOTES.WAIT_FOR_AUTHOR,
        author: "author",
        id: "1",
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        timeOfVote: "2022-01-01T02:00:00Z",
        vote: VOTES.APPROVED,
        author: "author",
        id: "1",
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const result = TimeMetrics.getFirstReviewResponseTime(votesHistoryTimeline);
    const expectedFirstReviewResponseTime = 60 * 60;

    expect(result).toBe(expectedFirstReviewResponseTime);
  });

  it("should return the time difference between the first review vote to the reviewer added date (even other review vote response has less response time)", () => {
    const votesHistoryTimeline: IFetchedPullRequestVotesTimeline[] = [
      {
        timeOfVote: "2022-01-01T01:00:00Z",
        vote: VOTES.WAIT_FOR_AUTHOR,
        author: "author",
        id: "1",
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        timeOfVote: "2022-01-01T02:00:00Z",
        vote: VOTES.APPROVED,
        author: "author",
        id: "1",
        isRequired: false,
        reviewerAddedTime: "2022-01-01T01:30:00Z",
      },
    ];

    const result = TimeMetrics.getFirstReviewResponseTime(votesHistoryTimeline);
    const expectedFirstReviewResponseTime = 60 * 60;

    expect(result).toBe(expectedFirstReviewResponseTime);
  });

  it("should return the time difference between the first review vote to the reviewer added date (more than 3 days difference)", () => {
    const votesHistoryTimeline: IFetchedPullRequestVotesTimeline[] = [
      {
        timeOfVote: "2022-01-05T00:00:00Z",
        vote: VOTES.REJECTED,
        author: "author",
        id: "1",
        isRequired: true,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        timeOfVote: "2022-01-05T01:00:00Z",
        vote: VOTES.WAIT_FOR_AUTHOR,
        author: "author2",
        id: "2",
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        timeOfVote: "2022-01-05T02:00:00Z",
        vote: VOTES.APPROVED,
        author: "author3",
        id: "3",
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        timeOfVote: "2022-01-05T01:00:00Z",
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        author: "author",
        id: "1",
        isRequired: true,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        timeOfVote: "2022-01-05T02:00:00Z",
        vote: VOTES.APPROVED,
        author: "author",
        id: "2",
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const result = TimeMetrics.getFirstReviewResponseTime(votesHistoryTimeline);
    const expectedFirstReviewResponseTime = 3 * 24 * 60 * 60;

    expect(result).toBe(expectedFirstReviewResponseTime);
  });

  it("should return null if votesHistoryTimeline is empty", () => {
    const result = TimeMetrics.getFirstReviewResponseTime([]);

    expect(result).toBeNull();
  });
});

describe("TimeMetrics~getPullRequestApprovalTime - method to get approval time of the pull request", () => {
  it("should return null if required reviewers not approved (no vote)", () => {
    const creationDate = "2022-01-01T00:00:00Z";
    const reviewers: IFetchedPullRequestVotesTimeline[] = [
      {
        author: "author1",
        isRequired: true,
        vote: VOTES.NO_VOTE,
        id: "1",
        timeOfVote: null,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author2",
        isRequired: false,
        vote: VOTES.NO_VOTE,
        id: "2",
        timeOfVote: null,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime(creationDate, reviewers, [], new Map());

    expect(result).toBeNull();
  });

  it("should return null if required reviewers not approved (wait for author)", () => {
    const creationDate = "2022-01-01T00:00:00Z";

    const reviewers: IFetchedPullRequestVotesTimeline[] = [
      {
        author: "author1",
        isRequired: true,
        vote: VOTES.WAIT_FOR_AUTHOR,
        id: "1",
        timeOfVote: "2022-01-01T01:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author2",
        isRequired: false,
        vote: VOTES.WAIT_FOR_AUTHOR,
        id: "2",
        timeOfVote: "2022-01-01T02:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const votesHistoryTimeline: IFetchedPullRequestVotesTimeline[] = [
      {
        id: "1",
        author: "author1",
        timeOfVote: "2022-01-01T01:00:00Z",
        vote: VOTES.WAIT_FOR_AUTHOR,
        isRequired: true,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "2",
        author: "author2",
        timeOfVote: "2022-01-01T02:00:00Z",
        vote: VOTES.WAIT_FOR_AUTHOR,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime(creationDate, reviewers, votesHistoryTimeline, new Map());

    expect(result).toBeNull();
  });

  it("should return null if required reviewers not approved (no vote) even non required reviewers approved", () => {
    const creationDate = "2022-01-01T00:00:00Z";

    const reviewers: IFetchedPullRequestVotesTimeline[] = [
      {
        author: "author1",
        isRequired: true,
        vote: VOTES.NO_VOTE,
        id: "1",
        timeOfVote: "2022-01-01T01:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author2",
        isRequired: false,
        vote: VOTES.APPROVED,
        id: "2",
        timeOfVote: "2022-01-01T02:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const votesHistoryTimeline: IFetchedPullRequestVotesTimeline[] = [
      {
        id: "2",
        author: "author2",
        timeOfVote: "2022-01-01T02:00:00Z",
        vote: VOTES.APPROVED,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime(creationDate, reviewers, votesHistoryTimeline, new Map());

    expect(result).toBeNull();
  });

  it("should return null if required reviewers not approved (no vote) even non required reviewers approved (approved with suggestions)", () => {
    const creationDate = "2022-01-01T00:00:00Z";

    const reviewers: IFetchedPullRequestVotesTimeline[] = [
      {
        author: "author1",
        isRequired: true,
        vote: VOTES.NO_VOTE,
        id: "1",
        timeOfVote: "2022-01-01T01:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author2",
        isRequired: false,
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        id: "2",
        timeOfVote: "2022-01-01T02:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const votesHistoryTimeline: IFetchedPullRequestVotesTimeline[] = [
      {
        id: "2",
        author: "author2",
        timeOfVote: "2022-01-01T02:00:00Z",
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime(creationDate, reviewers, votesHistoryTimeline, new Map());

    expect(result).toBeNull();
  });

  it("should return null if required reviewers not approved (wait for author) even non required reviewers approved", () => {
    const creationDate = "2022-01-01T00:00:00Z";

    const reviewers: IFetchedPullRequestVotesTimeline[] = [
      {
        author: "author1",
        isRequired: true,
        vote: VOTES.WAIT_FOR_AUTHOR,
        id: "1",
        timeOfVote: "2022-01-01T01:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author2",
        isRequired: false,
        vote: VOTES.APPROVED,
        id: "2",
        timeOfVote: "2022-01-01T02:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const votesHistoryTimeline: IFetchedPullRequestVotesTimeline[] = [
      {
        author: "author1",
        isRequired: true,
        vote: VOTES.WAIT_FOR_AUTHOR,
        id: "1",
        timeOfVote: "2022-01-01T01:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "2",
        author: "author2",
        timeOfVote: "2022-01-01T02:00:00Z",
        vote: VOTES.APPROVED,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime(creationDate, reviewers, votesHistoryTimeline, new Map());

    expect(result).toBeNull();
  });

  it("should return null if required reviewers not approved (wait for author) even non required reviewers approved (approved with suggestions)", () => {
    const creationDate = "2022-01-01T00:00:00Z";

    const reviewers: IFetchedPullRequestVotesTimeline[] = [
      {
        author: "author1",
        isRequired: true,
        vote: VOTES.WAIT_FOR_AUTHOR,
        id: "1",
        timeOfVote: "2022-01-01T01:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author2",
        isRequired: false,
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        id: "2",
        timeOfVote: "2022-01-01T02:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const votesHistoryTimeline: IFetchedPullRequestVotesTimeline[] = [
      {
        author: "author1",
        isRequired: true,
        vote: VOTES.WAIT_FOR_AUTHOR,
        id: "1",
        timeOfVote: "2022-01-01T01:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "2",
        author: "author2",
        timeOfVote: "2022-01-01T02:00:00Z",
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime(creationDate, reviewers, votesHistoryTimeline, new Map());

    expect(result).toBeNull();
  });

  it("should return null if all the required reviewers not approved (one required reviewer no vote)", () => {
    const creationDate = "2022-01-01T00:00:00Z";

    const reviewers: IFetchedPullRequestVotesTimeline[] = [
      {
        author: "author1",
        isRequired: true,
        vote: VOTES.NO_VOTE,
        id: "1",
        timeOfVote: null,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author2",
        isRequired: true,
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        id: "2",
        timeOfVote: "2022-01-01T04:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author3",
        isRequired: false,
        vote: VOTES.APPROVED,
        id: "3",
        timeOfVote: "2022-01-01T05:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author4",
        isRequired: false,
        vote: VOTES.WAIT_FOR_AUTHOR,
        id: "4",
        timeOfVote: "2022-01-01T03:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const votesHistoryTimeline: IFetchedPullRequestVotesTimeline[] = [
      {
        id: "2",
        author: "author2",
        timeOfVote: "2022-01-01T01:00:00Z",
        vote: VOTES.WAIT_FOR_AUTHOR,
        isRequired: true,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "3",
        author: "author3",
        timeOfVote: "2022-01-01T02:00:00Z",
        vote: VOTES.WAIT_FOR_AUTHOR,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "4",
        author: "author4",
        timeOfVote: "2022-01-01T03:00:00Z",
        vote: VOTES.APPROVED,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "2",
        author: "author2",
        timeOfVote: "2022-01-01T04:00:00Z",
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        isRequired: true,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "3",
        author: "author3",
        timeOfVote: "2022-01-01T05:00:00Z",
        vote: VOTES.APPROVED,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime(creationDate, reviewers, votesHistoryTimeline, new Map());

    expect(result).toBeNull();
  });

  it("should return null if all the required reviewers not approved (one required reviewer wait for author)", () => {
    const creationDate = "2022-01-01T00:00:00Z";

    const reviewers: IFetchedPullRequestVotesTimeline[] = [
      {
        author: "author1",
        isRequired: true,
        vote: VOTES.APPROVED,
        id: "1",
        timeOfVote: "2022-01-01T05:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author2",
        isRequired: true,
        vote: VOTES.WAIT_FOR_AUTHOR,
        id: "2",
        timeOfVote: "2022-01-01T02:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author3",
        isRequired: false,
        vote: VOTES.APPROVED,
        id: "3",
        timeOfVote: "2022-01-01T03:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author4",
        isRequired: false,
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        id: "4",
        timeOfVote: "2022-01-01T04:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const votesHistoryTimeline: IFetchedPullRequestVotesTimeline[] = [
      {
        id: "1",
        author: "author1",
        timeOfVote: "2022-01-01T01:00:00Z",
        vote: VOTES.WAIT_FOR_AUTHOR,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "2",
        author: "author2",
        timeOfVote: "2022-01-01T02:00:00Z",
        vote: VOTES.WAIT_FOR_AUTHOR,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "3",
        author: "author3",
        timeOfVote: "2022-01-01T03:00:00Z",
        vote: VOTES.APPROVED,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "4",
        author: "author4",
        timeOfVote: "2022-01-01T04:00:00Z",
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "1",
        author: "author1",
        timeOfVote: "2022-01-01T05:00:00Z",
        vote: VOTES.APPROVED,
        isRequired: true,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime(creationDate, reviewers, votesHistoryTimeline, new Map());

    expect(result).toBeNull();
  });

  it("should return the time difference between the creation date and the latest reviewer approval time (no non required reviewers)", () => {
    const creationDate = "2022-01-01T00:00:00Z";

    const reviewers: IFetchedPullRequestVotesTimeline[] = [
      {
        author: "author1",
        isRequired: true,
        vote: VOTES.APPROVED,
        id: "1",
        timeOfVote: "2022-01-01T01:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author2",
        isRequired: true,
        vote: VOTES.APPROVED,
        id: "2",
        timeOfVote: "2022-01-01T02:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const votesHistoryTimeline: IFetchedPullRequestVotesTimeline[] = [
      {
        id: "1",
        author: "author1",
        timeOfVote: "2022-01-01T01:00:00Z",
        vote: VOTES.APPROVED,
        isRequired: true,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "2",
        author: "author2",
        timeOfVote: "2022-01-01T02:00:00Z",
        vote: VOTES.APPROVED,
        isRequired: true,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime(creationDate, reviewers, votesHistoryTimeline, new Map());

    const expectedApprovalTime = 2 * 60 * 60;

    expect(result).toBe(expectedApprovalTime);
  });

  it("should return the time difference between the creation date and the latest reviewer approval time (approved with suggestions) (no non required reviewers)", () => {
    const creationDate = "2022-01-01T00:00:00Z";

    const reviewers: IFetchedPullRequestVotesTimeline[] = [
      {
        author: "author1",
        isRequired: true,
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        id: "1",
        timeOfVote: "2022-01-01T01:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author2",
        isRequired: true,
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        id: "2",
        timeOfVote: "2022-01-01T02:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const votesHistoryTimeline: IFetchedPullRequestVotesTimeline[] = [
      {
        id: "1",
        author: "author1",
        timeOfVote: "2022-01-01T01:00:00Z",
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        isRequired: true,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "2",
        author: "author2",
        timeOfVote: "2022-01-01T02:00:00Z",
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        isRequired: true,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime(creationDate, reviewers, votesHistoryTimeline, new Map());

    const expectedApprovalTime = 2 * 60 * 60;

    expect(result).toBe(expectedApprovalTime);
  });

  it("should return the time difference between the creation date and the latest reviewer approval time (with non required reviewers)", () => {
    const creationDate = "2022-01-01T00:00:00Z";

    const reviewers: IFetchedPullRequestVotesTimeline[] = [
      {
        author: "author1",
        isRequired: true,
        vote: VOTES.APPROVED,
        id: "1",
        timeOfVote: "2022-01-01T01:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author2",
        isRequired: false,
        vote: VOTES.APPROVED,
        id: "2",
        timeOfVote: "2022-01-01T02:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const votesHistoryTimeline: IFetchedPullRequestVotesTimeline[] = [
      {
        id: "1",
        author: "author1",
        timeOfVote: "2022-01-01T01:00:00Z",
        vote: VOTES.APPROVED,
        isRequired: true,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "2",
        author: "author2",
        timeOfVote: "2022-01-01T02:00:00Z",
        vote: VOTES.APPROVED,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime(creationDate, reviewers, votesHistoryTimeline, new Map());

    const expectedApprovalTime = 1 * 60 * 60;

    expect(result).toBe(expectedApprovalTime);
  });

  it("should return the time difference between the creation date and the latest reviewer approval time (approved with suggestions) (with non required reviewers)", () => {
    const creationDate = "2022-01-01T00:00:00Z";

    const reviewers: IFetchedPullRequestVotesTimeline[] = [
      {
        author: "author1",
        isRequired: true,
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        id: "1",
        timeOfVote: "2022-01-01T01:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author2",
        isRequired: false,
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        id: "2",
        timeOfVote: "2022-01-01T02:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const votesHistoryTimeline: IFetchedPullRequestVotesTimeline[] = [
      {
        id: "1",
        author: "author1",
        timeOfVote: "2022-01-01T01:00:00Z",
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        isRequired: true,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "2",
        author: "author2",
        timeOfVote: "2022-01-01T02:00:00Z",
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime(creationDate, reviewers, votesHistoryTimeline, new Map());

    const expectedApprovalTime = 1 * 60 * 60;

    expect(result).toBe(expectedApprovalTime);
  });

  it("should return the time difference between the creation date and the latest required reviewer approval time (approved with suggestions)", () => {
    const creationDate = "2022-01-01T00:00:00Z";

    const reviewers: IFetchedPullRequestVotesTimeline[] = [
      {
        author: "author1",
        isRequired: true,
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        id: "1",
        timeOfVote: "2022-01-01T01:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author2",
        isRequired: false,
        vote: VOTES.APPROVED,
        id: "2",
        timeOfVote: "2022-01-01T02:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const votesHistoryTimeline: IFetchedPullRequestVotesTimeline[] = [
      {
        id: "1",
        author: "author1",
        timeOfVote: "2022-01-01T01:00:00Z",
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        isRequired: true,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "2",
        author: "author2",
        timeOfVote: "2022-01-01T02:00:00Z",
        vote: VOTES.APPROVED,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime(creationDate, reviewers, votesHistoryTimeline, new Map());

    const expectedApprovalTime = 1 * 60 * 60;

    expect(result).toBe(expectedApprovalTime);
  });

  it("should return the time difference between the creation date and the latest required reviewer approval time (repeated approval vote of a reviewer)", () => {
    const creationDate = "2022-01-01T00:00:00Z";

    const reviewers: IFetchedPullRequestVotesTimeline[] = [
      {
        author: "author1",
        isRequired: true,
        vote: VOTES.APPROVED,
        id: "1",
        timeOfVote: "2022-01-01T03:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author2",
        isRequired: false,
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        id: "2",
        timeOfVote: "2022-01-01T02:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const votesHistoryTimeline: IFetchedPullRequestVotesTimeline[] = [
      {
        id: "1",
        author: "author1",
        timeOfVote: "2022-01-01T01:00:00Z",
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        isRequired: true,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "2",
        author: "author2",
        timeOfVote: "2022-01-01T02:00:00Z",
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "1",
        author: "author1",
        timeOfVote: "2022-01-01T03:00:00Z",
        vote: VOTES.APPROVED,
        isRequired: true,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime(creationDate, reviewers, votesHistoryTimeline, new Map());

    const expectedApprovalTime = 3 * 60 * 60;

    expect(result).toBe(expectedApprovalTime);
  });

  it("should return the time difference between the creation date and the latest required reviewer approval time (more than 3 days difference)", () => {
    const creationDate = "2022-01-01T00:00:00Z";

    const reviewers: IFetchedPullRequestVotesTimeline[] = [
      {
        author: "author1",
        isRequired: true,
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        id: "1",
        timeOfVote: "2022-01-01T04:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author2",
        isRequired: false,
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        id: "2",
        timeOfVote: "2022-01-01T02:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const votesHistoryTimeline: IFetchedPullRequestVotesTimeline[] = [
      {
        id: "1",
        author: "author1",
        timeOfVote: "2022-01-01T04:00:00Z",
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        isRequired: true,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "2",
        author: "author2",
        timeOfVote: "2022-01-01T02:00:00Z",
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime(creationDate, reviewers, votesHistoryTimeline, new Map());

    const expectedApprovalTime = 4 * 60 * 60;

    expect(result).toBe(expectedApprovalTime);
  });

  it("should return the time difference between the creation date and the latest non-required reviewer when required reviewer is not available in votes history timeline", () => {
    const creationDate = "2022-01-01T00:00:00Z";

    const reviewers: IFetchedPullRequestVotesTimeline[] = [
      {
        author: "author1",
        isRequired: false,
        vote: VOTES.APPROVED,
        id: "1",
        timeOfVote: "2022-01-01T01:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author2",
        isRequired: true,
        vote: VOTES.APPROVED,
        id: "2",
        timeOfVote: null,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author3",
        isRequired: false,
        vote: VOTES.WAIT_FOR_AUTHOR,
        id: "3",
        timeOfVote: "2022-01-01T03:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author4",
        isRequired: false,
        vote: VOTES.APPROVED,
        id: "4",
        timeOfVote: "2022-01-01T02:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const votesHistoryTimeline: IFetchedPullRequestVotesTimeline[] = [
      {
        id: "1",
        author: "author1",
        timeOfVote: "2022-01-01T01:00:00Z",
        vote: VOTES.APPROVED,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "4",
        author: "author4",
        timeOfVote: "2022-01-01T02:00:00Z",
        vote: VOTES.APPROVED,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "3",
        author: "author3",
        timeOfVote: "2022-01-01T03:00:00Z",
        vote: VOTES.WAIT_FOR_AUTHOR,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime(creationDate, reviewers, votesHistoryTimeline, new Map());

    const expectedApprovalTime = 2 * 60 * 60;

    expect(result).toBe(expectedApprovalTime);
  });

  it("should return the time difference between the creation date and the latest non-required reviewer when required reviewer is not available in votes history timeline (approved with suggestions)", () => {
    const creationDate = "2022-01-01T00:00:00Z";

    const reviewers: IFetchedPullRequestVotesTimeline[] = [
      {
        author: "author1",
        isRequired: false,
        vote: VOTES.APPROVED,
        id: "1",
        timeOfVote: "2022-01-01T01:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author2",
        isRequired: true,
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        id: "2",
        timeOfVote: null,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author3",
        isRequired: false,
        vote: VOTES.WAIT_FOR_AUTHOR,
        id: "3",
        timeOfVote: "2022-01-01T03:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author4",
        isRequired: false,
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        id: "4",
        timeOfVote: "2022-01-01T02:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const votesHistoryTimeline: IFetchedPullRequestVotesTimeline[] = [
      {
        id: "1",
        author: "author1",
        timeOfVote: "2022-01-01T01:00:00Z",
        vote: VOTES.APPROVED,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "4",
        author: "author4",
        timeOfVote: "2022-01-01T02:00:00Z",
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "3",
        author: "author3",
        timeOfVote: "2022-01-01T03:00:00Z",
        vote: VOTES.WAIT_FOR_AUTHOR,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime(creationDate, reviewers, votesHistoryTimeline, new Map());

    const expectedApprovalTime = 2 * 60 * 60;

    expect(result).toBe(expectedApprovalTime);
  });

  it("should return the time difference between the creation date and the latest non-required reviewer when required reviewer (approved) is not available in votes history timeline (approved with suggestions)", () => {
    const creationDate = "2022-01-01T00:00:00Z";

    const reviewers: IFetchedPullRequestVotesTimeline[] = [
      {
        author: "author1",
        isRequired: false,
        vote: VOTES.APPROVED,
        id: "1",
        timeOfVote: "2022-01-01T01:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author2",
        isRequired: true,
        vote: VOTES.APPROVED,
        id: "2",
        timeOfVote: null,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author3",
        isRequired: false,
        vote: VOTES.WAIT_FOR_AUTHOR,
        id: "3",
        timeOfVote: "2022-01-01T03:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author4",
        isRequired: false,
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        id: "4",
        timeOfVote: "2022-01-01T02:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const votesHistoryTimeline: IFetchedPullRequestVotesTimeline[] = [
      {
        id: "1",
        author: "author1",
        timeOfVote: "2022-01-01T01:00:00Z",
        vote: VOTES.APPROVED,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "4",
        author: "author4",
        timeOfVote: "2022-01-01T02:00:00Z",
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "3",
        author: "author3",
        timeOfVote: "2022-01-01T03:00:00Z",
        vote: VOTES.WAIT_FOR_AUTHOR,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime(creationDate, reviewers, votesHistoryTimeline, new Map());

    const expectedApprovalTime = 2 * 60 * 60;

    expect(result).toBe(expectedApprovalTime);
  });

  it("should return null if no selected reviewers are approved (no vote)", () => {
    const creationDate = "2022-01-01T00:00:00Z";
    const reviewers: IFetchedPullRequestVotesTimeline[] = [
      {
        author: "author1",
        isRequired: true,
        vote: VOTES.NO_VOTE,
        id: "1",
        timeOfVote: null,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author2",
        isRequired: false,
        vote: VOTES.NO_VOTE,
        id: "2",
        timeOfVote: null,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];
    const selectedReviewers = new Map<string, boolean>([
      ["1", true],
      ["2", true],
    ]);

    const result = TimeMetrics.getPullRequestApprovalTime(creationDate, reviewers, [], selectedReviewers);

    expect(result).toBeNull();
  });

  it("should return null if no selected reviewers are approved (no vote)", () => {
    const creationDate = "2022-01-01T00:00:00Z";
    const reviewers: IFetchedPullRequestVotesTimeline[] = [
      {
        author: "author1",
        isRequired: true,
        vote: VOTES.WAIT_FOR_AUTHOR,
        id: "1",
        timeOfVote: "2022-01-01T01:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author2",
        isRequired: false,
        vote: VOTES.WAIT_FOR_AUTHOR,
        id: "2",
        timeOfVote: "2022-01-01T02:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const votesHistoryTimeline: IFetchedPullRequestVotesTimeline[] = [
      {
        id: "1",
        author: "author1",
        timeOfVote: "2022-01-01T01:00:00Z",
        vote: VOTES.WAIT_FOR_AUTHOR,
        isRequired: true,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "2",
        author: "author2",
        timeOfVote: "2022-01-01T02:00:00Z",
        vote: VOTES.WAIT_FOR_AUTHOR,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const selectedReviewers = new Map<string, boolean>([
      ["1", true],
      ["2", true],
    ]);

    const result = TimeMetrics.getPullRequestApprovalTime(
      creationDate,
      reviewers,
      votesHistoryTimeline,
      selectedReviewers,
    );

    expect(result).toBeNull();
  });

  it("should return time difference between creation date and latest reviewer approval time even other selected reviewer not approved (non required, approved with suggestions)", () => {
    const creationDate = "2022-01-01T00:00:00Z";
    const reviewers: IFetchedPullRequestVotesTimeline[] = [
      {
        author: "author1",
        isRequired: true,
        vote: VOTES.WAIT_FOR_AUTHOR,
        id: "1",
        timeOfVote: "2022-01-01T01:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author2",
        isRequired: false,
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        id: "2",
        timeOfVote: "2022-01-01T02:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const votesHistoryTimeline: IFetchedPullRequestVotesTimeline[] = [
      {
        id: "1",
        author: "author1",
        timeOfVote: "2022-01-01T01:00:00Z",
        vote: VOTES.WAIT_FOR_AUTHOR,
        isRequired: true,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "2",
        author: "author2",
        timeOfVote: "2022-01-01T02:00:00Z",
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const selectedReviewers = new Map<string, boolean>([
      ["1", true],
      ["2", true],
    ]);

    const result = TimeMetrics.getPullRequestApprovalTime(
      creationDate,
      reviewers,
      votesHistoryTimeline,
      selectedReviewers,
    );

    const expectedApprovalTime = 2 * 60 * 60;

    expect(result).toBe(expectedApprovalTime);
  });

  it("should return time difference between creation date and latest reviewer approval time both selected reviewers are approved (non required, approved)", () => {
    const creationDate = "2022-01-01T00:00:00Z";
    const reviewers: IFetchedPullRequestVotesTimeline[] = [
      {
        author: "author1",
        isRequired: true,
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        id: "1",
        timeOfVote: "2022-01-01T01:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author2",
        isRequired: false,
        vote: VOTES.APPROVED,
        id: "2",
        timeOfVote: "2022-01-01T02:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const votesHistoryTimeline: IFetchedPullRequestVotesTimeline[] = [
      {
        id: "1",
        author: "author1",
        timeOfVote: "2022-01-01T01:00:00Z",
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        isRequired: true,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "2",
        author: "author2",
        timeOfVote: "2022-01-01T02:00:00Z",
        vote: VOTES.APPROVED,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const selectedReviewers = new Map<string, boolean>([
      ["1", true],
      ["2", true],
    ]);

    const result = TimeMetrics.getPullRequestApprovalTime(
      creationDate,
      reviewers,
      votesHistoryTimeline,
      selectedReviewers,
    );

    const expectedApprovalTime = 2 * 60 * 60;

    expect(result).toBe(expectedApprovalTime);
  });

  it("should return time difference between creation date and latest reviewer approval time even other selected reviewer not approved (required, approved with suggestions)", () => {
    const creationDate = "2022-01-01T00:00:00Z";
    const reviewers: IFetchedPullRequestVotesTimeline[] = [
      {
        author: "author1",
        isRequired: false,
        vote: VOTES.WAIT_FOR_AUTHOR,
        id: "1",
        timeOfVote: "2022-01-01T01:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author2",
        isRequired: true,
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        id: "2",
        timeOfVote: "2022-01-01T02:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const votesHistoryTimeline: IFetchedPullRequestVotesTimeline[] = [
      {
        id: "1",
        author: "author1",
        timeOfVote: "2022-01-01T01:00:00Z",
        vote: VOTES.WAIT_FOR_AUTHOR,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "2",
        author: "author2",
        timeOfVote: "2022-01-01T02:00:00Z",
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        isRequired: true,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const selectedReviewers = new Map<string, boolean>([
      ["1", true],
      ["2", true],
    ]);

    const result = TimeMetrics.getPullRequestApprovalTime(
      creationDate,
      reviewers,
      votesHistoryTimeline,
      selectedReviewers,
    );

    const expectedApprovalTime = 2 * 60 * 60;

    expect(result).toBe(expectedApprovalTime);
  });

  it("should return time difference between creation date and latest reviewer approval time both selected reviewers are approved (required, approved)", () => {
    const creationDate = "2022-01-01T00:00:00Z";
    const reviewers: IFetchedPullRequestVotesTimeline[] = [
      {
        author: "author1",
        isRequired: false,
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        id: "1",
        timeOfVote: "2022-01-01T01:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author2",
        isRequired: true,
        vote: VOTES.APPROVED,
        id: "2",
        timeOfVote: "2022-01-01T02:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const votesHistoryTimeline: IFetchedPullRequestVotesTimeline[] = [
      {
        id: "1",
        author: "author1",
        timeOfVote: "2022-01-01T01:00:00Z",
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "2",
        author: "author2",
        timeOfVote: "2022-01-01T02:00:00Z",
        vote: VOTES.APPROVED,
        isRequired: true,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const selectedReviewers = new Map<string, boolean>([
      ["1", true],
      ["2", true],
    ]);

    const result = TimeMetrics.getPullRequestApprovalTime(
      creationDate,
      reviewers,
      votesHistoryTimeline,
      selectedReviewers,
    );

    const expectedApprovalTime = 2 * 60 * 60;

    expect(result).toBe(expectedApprovalTime);
  });

  it("should return time difference between creation date and latest reviewer approval time (time difference more than 3 days)", () => {
    const creationDate = "2022-01-01T00:00:00Z";
    const reviewers: IFetchedPullRequestVotesTimeline[] = [
      {
        author: "author1",
        isRequired: false,
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        id: "1",
        timeOfVote: "2022-01-01T01:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author2",
        isRequired: true,
        vote: VOTES.APPROVED,
        id: "2",
        timeOfVote: "2022-01-01T02:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const votesHistoryTimeline: IFetchedPullRequestVotesTimeline[] = [
      {
        id: "1",
        author: "author1",
        timeOfVote: "2022-01-01T01:00:00Z",
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        isRequired: false,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "2",
        author: "author2",
        timeOfVote: "2022-01-05T00:00:00Z",
        vote: VOTES.APPROVED,
        isRequired: true,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const selectedReviewers = new Map<string, boolean>([
      ["1", true],
      ["2", true],
    ]);

    const result = TimeMetrics.getPullRequestApprovalTime(
      creationDate,
      reviewers,
      votesHistoryTimeline,
      selectedReviewers,
    );

    const expectedApprovalTime = 3 * 24 * 60 * 60;

    expect(result).toBe(expectedApprovalTime);
  });

  it("should return the time difference between the creation date and the latest required reviewer approval time (no selected reviewers, so all required reviewers should approve)", () => {
    const creationDate = "2022-01-01T00:00:00Z";

    const reviewers: IFetchedPullRequestVotesTimeline[] = [
      {
        author: "author1",
        isRequired: true,
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        id: "1",
        timeOfVote: "2022-01-01T01:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        author: "author2",
        isRequired: true,
        vote: VOTES.APPROVED,
        id: "2",
        timeOfVote: "2022-01-01T02:00:00Z",
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const votesHistoryTimeline: IFetchedPullRequestVotesTimeline[] = [
      {
        id: "1",
        author: "author1",
        timeOfVote: "2022-01-01T01:00:00Z",
        vote: VOTES.APPROVED_WITH_SUGGESTIONS,
        isRequired: true,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
      {
        id: "2",
        author: "author2",
        timeOfVote: "2022-01-01T02:00:00Z",
        vote: VOTES.APPROVED,
        isRequired: true,
        reviewerAddedTime: "2022-01-01T00:00:00Z",
      },
    ];

    const result = TimeMetrics.getPullRequestApprovalTime(creationDate, reviewers, votesHistoryTimeline, new Map());

    const expectedApprovalTime = 2 * 60 * 60;

    expect(result).toBe(expectedApprovalTime);
  });
});
