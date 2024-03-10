import { PullRequestsVotesAnalysis } from "./leastVotesGraphInterface";
import { IFetchersCodeReviewPullRequest } from "../../../../../../fetchers";
import { Vote } from "../../../CodeReviewMetricsTable/interfaces";
import {
  MAX_PULL_REQUEST_IDS_IN_LINE_IN_TOOLTIP,
  MAX_CHARACTERS_IN_LINE_IN_TOOLTIP,
  MAX_PULL_REQUEST_ID_ROWS,
  TAB_SPACE,
  LINE_BREAKER,
  DOUBLE_SPACE,
} from "../../metricsConstants";
import { LeastVotesGraphUtils } from "../../MetricsGraphs/LeastVotesGraph/leastVotesGraphUtils";

const MAX_LINE = MAX_PULL_REQUEST_IDS_IN_LINE_IN_TOOLTIP;
const MAX_CHARACTERS = MAX_CHARACTERS_IN_LINE_IN_TOOLTIP;
const MAX_ROWS = MAX_PULL_REQUEST_ID_ROWS;

export class Graph {
  static pullRequests: IFetchersCodeReviewPullRequest[];
  static startDate: Date;
  static endDate: Date;

  static appendPullRequestId(
    pullRequest: IFetchersCodeReviewPullRequest,
    intervals: PullRequestsVotesAnalysis[],
    index: number,
  ): PullRequestsVotesAnalysis[] {
    const isValidIndex = index >= 0 && index < intervals.length;

    if (!isValidIndex) {
      return intervals;
    }

    const pullRequestLeastVote = LeastVotesGraphUtils.getLeastVote(pullRequest.votesHistory) as Vote;

    const interval = intervals[index];
    const votes = interval.pullRequestIds[pullRequestLeastVote];

    votes.push(pullRequest.id);

    return intervals;
  }

  private static groupPullRequestIds(pullRequestIds: number[]) {
    const [firstPullRequestId] = pullRequestIds;
    const pullRequestIdLength = String(firstPullRequestId).length;
    const pullRequestInLine = Math.ceil(MAX_CHARACTERS / pullRequestIdLength);
    const maxLine = Math.min(pullRequestInLine, MAX_LINE);

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

  static getTooltipText(pullRequestIds: number[], header: string): string {
    const tooltipHeader = `${header} (Total PR's: ${pullRequestIds.length})`;

    const groupPullRequestIds = this.groupPullRequestIds(pullRequestIds);

    const tooltipContent = this.getTooltipContent(tooltipHeader, groupPullRequestIds);

    return tooltipContent;
  }
}
