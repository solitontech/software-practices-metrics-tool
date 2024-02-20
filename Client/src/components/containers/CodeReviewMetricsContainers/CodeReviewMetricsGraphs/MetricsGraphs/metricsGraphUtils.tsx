import { ITimeMetricsGraph } from "./TimeMetricsGraph/timeMetricsGraphInterfaces";
import { IPullRequestList } from "../../CodeReviewMetricsTable/interfaces";

export const getGraphObject = (
  pullRequests: IPullRequestList[],
  key: keyof IPullRequestList,
  metricType: string,
): ITimeMetricsGraph => {
  const filteredPullRequests = pullRequests.filter(
    (pullRequest) => pullRequest[key],
  );

  return {
    pullRequests: filteredPullRequests.map((pullRequest) => ({
      pullRequestId: pullRequest.id,
      metricsTime: Number(pullRequest[key]) ?? 0,
    })),
    metricsName: metricType,
  };
};
