import { TimeMetrics } from './time-metrics/time-metrics.js';
import { VoteMetrics } from './vote-metrics/vote-metrics.js';
import { CommentMetrics } from './comment-metrics/comment-metrics.js';

import { AzureDevopsURL } from '../helpers/index.js';

import { CODE_TO_VOTE, COMMENT_TYPE } from './constants/index.js';

export class CodeReview {
  static #parseReviewers(rawReviewers) {
    // TODO: convert to map if ot needed
    const reviewers = {};

    rawReviewers.forEach(({ id, displayName, vote, isRequired }) => {
      reviewers[id] = {
        author: displayName,
        vote: CODE_TO_VOTE.get(vote),
        isRequired: isRequired ?? false,
      };
    });

    return reviewers;
  }

  static #parseVotesTimeline(pullRequestThreads) {
    const votes = [];
    const voteResult = 'CodeReviewVoteResult';

    pullRequestThreads.forEach((thread) => {
      if (!thread.properties) {
        return;
      }

      const vote = thread.properties[voteResult];
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

  static #parseThreads(pullRequestThreads) {
    const threads = [];

    pullRequestThreads.forEach((thread) => {
      const [firstComment] = thread.comments;
      const isValidThread = thread.pullRequestThreadContext ?? firstComment?.commentType === COMMENT_TYPE.STRING;

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

  static #parseTags(pullRequest) {
    if (!pullRequest.labels) {
      return [];
    }

    return pullRequest.labels.map((label) => {
      return label.name;
    });
  }

  static #parsePullRequests(pullRequests) {
    return pullRequests.map((pullRequest) => {
      return {
        id: pullRequest.pullRequestId,
        title: pullRequest.title,
        status: pullRequest.status,
        createdBy: pullRequest.createdBy.displayName,
        authorId: pullRequest.createdBy.id,
        creationDate: pullRequest.creationDate,
        closedDate: pullRequest.closedDate,
        reviewers: this.#parseReviewers(pullRequest.reviewers),
        votesHistoryTimeline: this.#parseVotesTimeline(pullRequest.threads),
        threads: this.#parseThreads(pullRequest.threads),
        tags: this.#parseTags(pullRequest),
      };
    });
  }

  static #isRequiredReviewersAssigned(reviewers) {
    return reviewers.some((reviewer) => reviewer.isRequired);
  }

  static getCodeReviewMetrics(rawPullRequests) {
    const pullRequests = this.#parsePullRequests(rawPullRequests).map((pullRequest) => {
      const reviewers = Object.values(pullRequest.reviewers);
      const isRequiredReviewers = this.#isRequiredReviewersAssigned(reviewers);

      return {
        id: pullRequest.id,
        title: `${pullRequest.id} - ${pullRequest.title}`,
        status: pullRequest.status,
        createdBy: pullRequest.createdBy,
        authorId: pullRequest.authorId,
        isRequiredReviewers: isRequiredReviewers,
        creationDate: pullRequest.creationDate,
        closedDate: pullRequest.closedDate ?? null,
        votes: VoteMetrics.getPullRequestVotes(reviewers),
        votesTimeline: VoteMetrics.getPullRequestVotesTimeline(pullRequest.reviewers, pullRequest.votesHistoryTimeline),
        votesHistory: VoteMetrics.getPullRequestVotesHistory(pullRequest.votesHistoryTimeline),
        votesHistoryTimeline: pullRequest.votesHistoryTimeline,
        comments: CommentMetrics.getPullRequestComments(pullRequest.threads),
        reviewerComments: CommentMetrics.getPullRequestReviewerComments(pullRequest.threads),
        tags: pullRequest.tags,
        firstReviewResponseTimeInSeconds: TimeMetrics.getFirstReviewResponseTime(pullRequest),
        approvalTimeInSeconds: isRequiredReviewers ? TimeMetrics.getPullRequestApprovalTime(pullRequest) : null,
        mergeTimeInSeconds: TimeMetrics.getPullRequestMergeTime(pullRequest),
        url: AzureDevopsURL.getPullRequestURL(pullRequest.id),
      };
    });

    return {
      count: rawPullRequests.length,
      pullRequests,
    };
  }
}
