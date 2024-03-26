import { HistogramChart } from "src/components/components";
import { TRACE_COLOR } from "src/constants/constants";

import { ITimeMetricsGraph, ITimeMetricsGraphOptions, ITimeMetricsPullRequest } from "./timeMetricsGraphInterfaces";
import { TimeMetricsUtils } from "./timeMetricsGraphUtils";
interface Props {
  graphObject: ITimeMetricsGraph;
  averageTime: number | string;
  graphOptions?: ITimeMetricsGraphOptions;
}

const HOUR_SCALE = 10;
const MAXIMUM_HOURS = 70;

export const TimeMetricsGraph = ({
  graphObject: {
    pullRequests,
    traceColor = TRACE_COLOR,
    hoursScale = HOUR_SCALE,
    maximumHours = MAXIMUM_HOURS,
    metricsName,
  },
  averageTime,
  graphOptions,
}: Props) => {
  const pullRequestList: ITimeMetricsPullRequest[] = TimeMetricsUtils.getPullRequestsRoundedTime(
    pullRequests,
    hoursScale,
    maximumHours,
  );

  const metricsRoundedTimes = pullRequestList.map(({ metricsTime }) => {
    return metricsTime;
  });

  const pullRequestGroupedCount = TimeMetricsUtils.getPullRequestGroupedData(
    metricsRoundedTimes,
    hoursScale,
    maximumHours,
  );

  const startValue = 0;
  const endValue = maximumHours + hoursScale;
  const binSize = hoursScale;

  const binText = TimeMetricsUtils.getGraphTracesText(pullRequestGroupedCount);

  const markerColor = TimeMetricsUtils.getTracesColor(traceColor, pullRequestGroupedCount);

  const hoverText = TimeMetricsUtils.getGraphHoverText(pullRequestList, pullRequestGroupedCount, metricsName);

  const graphAnnotationText = TimeMetricsUtils.getGraphAnnotationText(metricsName, averageTime, pullRequests.length);

  const xAxisName = `${TimeMetricsUtils.capitalizeFirstLetter(metricsName)} time in hours`;
  const yAxisName = "Pull Requests count";
  const graphTitle = `Pull Requests ${metricsName} time`;

  return (
    <HistogramChart
      graph={{
        plot: {
          xValues: metricsRoundedTimes,
          startValue,
          endValue,
          binSize,
          binText,
          markerColor,
          hoverText,
        },
        ...graphOptions,
        xAxisName,
        yAxisName,
        graphTitle,
        graphAnnotationText,
      }}
    />
  );
};
