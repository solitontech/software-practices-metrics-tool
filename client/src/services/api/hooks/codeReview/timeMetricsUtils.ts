import { PULL_REQUEST_STATUS, VOTES } from "src/constants/constants";
import { getWorkingDaysTimeDifference } from "src/utils/dateUtil";

import { IFetchedPullRequestStatus, IFetchedPullRequestVotesTimeline } from "./codeReviewTypes";

const { COMPLETED } = PULL_REQUEST_STATUS;

export class TimeMetrics {
  static getFirstReviewResponseTime(votesHistoryTimeline: IFetchedPullRequestVotesTimeline[]): number | null {
    if (!votesHistoryTimeline.length) {
      return null;
    }

    const [firstVote] = votesHistoryTimeline;
    const { timeOfVote, reviewerAddedTime } = firstVote;

    return timeOfVote && reviewerAddedTime ? getWorkingDaysTimeDifference(timeOfVote, reviewerAddedTime) : null;
  }

  static getPullRequestApprovalTime(
    creationDate: string,
    reviewers: IFetchedPullRequestVotesTimeline[],
    votesHistoryTimeline: IFetchedPullRequestVotesTimeline[],
    selectedReviewers: Map<string, boolean>,
  ) {
    if (selectedReviewers.size) {
      return this.#getApprovalTimeForSelectedReviewers(creationDate, votesHistoryTimeline);
    }

    if (!this.#isRequiredReviewersAssigned(reviewers)) {
      return null;
    }

    if (!this.#isRequiredReviewersApproved(reviewers)) {
      return null;
    }

    const approvalTime = this.#getLatestReviewerApprovalTime(votesHistoryTimeline);

    return approvalTime ? getWorkingDaysTimeDifference(approvalTime, creationDate) : null;
  }

  static getPullRequestMergeTime(
    status: IFetchedPullRequestStatus,
    creationDate: string | null,
    closedDate: string | null,
  ) {
    if (status !== COMPLETED) {
      return null;
    }

    return getWorkingDaysTimeDifference(closedDate, creationDate);
  }

  static #getApprovalTimeForSelectedReviewers(
    creationDate: string,
    votesHistoryTimeline: IFetchedPullRequestVotesTimeline[],
  ) {
    const reversedTimeline = votesHistoryTimeline.slice().reverse();

    const latestApprovedReviewer = reversedTimeline.find((reviewer) => {
      return this.#isReviewerApproved(reviewer);
    });

    return latestApprovedReviewer?.timeOfVote
      ? getWorkingDaysTimeDifference(latestApprovedReviewer.timeOfVote, creationDate)
      : null;
  }

  static #isRequiredReviewersAssigned(reviewers: IFetchedPullRequestVotesTimeline[]) {
    return reviewers.some((reviewer) => reviewer.isRequired);
  }

  static #isRequiredReviewersApproved(reviewers: IFetchedPullRequestVotesTimeline[]) {
    const requiredReviewers = reviewers.filter(({ isRequired }) => isRequired);

    return requiredReviewers.every((reviewer) => this.#isReviewerApproved(reviewer));
  }

  static #getLatestReviewerApprovalTime(votesHistoryTimeline: IFetchedPullRequestVotesTimeline[]) {
    const reversedTimeline = votesHistoryTimeline.slice().reverse();

    const requiredReviewer = reversedTimeline.find((reviewer) => {
      if (reviewer.isRequired) {
        return this.#isReviewerApproved(reviewer);
      }
    });

    if (requiredReviewer) {
      return requiredReviewer.timeOfVote;
    }

    const reviewer = reversedTimeline.find((reviewer) => {
      return reviewer && this.#isReviewerApproved(reviewer);
    });

    return reviewer ? reviewer.timeOfVote : null;
  }

  static #isReviewerApproved({ vote }: IFetchedPullRequestVotesTimeline) {
    return vote === VOTES.APPROVED || vote === VOTES.APPROVED_WITH_SUGGESTIONS;
  }
}
