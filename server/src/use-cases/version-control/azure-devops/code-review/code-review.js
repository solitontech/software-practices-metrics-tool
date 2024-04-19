import { VoteMetrics } from './vote-metrics/vote-metrics.js';

import { AzureDevopsURL } from '../helpers/helpers.js';

import { CODE_TO_VOTE, AZURE_PROPERTIES } from './constants/constants.js';
import { PullRequestReviewersParser } from './pull-request-reviewer-parser/pull-request-reviewers-parser.js';

const { VOTE_RESULT } = AZURE_PROPERTIES;

export class CodeReview {
  static getCodeReviewMetrics(rawPullRequests) {
    const pullRequests = this.#parsePullRequests(rawPullRequests).map((pullRequest) => {
      return {
        id: pullRequest.id,
        title: `${pullRequest.id} - ${pullRequest.title}`,
        status: pullRequest.status,
        createdBy: pullRequest.createdBy,
        authorId: pullRequest.authorId,
        creationDate: pullRequest.creationDate,
        closedDate: pullRequest.closedDate ?? null,
        votesTimeline: VoteMetrics.getPullRequestVotesTimeline(pullRequest.reviewers, pullRequest.votesHistoryTimeline),
        votesHistoryTimeline: pullRequest.votesHistoryTimeline,
        threads: pullRequest.threads,
        tags: pullRequest.tags,
        url: AzureDevopsURL.getPullRequestURL(pullRequest.id),
      };
    });

    return {
      count: rawPullRequests.length,
      pullRequests,
    };
  }

  static #parsePullRequests(pullRequests) {
    return pullRequests.map((pullRequest) => {
      const reviewersAddedTime = PullRequestReviewersParser.parseReviewersAddedTime(pullRequest.threads);

      const reviewers = this.#parseReviewers(reviewersAddedTime, pullRequest.reviewers, pullRequest.creationDate);

      return {
        id: pullRequest.pullRequestId,
        title: pullRequest.title,
        status: pullRequest.status,
        createdBy: pullRequest.createdBy.displayName,
        authorId: pullRequest.createdBy.id,
        creationDate: pullRequest.creationDate,
        closedDate: pullRequest.closedDate,
        reviewers,
        votesHistoryTimeline: this.#parseVotesTimeline(
          pullRequest.threads,
          reviewers,
          reviewersAddedTime,
          pullRequest.creationDate
        ),
        threads: this.#parseThreads(pullRequest.threads),
        tags: this.#parseTags(pullRequest),
      };
    });
  }

  static #parseReviewers(reviewersAddedTime, rawReviewers, pullRequestCreationDate) {
    const reviewers = {};

    rawReviewers.forEach(({ id, displayName, vote, isRequired }) => {
      reviewers[id] = {
        author: displayName,
        vote: CODE_TO_VOTE.get(vote),
        isRequired: isRequired ?? false,
        reviewerAddedTime: reviewersAddedTime[id] ?? pullRequestCreationDate,
      };
    });

    return reviewers;
  }

  static #parseVotesTimeline(pullRequestThreads, reviewers, reviewersAddedTime, pullRequestCreationDate) {
    const votes = [];

    pullRequestThreads.forEach((thread) => {
      if (!thread.properties) {
        return;
      }

      const vote = thread.properties[VOTE_RESULT];
      const [firstComment] = thread.comments;
      const voteValue = parseInt(vote?.$value);

      if (vote && voteValue) {
        votes.push({
          author: firstComment.author.displayName,
          id: firstComment.author.id,
          timeOfVote: thread.publishedDate,
          vote: CODE_TO_VOTE.get(voteValue),
          isRequired: reviewers[firstComment.author.id]?.isRequired ?? false,
          reviewerAddedTime: reviewersAddedTime[firstComment.author.id] ?? pullRequestCreationDate,
        });
      }
    });

    return votes;
  }

  static #parseThreads(pullRequestThreads) {
    const COMMENT_TYPE = 'text';
    const threads = [];

    pullRequestThreads.forEach((thread) => {
      const [firstComment] = thread.comments;
      const isValidThread = thread.pullRequestThreadContext ?? firstComment?.commentType === COMMENT_TYPE;

      if (thread.isDeleted || !isValidThread) {
        return;
      }

      const comments = thread.comments.reduce((acc, { content, author: { displayName, id }, isDeleted }) => {
        if (isDeleted) {
          return acc;
        }

        acc.push({ content: content ?? '', authorName: displayName, authorId: id });

        return acc;
      }, []);

      threads.push({ comments });
    });

    return threads;
  }

  static #parseTags(pullRequest) {
    if (!pullRequest.labels) {
      return [];
    }

    return pullRequest.labels.map(({ name }) => name);
  }
}
