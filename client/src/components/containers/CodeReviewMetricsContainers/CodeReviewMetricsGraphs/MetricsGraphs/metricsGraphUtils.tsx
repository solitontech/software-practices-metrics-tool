import { ITimeMetricsGraph } from "./TimeMetricsGraph/timeMetricsGraphInterfaces";
import { IFetchersCodeReviewPullRequest } from "../../../../../fetchers";

export const getGraphObject = (
  pullRequests: IFetchersCodeReviewPullRequest[],
  key: keyof IFetchersCodeReviewPullRequest,
  metricType: string,
): ITimeMetricsGraph => {
  const filteredPullRequests = pullRequests.filter((pullRequest) => pullRequest[key]);

  return {
    pullRequests: filteredPullRequests.map((pullRequest) => ({
      pullRequestId: pullRequest.id,
      metricsTime: Number(pullRequest[key]) ?? 0,
    })),
    metricsName: metricType,
  };
};
