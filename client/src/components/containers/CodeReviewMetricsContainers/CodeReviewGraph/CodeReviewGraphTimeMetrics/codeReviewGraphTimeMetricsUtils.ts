import {
  SECONDS_IN_ONE_HOUR,
  MAX_PULL_REQUEST_IDS_IN_LINE_IN_TOOLTIP,
  MAX_CHARACTERS_IN_LINE_IN_TOOLTIP,
  MAX_PULL_REQUEST_ID_ROWS,
  DOUBLE_SPACE,
  LINE_BREAKER,
  TAB_SPACE,
} from "src/constants/constants";

import { ICodeReviewGraphTimeMetricsPullRequest } from "./codeReviewGraphTimeMetricsTypes";

export class CodeReviewGraphTimeMetricsUtils {
  static #maxIds;
  static #maxLine = MAX_PULL_REQUEST_IDS_IN_LINE_IN_TOOLTIP;

  static {
    this.#maxIds = MAX_PULL_REQUEST_ID_ROWS * this.#maxLine;
  }

  static #setMaxLineAndIds(pullRequestId: number) {
    const pullRequestIdLength = String(pullRequestId).length;
    const pullRequestInLine = Math.ceil(MAX_CHARACTERS_IN_LINE_IN_TOOLTIP / pullRequestIdLength);

    this.#maxLine = Math.min(pullRequestInLine, this.#maxLine);
    this.#maxIds = this.#maxLine * MAX_PULL_REQUEST_ID_ROWS;
  }

  static #getNextMetricsTime(metricsTimesList: string[], index: number) {
    return metricsTimesList[++index];
  }

  static #isEndOfList(metricsTimesList: string[], index: number) {
    return index === metricsTimesList.length - 1;
  }

  static #getTooltipHeader(index: number, currentMetricsTime: number, metricsTimesList: string[], metricsName: string) {
    const toolTipText = `Pull Requests with ${metricsName} time`;

    if (!index) {
      return `${toolTipText} less than ${this.#getNextMetricsTime(metricsTimesList, index)} hours`;
    }

    if (this.#isEndOfList(metricsTimesList, index)) {
      return `${toolTipText} greater than ${currentMetricsTime} hours`;
    }

    return `${toolTipText} between ${currentMetricsTime} hours to ${this.#getNextMetricsTime(
      metricsTimesList,
      index,
    )} hours`;
  }

  static #getToolTipContent(noOfPullRequests: number, pullRequestsTextList: string[], header: string) {
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

  static #isEndOfLine(index: number) {
    return !(index % this.#maxLine);
  }

  static #getTooltipRows(pullRequestsTextList: ICodeReviewGraphTimeMetricsPullRequest[]) {
    return pullRequestsTextList.slice(0, this.#maxIds).map(({ pullRequestId }, index) => {
      if (this.#isEndOfLine(index)) {
        return LINE_BREAKER + LINE_BREAKER + TAB_SPACE + pullRequestId;
      }

      return `${pullRequestId}`;
    });
  }

  static #removeLeadingEmptyStrings(array: string[]) {
    const firstNonEmptyIndex = array.findIndex((item) => item !== "");

    return array.slice(firstNonEmptyIndex);
  }

  static getPullRequestsRoundedTime(
    pullRequests: ICodeReviewGraphTimeMetricsPullRequest[],
    hourScale: number,
    maximumHours: number,
  ) {
    return pullRequests.map((pullRequest) => ({
      pullRequestId: pullRequest.pullRequestId,
      metricsTime: Math.min(
        Math.floor(pullRequest.metricsTime / (SECONDS_IN_ONE_HOUR * hourScale)) * hourScale,
        maximumHours,
      ),
    }));
  }

  static capitalizeFirstLetter = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  static getPullRequestGroupedData(metricsTimeList: number[], hourScale: number, maximumHours: number) {
    const groupedTime = Array.from({ length: Math.floor(maximumHours / hourScale) + 1 }, (_, index) => ({
      [index * hourScale]: 0,
    }));

    const groupedMetrics = groupedTime.reduce((groupedMetricsTimeRecord, metricsTimeRecord) => {
      return {
        ...groupedMetricsTimeRecord,
        ...metricsTimeRecord,
      };
    }, {});

    metricsTimeList.forEach((time) => {
      groupedMetrics[time]++;
    });

    return groupedMetrics;
  }

  static getGraphTracesText(pullRequestGroupedCount: Record<number, number>) {
    const traceText = Object.values(pullRequestGroupedCount).map((value) => (value ? String(value) : ""));

    return this.#removeLeadingEmptyStrings(traceText);
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

    return this.#removeLeadingEmptyStrings(addRedColor(traceColors));
  };

  static getGraphHoverText(
    pullRequests: ICodeReviewGraphTimeMetricsPullRequest[],
    pullRequestGroupedCount: Record<number, number>,
    metricsName: string,
  ) {
    if (!pullRequests.length) return [];

    const [firstPullRequest] = pullRequests;

    this.#setMaxLineAndIds(firstPullRequest.pullRequestId);

    const metricsTimesList = Object.keys(pullRequestGroupedCount);

    const graphHoverTexts = metricsTimesList.map((key, index) => {
      const currentTime = parseInt(key);

      const filteredPullRequests = pullRequests.filter(({ metricsTime }) => {
        return metricsTime === currentTime;
      });

      const noOfPullRequests = filteredPullRequests.length;

      if (!noOfPullRequests) {
        return "";
      }

      const toolTipRows = this.#getTooltipRows(filteredPullRequests);
      const tooltipHeader = this.#getTooltipHeader(index, currentTime, metricsTimesList, metricsName);
      const text = this.#getToolTipContent(noOfPullRequests, toolTipRows, tooltipHeader);

      return text;
    });

    return this.#removeLeadingEmptyStrings(graphHoverTexts);
  }

  static getGraphAnnotationText(metricsName: string, averageTime: string | number, noOfPullRequests: number) {
    return `${`Average ${metricsName} time for a PR`}: ${
      typeof averageTime == "number" ? `${averageTime} hours` : averageTime
    } (Total PR's: ${noOfPullRequests})`;
  }
}
