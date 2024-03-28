import { IFetchedCodeReviewPullRequest } from "src/services/api/api";

export class CodeReviewGraphUtils {
  static getGraphObject(
    pullRequests: IFetchedCodeReviewPullRequest[],
    key: keyof IFetchedCodeReviewPullRequest,
    metricType: string,
  ) {
    const filteredItems = pullRequests.filter((item) => item[key]);

    return {
      metricsName: metricType,
      pullRequests: filteredItems.map((item) => ({
        pullRequestId: item.id,
        metricsTime: Number(item[key]) ?? 0,
      })),
    };
  }
}
