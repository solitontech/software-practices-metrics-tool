export interface ITimeMetricsPullRequest {
  pullRequestId: number;
  metricsTime: number;
}

export interface ITimeMetricsGraph {
  pullRequests: ITimeMetricsPullRequest[];
  hoursScale?: number;
  maximumHours?: number;
  traceColor?: string;
  metricsName: string;
}

export interface ITimeMetricsGraphOptions {
  xAxisName?: string;
  yAxisName?: string;
  graphTitle?: string;
  graphWidth?: number;
  graphHeight?: number;
  fileNameForImage?: string;
}
