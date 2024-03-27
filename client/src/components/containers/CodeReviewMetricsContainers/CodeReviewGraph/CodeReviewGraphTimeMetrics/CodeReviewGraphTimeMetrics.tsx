import { HistogramChart } from "src/components/components";
import { TRACE_COLOR } from "src/constants/constants";

import { HOUR_SCALE, MAXIMUM_HOURS } from "./codeReviewGraphTimeMetricsConstants";
import {
  ICodeReviewGraphTimeMetricsGraph,
  ICodeReviewGraphTimeMetricsGraphOptions,
} from "./codeReviewGraphTimeMetricsTypes";
import { CodeReviewGraphTimeMetricsUtils } from "./codeReviewGraphTimeMetricsUtils";

interface ICodeReviewGraphTimeMetricsProps {
  graphObject: ICodeReviewGraphTimeMetricsGraph;
  averageTime: number | string;
  graphOptions?: ICodeReviewGraphTimeMetricsGraphOptions;
}

export const CodeReviewGraphTimeMetrics = ({
  averageTime,
  graphOptions,
  graphObject: {
    pullRequests,
    traceColor = TRACE_COLOR,
    hoursScale = HOUR_SCALE,
    maximumHours = MAXIMUM_HOURS,
    metricsName,
  },
}: ICodeReviewGraphTimeMetricsProps) => {
  const pullRequestList = CodeReviewGraphTimeMetricsUtils.getPullRequestsRoundedTime(
    pullRequests,
    hoursScale,
    maximumHours,
  );

  const metricsRoundedTimes = pullRequestList.map(({ metricsTime }) => {
    return metricsTime;
  });

  const xAxisName = `${CodeReviewGraphTimeMetricsUtils.capitalizeFirstLetter(metricsName)} time in hours`;

  const pullRequestGroupedCount = CodeReviewGraphTimeMetricsUtils.getPullRequestGroupedData(
    metricsRoundedTimes,
    hoursScale,
    maximumHours,
  );

  const binText = CodeReviewGraphTimeMetricsUtils.getGraphTracesText(pullRequestGroupedCount);
  const markerColor = CodeReviewGraphTimeMetricsUtils.getTracesColor(traceColor, pullRequestGroupedCount);

  const hoverText = CodeReviewGraphTimeMetricsUtils.getGraphHoverText(
    pullRequestList,
    pullRequestGroupedCount,
    metricsName,
  );

  const graphAnnotationText = CodeReviewGraphTimeMetricsUtils.getGraphAnnotationText(
    metricsName,
    averageTime,
    pullRequests.length,
  );

  return (
    <HistogramChart
      graph={{
        plot: {
          xValues: metricsRoundedTimes,
          startValue: 0,
          endValue: maximumHours + hoursScale,
          binSize: hoursScale,
          binText,
          markerColor,
          hoverText,
        },
        ...graphOptions,
        xAxisName,
        yAxisName: "Pull Requests count",
        graphTitle: `Pull Requests ${metricsName} time`,
        graphAnnotationText,
      }}
    />
  );
};
