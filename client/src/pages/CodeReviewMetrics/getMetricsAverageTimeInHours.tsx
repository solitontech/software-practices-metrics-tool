import { IPullRequestList } from "../../components/containers/CodeReviewMetricsContainers/CodeReviewMetricsTable/interfaces.tsx";
import { NOT_AVAILABLE } from "../../constants/commonConstants.ts";
import { SECONDS_IN_ONE_HOUR } from "../../constants/timeConstants.ts";

export const getMetricsAverageTimeInHours = (
  pullRequests: IPullRequestList[],
  metrics: keyof IPullRequestList,
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
