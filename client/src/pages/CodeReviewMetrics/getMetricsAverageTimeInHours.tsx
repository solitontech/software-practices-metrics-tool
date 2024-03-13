import { SECONDS_IN_ONE_HOUR, NOT_AVAILABLE } from "src/constants";
import { IFetchedCodeReviewPullRequest } from "src/fetchers";

export const getMetricsAverageTimeInHours = (
  pullRequests: IFetchedCodeReviewPullRequest[],
  metrics: keyof IFetchedCodeReviewPullRequest,
): string | number => {
  if (!pullRequests) return NOT_AVAILABLE;

  const metricsList = pullRequests.map((pullRequest) => Number(pullRequest[metrics]) ?? 0);

  const filteredMetricsList = metricsList.filter((metrics) => metrics);

  if (!filteredMetricsList.length) return NOT_AVAILABLE;

  const totalMetricsTimeInSeconds = filteredMetricsList.reduce((totalTime, metricsTime) => totalTime + metricsTime, 0);

  const totalPRs = filteredMetricsList.length;
  const totalMetricsTimeInHours = totalMetricsTimeInSeconds / SECONDS_IN_ONE_HOUR;
  const averageMetricsTime = totalMetricsTimeInHours / totalPRs;

  return Number(averageMetricsTime.toPrecision(2));
};
