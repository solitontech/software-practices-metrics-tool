export interface ICodeReviewGraphTimeMetricsPullRequest {
  pullRequestId: number;
  metricsTime: number;
}

export interface ICodeReviewGraphTimeMetricsGraph {
  pullRequests: ICodeReviewGraphTimeMetricsPullRequest[];
  hoursScale?: number;
  maximumHours?: number;
  traceColor?: string;
  metricsName: string;
}

export interface ICodeReviewGraphTimeMetricsGraphOptions {
  xAxisName?: string;
  yAxisName?: string;
  graphTitle?: string;
  graphWidth?: number;
  graphHeight?: number;
  fileNameForImage?: string;
}
