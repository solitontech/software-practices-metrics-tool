import { TimeMetrics } from './time-metrics.js';
import { VotesCommentsMetrics } from './votes-comments-metrics.js';

import { AzureDevopsURL } from '../helpers/index.js';

import { CODE_TO_VOTE, COMMENT_TYPE } from './constants.js';

const { STRING } = COMMENT_TYPE;

export class CodeReview {
  static voteResult = 'CodeReviewVoteResult';

  static getCodeReviewMetrics(rawPullRequests) {
    const codeReviewMetrics = {
      count: rawPullRequests.length,
      pullRequests: [],
    };

    const pullRequests = this.parsePullRequests(rawPullRequests);

    codeReviewMetrics.pullRequests = pullRequests.map((pullRequest) => {
      const reviewers = Object.values(pullRequest.reviewers);
      const isRequiredReviewers = this.isRequiredReviewersAssigned(reviewers);

      return {
        id: pullRequest.id,
        title: `${pullRequest.id} - ${pullRequest.title}`,
        status: pullRequest.status,
        createdBy: pullRequest.createdBy,
        authorId: pullRequest.authorId,
        isRequiredReviewers: isRequiredReviewers,
        creationDate: pullRequest.creationDate,
        closedDate: pullRequest.closedDate ?? null,
        votes: VotesCommentsMetrics.getPullRequestVotes(reviewers),
        votesTimeline: VotesCommentsMetrics.getPullRequestVotesTimeline(
          pullRequest.reviewers,
          pullRequest.votesHistoryTimeline
        ),
        votesHistory: VotesCommentsMetrics.getPullRequestVotesHistory(pullRequest.votesHistoryTimeline),
        votesHistoryTimeline: pullRequest.votesHistoryTimeline,
        comments: VotesCommentsMetrics.getPullRequestComments(pullRequest.threads),
        reviewerComments: VotesCommentsMetrics.getPullRequestReviewerComments(pullRequest.threads),
        tags: pullRequest.tags,
        firstReviewResponseTimeInSeconds: TimeMetrics.calculateAndGetFirstReviewResponseTime(pullRequest),
        approvalTimeInSeconds: TimeMetrics.calculateAndGetPullRequestApprovalTime(isRequiredReviewers, pullRequest),
        mergeTimeInSeconds: TimeMetrics.calculateAndGetPullRequestMergeTime(pullRequest),
        url: AzureDevopsURL.getPullRequestURL(pullRequest.id),
      };
    });

    return codeReviewMetrics;
  }

  static parsePullRequests(pullRequests) {
    return pullRequests.map((pullRequest) => {
      return {
        id: pullRequest.pullRequestId,
        title: pullRequest.title,
        status: pullRequest.status,
        createdBy: pullRequest.createdBy.displayName,
        authorId: pullRequest.createdBy.id,
        creationDate: pullRequest.creationDate,
        closedDate: pullRequest.closedDate,
        reviewers: this.parseReviewers(pullRequest.reviewers),
        votesHistoryTimeline: this.parseVotesTimeline(pullRequest.threads),
        threads: this.parseThreads(pullRequest.threads),
        tags: this.parseTags(pullRequest),
      };
    });
  }

  static parseReviewers(rawReviewers) {
    const reviewers = {};

    rawReviewers.forEach((reviewer) => {
      reviewers[reviewer.id] = {
        author: reviewer.displayName,
        vote: CODE_TO_VOTE.get(reviewer.vote),
        isRequired: reviewer.isRequired ?? false,
      };
    });

    return reviewers;
  }

  static parseVotesTimeline(pullRequestThreads) {
    const votes = [];

    pullRequestThreads.forEach((thread) => {
      if (!thread.properties) {
        return;
      }

      const vote = thread.properties[this.voteResult];
      const [firstComment] = thread.comments;
      const isNoVote = (vote) => {
        return !parseInt(vote.$value);
      };

      if (vote && !isNoVote(vote)) {
        votes.push({
          author: firstComment.author.displayName,
          id: firstComment.author.id,
          timeOfVote: thread.publishedDate,
          vote: CODE_TO_VOTE.get(parseInt(vote.$value)),
        });
      }
    });

    return votes;
  }

  static parseThreads(pullRequestThreads) {
    const threads = [];

    pullRequestThreads.forEach((thread) => {
      const [firstComment] = thread.comments;
      const isValidThread = thread.pullRequestThreadContext ?? firstComment?.commentType === STRING;

      if (thread.isDeleted || !isValidThread) {
        return;
      }

      const comments = thread.comments.map(({ content, author: { displayName, id } }) => {
        return { content: content ?? '', authorName: displayName, authorId: id };
      });

      threads.push({ comments });
    });

    return threads;
  }

  static isRequiredReviewersAssigned(reviewers) {
    return reviewers.some((reviewer) => reviewer.isRequired);
  }

  static parseTags(pullRequest) {
    if (!pullRequest.labels) {
      return [];
    }

    return pullRequest.labels.map((label) => {
      return label.name;
    });
  }
}
