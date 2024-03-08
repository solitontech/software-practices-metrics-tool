import { IPullRequestsTimeMetrics } from "./timeMetricsGraphInterface";
import { Graph } from "./timeMetricsGraphUtils";
import { Year, getFormattedDateText } from "../../../../../../utils/formatTimeUtils";
import { IPullRequestList } from "../../../CodeReviewMetricsTable/interfaces";
import { DAY, MONTHS_IN_YEAR, YEAR } from "../metricsTrendGraphConstants";

export class Monthly extends Graph {
  private static getNumberOfMonths() {
    const yearDifferenceInMonths = (this.endDate.getFullYear() - this.startDate.getFullYear()) * MONTHS_IN_YEAR;

    const monthsDifference = this.endDate.getMonth() - this.startDate.getMonth() + 1;

    const numberOfMonths = yearDifferenceInMonths + monthsDifference;

    return numberOfMonths;
  }

  private static getIntervalText(index: number): string {
    const currentMonth = this.startDate.getMonth() + index;

    const monthIntervalStartDate = new Date(this.startDate.getFullYear(), currentMonth);

    return getFormattedDateText(monthIntervalStartDate, DAY.UNDEFINED, YEAR.NUMERIC as Year);
  }

  private static getIntervals(count: number): IPullRequestsTimeMetrics[] {
    const monthIntervals: IPullRequestsTimeMetrics[] = Array.from({ length: count }, (_, index) => {
      const intervalText = this.getIntervalText(index);

      return {
        interval: intervalText,
        pullRequestIds: {
          firstReviewResponse: [],
          approval: [],
          merge: [],
        },
        timeInSeconds: {
          firstReviewResponse: [],
          approval: [],
          merge: [],
        },
      };
    });

    return monthIntervals;
  }

  private static getMonthIndex(creationDate: string) {
    const pullRequestCreationDate = new Date(creationDate);

    const yearDifferenceInMonths =
      (pullRequestCreationDate.getFullYear() - this.startDate.getFullYear()) * MONTHS_IN_YEAR;
    const monthsDifference = pullRequestCreationDate.getMonth() - this.startDate.getMonth();
    const monthIndex = yearDifferenceInMonths + monthsDifference;

    return monthIndex;
  }

  private static getLeastVotes(intervals: IPullRequestsTimeMetrics[]): IPullRequestsTimeMetrics[] {
    return this.pullRequests.reduce((intervals: IPullRequestsTimeMetrics[], pullRequest) => {
      const index = this.getMonthIndex(pullRequest.creationDate);

      return this.appendPullRequestId(pullRequest, intervals, index);
    }, intervals);
  }

  static getMonthlyTimeMetrics(
    pullRequests: IPullRequestList[],
    startDate: Date,
    endDate: Date,
  ): IPullRequestsTimeMetrics[] {
    this.pullRequests = pullRequests;
    this.startDate = startDate;
    this.endDate = endDate;

    const numberOfMonths = this.getNumberOfMonths();

    const intervals = this.getIntervals(numberOfMonths);

    return this.getLeastVotes(intervals);
  }
}
