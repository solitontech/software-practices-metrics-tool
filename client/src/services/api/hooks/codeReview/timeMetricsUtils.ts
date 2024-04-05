import { VOTES } from "src/constants/codeReviewMetrics.constants";

import { IFetchedPullRequestVotesTimeline } from "./codeReviewTypes";

export class TimeMetrics {
  static getFirstReviewResponseTime(
    creationDate: string,
    votesHistoryTimeline: IFetchedPullRequestVotesTimeline[],
  ): number | null {
    if (!votesHistoryTimeline.length) {
      return null;
    }

    const [firstVote] = votesHistoryTimeline;
    const { timeOfVote } = firstVote;

    return timeOfVote ? this.#getTimeInSeconds(timeOfVote, creationDate) : null;
  }

  static getPullRequestApprovalTime(
    creationDate: string,
    reviewers: IFetchedPullRequestVotesTimeline[],
    votesHistoryTimeline: IFetchedPullRequestVotesTimeline[],
  ) {
    if (!this.#isRequiredReviewersAssigned(reviewers)) {
      return null;
    }

    if (!this.#isRequiredReviewersApproved(reviewers)) {
      return null;
    }

    const approvalTime = this.#getLatestReviewerApprovalTime(votesHistoryTimeline);

    return approvalTime ? this.#getTimeInSeconds(approvalTime, creationDate) : null;
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

  static #getTimeInSeconds(endDate: string, startDate: string): number | null {
    const differenceInMilliseconds = new Date(endDate).getTime() - new Date(startDate).getTime();
    const milliSecondsInSecond = 1000;

    const timeInSeconds = differenceInMilliseconds / milliSecondsInSecond;

    return Math.round(timeInSeconds);
  }

  static #isReviewerApproved({ vote }: IFetchedPullRequestVotesTimeline) {
    return vote === VOTES.APPROVED || vote === VOTES.APPROVED_WITH_SUGGESTIONS;
  }
}
