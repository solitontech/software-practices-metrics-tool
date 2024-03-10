import { IPullRequestsTimeMetrics } from "./timeMetricsGraphInterface";
import { SECONDS_IN_ONE_HOUR } from "../../../../../../constants/timeConstants";
import { IFetchersCodeReviewPullRequest } from "../../../../../../fetchers";
import { formatHoursToDays } from "../../../CodeReviewMetricsTiles/codeReviewMetricsTilesUtils";
import {
  MAX_PULL_REQUEST_IDS_IN_LINE_IN_TOOLTIP,
  MAX_CHARACTERS_IN_LINE_IN_TOOLTIP,
  MAX_PULL_REQUEST_ID_ROWS,
  TAB_SPACE,
  LINE_BREAKER,
  DOUBLE_SPACE,
} from "../../metricsConstants";

const MAX_LINE = MAX_PULL_REQUEST_IDS_IN_LINE_IN_TOOLTIP;
const MAX_CHARACTERS = MAX_CHARACTERS_IN_LINE_IN_TOOLTIP;
const MAX_ROWS = MAX_PULL_REQUEST_ID_ROWS;

export class Graph {
  static pullRequests: IFetchersCodeReviewPullRequest[];
  static startDate: Date;
  static endDate: Date;

  static appendPullRequestId(
    pullRequest: IFetchersCodeReviewPullRequest,
    intervals: IPullRequestsTimeMetrics[],
    index: number,
  ): IPullRequestsTimeMetrics[] {
    const isValidIndex = index >= 0 && index < intervals.length;

    if (!isValidIndex) {
      return intervals;
    }

    const interval = intervals[index];

    const firstReviewTime = pullRequest.firstReviewResponseTimeInSeconds;
    const approvalTime = pullRequest.approvalTimeInSeconds;
    const mergeTime = pullRequest.mergeTimeInSeconds;

    if (firstReviewTime) {
      interval.pullRequestIds.firstReviewResponse.push(pullRequest.id);
      interval.timeInSeconds.firstReviewResponse.push(firstReviewTime);
    }

    if (approvalTime) {
      interval.pullRequestIds.approval.push(pullRequest.id);
      interval.timeInSeconds.approval.push(approvalTime);
    }

    if (mergeTime) {
      interval.pullRequestIds.merge.push(pullRequest.id);
      interval.timeInSeconds.merge.push(mergeTime);
    }

    return intervals;
  }

  private static groupPullRequestIds(pullRequestIds: number[]) {
    const [firstPullRequestId] = pullRequestIds;
    const pullRequestIdLength = String(firstPullRequestId).length;
    const pullRequestInLine = Math.ceil(MAX_CHARACTERS / pullRequestIdLength);
    const maxLine = pullRequestInLine < MAX_LINE ? pullRequestInLine : MAX_LINE;

    let tooltipRows = Math.ceil(pullRequestIds.length / maxLine);

    tooltipRows = Math.min(tooltipRows, MAX_ROWS);

    const tooltipRowsToDisplay = Array.from({ length: tooltipRows }, (_, index) => {
      const startOffset = index * maxLine;
      const endOffset = Math.min(startOffset + maxLine, pullRequestIds.length);

      const currentRow = pullRequestIds.slice(startOffset, endOffset);

      return currentRow.join(TAB_SPACE);
    });

    return TAB_SPACE + tooltipRowsToDisplay.join(TAB_SPACE + LINE_BREAKER + LINE_BREAKER + TAB_SPACE);
  }

  private static getTooltipContent(header: string, tooltipBody: string) {
    return (
      DOUBLE_SPACE +
      `<b>${header}</b>` +
      DOUBLE_SPACE +
      LINE_BREAKER +
      LINE_BREAKER +
      DOUBLE_SPACE +
      "<b>Pull request Id's</b>" +
      LINE_BREAKER +
      LINE_BREAKER +
      tooltipBody +
      TAB_SPACE +
      LINE_BREAKER +
      TAB_SPACE
    );
  }

  static getAverageTimeInHours(timesInSeconds: number[]): number {
    if (!timesInSeconds.length) {
      return 0;
    }

    const totalSeconds = timesInSeconds.reduce((acc, curr) => acc + curr, 0);
    const averageSeconds = totalSeconds / timesInSeconds.length;

    return Number((averageSeconds / SECONDS_IN_ONE_HOUR).toPrecision(2));
  }

  static getTooltipText(pullRequestIds: number[], averageTimeInHours: number, header: string): string {
    const formattedTime = formatHoursToDays(averageTimeInHours);
    const tooltipHeader = `${header} ${formattedTime} (Total PR's: ${pullRequestIds.length})`;

    const groupPullRequestIds = this.groupPullRequestIds(pullRequestIds);

    const tooltipContent = this.getTooltipContent(tooltipHeader, groupPullRequestIds);

    return tooltipContent;
  }
}
