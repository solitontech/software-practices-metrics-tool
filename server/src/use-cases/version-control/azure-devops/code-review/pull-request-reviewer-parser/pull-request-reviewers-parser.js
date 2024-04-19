import { AZURE_PROPERTIES } from '../constants/constants.js';

const { POLICY_ADDED_REVIEWERS, ADDED_REVIEWER, VOTE_RESULT } = AZURE_PROPERTIES;

export class PullRequestReviewersParser {
  static parseReviewersAddedTime(pullRequestThreads) {
    const reviewersAddedTime = {};
    const isReviewerVoted = {};

    pullRequestThreads.forEach((thread) => {
      if (!thread.properties || !thread.identities) {
        return;
      }

      this.#getVoteResult(thread, isReviewerVoted);
      this.#handleAddedReviewer(thread, reviewersAddedTime, isReviewerVoted);
      this.#handlePolicyAddedReviewers(thread, reviewersAddedTime, isReviewerVoted);
    });

    return reviewersAddedTime;
  }

  static #getVoteResult(thread, isReviewerVoted) {
    const vote = thread.properties[VOTE_RESULT];

    if (vote) {
      const [firstComment] = thread.comments;

      isReviewerVoted[firstComment.author.id] = true;
    }
  }

  static #handleAddedReviewer(thread, reviewersAddedTime, isReviewerVoted) {
    const reviewer = thread.properties[ADDED_REVIEWER];

    if (reviewer) {
      const identityIndex = reviewer.$value;
      const reviewerIdentity = thread.identities[identityIndex];

      if (!isReviewerVoted[reviewerIdentity.id]) {
        reviewersAddedTime[reviewerIdentity.id] = thread.publishedDate;
      }
    }
  }

  static #handlePolicyAddedReviewers(thread, reviewersAddedTime, isReviewerVoted) {
    const policyAddedReviewers = thread.properties[POLICY_ADDED_REVIEWERS];

    if (policyAddedReviewers) {
      const reviewers = policyAddedReviewers.$value.match(/\d+/g);

      reviewers.forEach((identityIndex) => {
        const reviewerIdentity = thread.identities[identityIndex];

        if (!isReviewerVoted[reviewerIdentity.id]) {
          reviewersAddedTime[reviewerIdentity.id] = thread.publishedDate;
        }
      });
    }
  }
}
