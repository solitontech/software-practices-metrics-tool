import { PULL_REQUEST_STATUS, VOTE } from './constants.js';

const { COMPLETED } = PULL_REQUEST_STATUS;
const { APPROVED, APPROVED_WITH_SUGGESTIONS } = VOTE;

export class TimeMetrics {
  static fractionToFindTime = 1000;

  static calculateAndGetFirstReviewResponseTime({ creationDate, votesHistoryTimeline }) {
    if (!votesHistoryTimeline.length) {
      return null;
    }

    const [firstVote] = votesHistoryTimeline;
    const votePublishedDate = firstVote.timeOfVote;

    return this.calculateAndGetTimeDifference(votePublishedDate, creationDate);
  }

  static calculateAndGetPullRequestApprovalTime(
    isRequiredReviewers,
    { creationDate, reviewers, votesHistoryTimeline }
  ) {
    if (!isRequiredReviewers) {
      return null;
    }

    if (!this.isRequiredReviewersApproved(Object.values(reviewers))) {
      return null;
    }

    const latestReviewerApprovalTime = this.getLatestReviewerApprovalTime(votesHistoryTimeline, reviewers);

    return this.calculateAndGetTimeDifference(latestReviewerApprovalTime, creationDate);
  }

  static isRequiredReviewersApproved(reviewers) {
    return reviewers.some((reviewer) => {
      if (reviewer.isRequired) {
        return this.isReviewerApproved(reviewer);
      }
    });
  }

  static getLatestReviewerApprovalTime(votesHistoryTimeline, reviewers) {
    const reverseTimeline = votesHistoryTimeline.slice().reverse();

    let reviewer = reverseTimeline.find((reviewer) => {
      if (reviewers[reviewer.id]?.isRequired) {
        return this.isReviewerApproved(reviewers[reviewer.id]);
      }
    });

    if (!reviewer) {
      reviewer = reverseTimeline.find((reviewer) => {
        return this.isReviewerApproved(reviewers[reviewer.id]);
      });
    }

    return reviewer.timeOfVote;
  }

  static isReviewerApproved(reviewer) {
    return reviewer.vote === APPROVED || reviewer.vote === APPROVED_WITH_SUGGESTIONS;
  }

  static calculateAndGetPullRequestMergeTime({ status, creationDate, closedDate }) {
    if (status !== COMPLETED) {
      return null;
    }

    return this.calculateAndGetTimeDifference(closedDate, creationDate);
  }

  static calculateAndGetTimeDifference(endDate, startDate) {
    const calculatedTime = (new Date(endDate) - new Date(startDate)) / this.fractionToFindTime;

    return Math.round(calculatedTime);
  }
}
