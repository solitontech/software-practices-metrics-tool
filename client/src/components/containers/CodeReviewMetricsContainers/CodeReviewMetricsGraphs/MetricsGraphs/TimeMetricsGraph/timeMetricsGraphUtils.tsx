import { SECONDS_IN_ONE_HOUR } from "src/constants/constants";

import { ITimeMetricsPullRequest } from "./timeMetricsGraphInterfaces";
import {
  MAX_PULL_REQUEST_IDS_IN_LINE_IN_TOOLTIP,
  MAX_CHARACTERS_IN_LINE_IN_TOOLTIP,
  MAX_PULL_REQUEST_ID_ROWS,
  DOUBLE_SPACE,
  LINE_BREAKER,
  TAB_SPACE,
} from "../../metricsConstants";

const MAX_CHARACTERS = MAX_CHARACTERS_IN_LINE_IN_TOOLTIP;

export class TimeMetricsUtils {
  static maxLine = MAX_PULL_REQUEST_IDS_IN_LINE_IN_TOOLTIP;
  static maxIds;

  static {
    this.maxIds = MAX_PULL_REQUEST_ID_ROWS * this.maxLine;
  }

  static setMaxLineAndIds(pullRequestId: number): void {
    const pullRequestIdLength = String(pullRequestId).length;
    const pullRequestInLine = Math.ceil(MAX_CHARACTERS / pullRequestIdLength);

    this.maxLine = Math.min(pullRequestInLine, this.maxLine);
    this.maxIds = this.maxLine * MAX_PULL_REQUEST_ID_ROWS;
  }

  static getPullRequestsRoundedTime(
    pullRequests: ITimeMetricsPullRequest[],
    hourScale: number,
    maximumHours: number,
  ): ITimeMetricsPullRequest[] {
    return pullRequests.map((pullRequest) => ({
      ...pullRequest,
      metricsTime: Math.min(
        Math.floor(pullRequest.metricsTime / (SECONDS_IN_ONE_HOUR * hourScale)) * hourScale,
        maximumHours,
      ),
    }));
  }

  static getPullRequestGroupedData(metricsTimeList: number[], hourScale: number, maximumHours: number) {
    const groupedMetricsTimeArray = Array.from({ length: Math.floor(maximumHours / hourScale) + 1 }, (_, index) => ({
      [index * hourScale]: 0,
    }));

    const groupedMetricsTimeRecord = groupedMetricsTimeArray.reduce(
      (groupedMetricsTimeRecord, metricsTimeRecord) => ({
        ...groupedMetricsTimeRecord,
        ...metricsTimeRecord,
      }),
      {},
    );

    metricsTimeList.forEach((metricsTime) => {
      groupedMetricsTimeRecord[metricsTime]++;
    });

    return groupedMetricsTimeRecord;
  }

  static getGraphTracesText(pullRequestGroupedCount: Record<number, number>) {
    const graphTracesText = Object.values(pullRequestGroupedCount).map((value) => (value ? String(value) : ""));

    return this.removeLeadingEmptyStrings(graphTracesText);
  }

  static getNextMetricsTime(metricsTimesList: string[], index: number) {
    return metricsTimesList[++index];
  }

  static isEndOfList(metricsTimesList: string[], index: number) {
    return index === metricsTimesList.length - 1;
  }

  static getTooltipHeader(index: number, currentMetricsTime: number, metricsTimesList: string[], metricsName: string) {
    let toolTipText = `Pull Requests with ${metricsName} time `;

    if (!index) {
      toolTipText += `less than ${this.getNextMetricsTime(metricsTimesList, index)} hours`;
    } else if (this.isEndOfList(metricsTimesList, index)) {
      toolTipText += `greater than ${currentMetricsTime} hours`;
    } else {
      toolTipText += `between ${currentMetricsTime} hours to ${this.getNextMetricsTime(metricsTimesList, index)} hours`;
    }

    return toolTipText;
  }

  static getToolTipContent(noOfPullRequests: number, pullRequestsTextList: string[], header: string) {
    const toolTipText =
      DOUBLE_SPACE +
      `<b>${header} (Total PR's: ${noOfPullRequests})</b>` +
      DOUBLE_SPACE +
      LINE_BREAKER +
      LINE_BREAKER +
      DOUBLE_SPACE +
      "<b>Pull request Id's</b>" +
      pullRequestsTextList.join(TAB_SPACE) +
      TAB_SPACE +
      LINE_BREAKER +
      TAB_SPACE;

    return toolTipText;
  }

  static isEndOfLine(index: number) {
    return !(index % this.maxLine);
  }

  static getTooltipRows(pullRequestsTextList: ITimeMetricsPullRequest[]) {
    return pullRequestsTextList.slice(0, this.maxIds).map(({ pullRequestId }, index) => {
      if (this.isEndOfLine(index)) {
        return LINE_BREAKER + LINE_BREAKER + TAB_SPACE + pullRequestId;
      }

      return `${pullRequestId}`;
    });
  }

  static getGraphHoverText(
    pullRequestRoundedTimeList: ITimeMetricsPullRequest[],
    pullRequestGroupedCount: Record<number, number>,
    metricsName: string,
  ) {
    if (!pullRequestRoundedTimeList.length) return [];

    const [firstPullRequest] = pullRequestRoundedTimeList;
    this.setMaxLineAndIds(firstPullRequest.pullRequestId);

    const metricsTimesList = Object.keys(pullRequestGroupedCount);

    const graphHoverTexts = metricsTimesList.map((key, index) => {
      const currentTime = parseInt(key);

      const filteredPullRequests = pullRequestRoundedTimeList.filter(({ metricsTime }) => {
        return metricsTime === currentTime;
      });

      const noOfPullRequests = filteredPullRequests.length;

      if (!noOfPullRequests) {
        return "";
      }

      const toolTipRows = this.getTooltipRows(filteredPullRequests);

      const tooltipHeader = this.getTooltipHeader(index, currentTime, metricsTimesList, metricsName);

      const text = this.getToolTipContent(noOfPullRequests, toolTipRows, tooltipHeader);

      return text;
    });

    return this.removeLeadingEmptyStrings(graphHoverTexts);
  }

  static getTracesColor = (traceColor: string, noOfTraces: Record<number, number>) => {
    const addRedColor = (traceColor: string[]) => {
      traceColors.pop();
      traceColors.push("red");

      return traceColor;
    };
    const traceColors = Object.keys(noOfTraces).map((key) => {
      if (noOfTraces[parseInt(key)]) {
        return traceColor;
      }
      return "";
    });

    return this.removeLeadingEmptyStrings(addRedColor(traceColors));
  };

  static getGraphAnnotationText(metricsName: string, averageTime: string | number, noOfPullRequests: number) {
    return `${`Average ${metricsName} time for a PR`}: ${
      typeof averageTime == "number" ? `${averageTime} hours` : averageTime
    } (Total PR's: ${noOfPullRequests})`;
  }

  static capitalizeFirstLetter = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  static removeLeadingEmptyStrings = (array: string[]) => {
    const firstNonEmptyIndex = array.findIndex((item) => item !== "");

    return array.slice(firstNonEmptyIndex);
  };
}
