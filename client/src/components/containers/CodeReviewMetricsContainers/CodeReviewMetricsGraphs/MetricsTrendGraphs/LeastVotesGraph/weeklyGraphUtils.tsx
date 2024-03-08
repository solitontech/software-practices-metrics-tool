import { PullRequestsVotesAnalysis } from "./leastVotesGraphInterface";
import { Graph } from "./leastVotesGraphUtils";
import {
  Day,
  getFormattedDateText,
} from "../../../../../../utils/formatTimeUtils";
import { IPullRequestList } from "../../../CodeReviewMetricsTable/interfaces";
import {
  DAY,
  ONE_WEEK_IN_MILLISECONDS,
  SIX_DAYS_IN_MILLISECONDS,
} from "../metricsTrendGraphConstants";

export class Weekly extends Graph {
  static numberOfWeeks: number;

  private static getNumberOfWeeks(): number {
    this.startDate.setHours(0, 0, 0, 0); // Set start date to the start of the day
    this.endDate.setHours(23, 59, 59, 999); // Set end date to the end of the day

    const numberOfWeeks = Math.ceil(
      (this.endDate.getTime() - this.startDate.getTime()) /
        ONE_WEEK_IN_MILLISECONDS,
    );

    return numberOfWeeks;
  }

  private static getIntervalText(index: number): string {
    const isLastWeek = index + 1 === this.numberOfWeeks;

    const startDateOfWeek = new Date(
      this.startDate.getTime() + index * ONE_WEEK_IN_MILLISECONDS,
    );

    const endDateOfWeek = isLastWeek
      ? this.endDate
      : new Date(startDateOfWeek.getTime() + SIX_DAYS_IN_MILLISECONDS);

    const formattedStartDate = getFormattedDateText(
      startDateOfWeek,
      DAY.TWO_DIGIT as Day,
    );
    const formattedEndDate = getFormattedDateText(
      endDateOfWeek,
      DAY.TWO_DIGIT as Day,
    );

    return `${formattedStartDate} - ${formattedEndDate}`;
  }

  private static getIntervals(count: number): PullRequestsVotesAnalysis[] {
    const monthIntervals: PullRequestsVotesAnalysis[] = Array.from(
      { length: count },
      (_, index) => {
        const intervalText = this.getIntervalText(index);

        return {
          interval: intervalText,
          pullRequestIds: {
            approved: [],
            approvedWithSuggestions: [],
            noVote: [],
            waitForAuthor: [],
            rejected: [],
          },
        };
      },
    );

    return monthIntervals;
  }

  private static getWeekIndex(creationDate: string) {
    const pullRequestCreationDate = new Date(creationDate);

    const timeDifference =
      pullRequestCreationDate.getTime() - this.startDate.getTime();

    const weekIndex = Math.floor(timeDifference / ONE_WEEK_IN_MILLISECONDS);

    return weekIndex;
  }

  private static getLeastVotes(
    intervals: PullRequestsVotesAnalysis[],
  ): PullRequestsVotesAnalysis[] {
    return this.pullRequests.reduce(
      (intervals: PullRequestsVotesAnalysis[], pullRequest) => {
        const index = this.getWeekIndex(pullRequest.creationDate);

        return this.appendPullRequestId(pullRequest, intervals, index);
      },
      intervals,
    );
  }

  static getWeeklyLeastVotes(
    pullRequests: IPullRequestList[],
    startDate: Date,
    endDate: Date,
  ): PullRequestsVotesAnalysis[] {
    this.pullRequests = pullRequests;
    this.startDate = startDate;
    this.endDate = endDate;
    this.numberOfWeeks = this.getNumberOfWeeks();

    const intervals = this.getIntervals(this.numberOfWeeks);

    return this.getLeastVotes(intervals);
  }
}