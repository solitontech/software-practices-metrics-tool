import { useState } from "react";

import { Monthly } from "./monthlyGraphUtils";
import { GRAPH_COLOR, GRAPH_PLOT_NAME, GRAPH_TOOLTIP_HEADER, TREND_VIEW_CLASS } from "./timeMetricsConstants";
import styles from "./TimeMetricsGraph.module.scss";
import { IPullRequestsTimeMetrics, TimeMetrics } from "./timeMetricsGraphInterface";
import { Weekly } from "./weeklyGraphUtils";
import { BarChart } from "../../../../../reusables/MetricsGraphs/BarChart/BarChart";
import { GRAPH_TYPE, TREND_VIEW } from "../../../../../reusables/MetricsGraphs/BarChart/barChartConstants";
import { BarMode, IBarPlot, TrendView } from "../../../../../reusables/MetricsGraphs/BarChart/interfaces";
import { IPullRequestList } from "../../../CodeReviewMetricsTable/interfaces";
import { GraphDropdown } from "../GraphDropdown/GraphDropdown";
import { areDatesInSameMonthAndYear } from "../metricsTrendGraphUtils";

interface Props {
  pullRequests: IPullRequestList[];
  startDate: Date;
  endDate: Date;
}

const GRAPH_TITLE = "Pull Requests metrics time trend";
const Y_AXIS_NAME = "Average time in hours";

const Y_AXIS_SUFFIX = " hrs";

export const TimeMetricsAnalysisGraph = ({ pullRequests, startDate, endDate }: Props) => {
  const isMonthlyDisabled = areDatesInSameMonthAndYear(startDate, endDate);

  const defaultGraphMode = (isMonthlyDisabled ? TREND_VIEW.WEEKLY : TREND_VIEW.MONTHLY) as TrendView;

  const [trendView, setTrendView] = useState<TrendView>(defaultGraphMode);

  const xAxisName = trendView === TREND_VIEW.WEEKLY ? "Weeks" : "Months";

  const trendViewClass = TREND_VIEW.WEEKLY ? TREND_VIEW_CLASS.Weekly : TREND_VIEW_CLASS.Monthly;

  const timeMetrics =
    trendView === TREND_VIEW.WEEKLY
      ? Weekly.getWeeklyTimeMetrics(pullRequests, startDate, endDate)
      : Monthly.getMonthlyTimeMetrics(pullRequests, startDate, endDate);

  const plots: Record<TimeMetrics, IBarPlot> = {
    firstReviewResponse: {
      xLabels: [],
      yValues: [],
      color: GRAPH_COLOR.firstReviewResponse,
      hoverText: [],
      plotName: GRAPH_PLOT_NAME.firstReviewResponse,
    },
    approval: {
      xLabels: [],
      yValues: [],
      color: GRAPH_COLOR.approval,
      hoverText: [],
      plotName: GRAPH_PLOT_NAME.approval,
    },
    merge: {
      xLabels: [],
      yValues: [],
      color: GRAPH_COLOR.merge,
      hoverText: [],
      plotName: GRAPH_PLOT_NAME.merge,
    },
  };

  const addPlot = (group: IPullRequestsTimeMetrics, timeMetrics: TimeMetrics, tooltipHeader: string) => {
    const averageTimeInHours = trendViewClass.getAverageTimeInHours(group.timeInSeconds[timeMetrics]);

    plots[timeMetrics].xLabels.push(group.interval);
    plots[timeMetrics].yValues.push(averageTimeInHours);
    plots[timeMetrics].hoverText.push(
      trendViewClass.getTooltipText(group.pullRequestIds[timeMetrics], averageTimeInHours, tooltipHeader),
    );
  };

  timeMetrics.forEach((group: IPullRequestsTimeMetrics) => {
    Object.keys(plots).forEach((timeMetrics) => {
      addPlot(group, timeMetrics as TimeMetrics, GRAPH_TOOLTIP_HEADER[timeMetrics as TimeMetrics]);
    });
  });

  return (
    <div className={styles.barChartContainer}>
      <div className={styles.graphButtonContainer}>
        <GraphDropdown
          graphOptions={{
            trendView,
            isMonthlyDisabled,
          }}
          setTrendView={setTrendView}
        />
      </div>

      <BarChart
        graphObject={{
          plots: Object.values(plots),
          xAxisName: xAxisName,
          yAxisName: Y_AXIS_NAME,
          graphAnnotationText: `Total Pull Requests : ${pullRequests.length}`,
          graphTitle: GRAPH_TITLE,
          barMode: GRAPH_TYPE.GROUP as BarMode,
          yAxisTickSuffix: Y_AXIS_SUFFIX,
        }}
      />
    </div>
  );
};
