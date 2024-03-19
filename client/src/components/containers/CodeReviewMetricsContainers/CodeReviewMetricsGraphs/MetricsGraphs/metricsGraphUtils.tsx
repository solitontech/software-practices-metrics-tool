import { IFetchedCodeReviewPullRequest } from "src/services/api/api";

import { ITimeMetricsGraph } from "./TimeMetricsGraph/timeMetricsGraphInterfaces";

export const getGraphObject = (
  pullRequests: IFetchedCodeReviewPullRequest[],
  key: keyof IFetchedCodeReviewPullRequest,
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
