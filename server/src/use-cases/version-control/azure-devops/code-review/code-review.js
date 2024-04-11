import { TimeMetrics } from './time-metrics/time-metrics.js';
import { VoteMetrics } from './vote-metrics/vote-metrics.js';

import { AzureDevopsURL } from '../helpers/helpers.js';

import { CODE_TO_VOTE } from './constants/constants.js';

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
        mergeTimeInSeconds: TimeMetrics.getPullRequestMergeTime(pullRequest),
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
      const reviewers = this.#parseReviewers(pullRequest.threads, pullRequest.reviewers, pullRequest.creationDate);

      return {
        id: pullRequest.pullRequestId,
        title: pullRequest.title,
        status: pullRequest.status,
        createdBy: pullRequest.createdBy.displayName,
        authorId: pullRequest.createdBy.id,
        creationDate: pullRequest.creationDate,
        closedDate: pullRequest.closedDate,
        reviewers,
        votesHistoryTimeline: this.#parseVotesTimeline(pullRequest.threads, reviewers, pullRequest.creationDate),
        threads: this.#parseThreads(pullRequest.threads),
        tags: this.#parseTags(pullRequest),
      };
    });
  }

  static #parseReviewers(pullRequestThreads, rawReviewers, pullRequestCreationDate) {
    const reviewers = {};

    const reviewersAddedTime = this.#parseReviewersAddedTime(pullRequestThreads);

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

  static #parseReviewersAddedTime(pullRequestThreads) {
    const reviewersAddedTime = {};

    pullRequestThreads.forEach((thread) => {
      if (!thread.properties || !thread.identities) {
        return;
      }

      const policyAddedReviewers = thread.properties['CodeReviewRequiredReviewerExampleReviewerIdentities'];
      const addedReviewer = thread.properties['CodeReviewReviewersUpdatedAddedIdentity'];

      if (addedReviewer) {
        const identityIndex = addedReviewer.$value;
        const reviewerIdentity = thread.identities[identityIndex];

        reviewersAddedTime[reviewerIdentity.id] = thread.publishedDate;
      }

      if (policyAddedReviewers) {
        policyAddedReviewers.$value.match(/\d+/g).forEach((identityIndex) => {
          const reviewerIdentity = thread.identities[identityIndex];

          reviewersAddedTime[reviewerIdentity.id] = thread.publishedDate;
        });
      }
    });

    return reviewersAddedTime;
  }

  static #parseVotesTimeline(pullRequestThreads, reviewers, pullRequestCreationDate) {
    const voteResult = 'CodeReviewVoteResult';
    const votes = [];

    pullRequestThreads.forEach((thread) => {
      if (!thread.properties) {
        return;
      }

      const vote = thread.properties[voteResult];
      const [firstComment] = thread.comments;
      const voteValue = parseInt(vote?.$value);

      if (vote && voteValue) {
        votes.push({
          author: firstComment.author.displayName,
          id: firstComment.author.id,
          timeOfVote: thread.publishedDate,
          vote: CODE_TO_VOTE.get(voteValue),
          isRequired: reviewers[firstComment.author.id]?.isRequired ?? false,
          reviewerAddedTime: reviewers[firstComment.author.id]?.reviewerAddedTime ?? pullRequestCreationDate,
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
