import { PULL_REQUEST_STATUS, VOTE } from '../constants/constants.js';

export class TimeMetrics {
  static getFirstReviewResponseTime({ creationDate, votesHistoryTimeline }) {
    if (!votesHistoryTimeline.length) {
      return null;
    }

    const [firstVote] = votesHistoryTimeline;
    const { timeOfVote } = firstVote;

    return this.#getTimeInSeconds(timeOfVote, creationDate);
  }

  static getPullRequestMergeTime({ status, creationDate, closedDate }) {
    if (status !== PULL_REQUEST_STATUS.COMPLETED) {
      return null;
    }

    return this.#getTimeInSeconds(closedDate, creationDate);
  }

  static getPullRequestApprovalTime({ creationDate, reviewers, votesHistoryTimeline }) {
    if (!this.#isRequiredReviewersApproved(Object.values(reviewers))) {
      return null;
    }

    const approvalTime = this.#getLatestReviewerApprovalTime(votesHistoryTimeline, reviewers);

    return this.#getTimeInSeconds(approvalTime, creationDate);
  }

  static #isRequiredReviewersApproved(reviewers) {
    const requiredReviewers = reviewers.filter(({ isRequired }) => isRequired);

    return requiredReviewers.some((reviewer) => this.#isReviewerApproved(reviewer));
  }

  static #getLatestReviewerApprovalTime(votesHistoryTimeline, reviewers) {
    const reversedTimeline = votesHistoryTimeline.slice().reverse();

    const requiredReviewer = reversedTimeline.find(({ id }) => {
      if (reviewers[id]?.isRequired) {
        return this.#isReviewerApproved(reviewers[id]);
      }
    });

    if (requiredReviewer) {
      return requiredReviewer.timeOfVote;
    }

    const reviewer = reversedTimeline.find(({ id }) => {
      return this.#isReviewerApproved(reviewers[id]);
    });

    return reviewer.timeOfVote;
  }

  static #getTimeInSeconds(endDate, startDate) {
    const differenceInMilliseconds = new Date(endDate) - new Date(startDate);
    const milliSecondsInSecond = 1000;

    const timeInSeconds = differenceInMilliseconds / milliSecondsInSecond;

    return Math.round(timeInSeconds);
  }

  static #isReviewerApproved({ vote }) {
    return vote === VOTE.APPROVED || vote === VOTE.APPROVED_WITH_SUGGESTIONS;
  }
}
