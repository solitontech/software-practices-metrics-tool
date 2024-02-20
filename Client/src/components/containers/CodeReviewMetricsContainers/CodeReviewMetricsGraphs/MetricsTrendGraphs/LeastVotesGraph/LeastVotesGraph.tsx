import { useState } from "react";

import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";

import { LEAST_VOTE_CLASS } from "./leastVotesConstants";
import styles from "./LeastVotesGraph.module.scss";
import { PullRequestsVotesAnalysis } from "./leastVotesGraphInterface";
import { Monthly } from "./monthlyGraphUtils";
import { Weekly } from "./weeklyGraphUtils";
import {
  VOTE_LABEL,
  VOTE_COLOR,
} from "../../../../../../pages/CodeReviewMetrics/votesConstants";
import { BarChart } from "../../../../../reusables/MetricsGraphs/BarChart/BarChart";
import {
  TREND_VIEW,
  GRAPH_TYPE,
} from "../../../../../reusables/MetricsGraphs/BarChart/barChartConstants";
import {
  TrendView,
  BarMode,
  IBarPlot,
} from "../../../../../reusables/MetricsGraphs/BarChart/interfaces";
import {
  IPullRequestList,
  Vote,
} from "../../../CodeReviewMetricsTable/interfaces";
import { GraphDropdown } from "../GraphDropdown/GraphDropdown";
import { areDatesInSameMonthAndYear } from "../metricsTrendGraphUtils";

interface Props {
  pullRequests: IPullRequestList[];
  startDate: Date;
  endDate: Date;
}

const GRAPH_TITLE = "Pull Requests least votes trend";
const Y_AXIS_NAME = "Pull Requests count";
const INFO_TEXT =
  "The least favored vote in PR's history timeline will be considered as least vote";
const GRAPH_TOOLTIP_HEADER: Record<Vote, string> = {
  rejected: "Pull Requests with rejected vote",
  approved: "Pull Requests with approved vote",
  waitForAuthor: "Pull Requests with wait for author vote",
  noVote: "Pull Requests with no vote",
  approvedWithSuggestions: "Pull Requests with approved with suggestions vote",
};

export const LeastVotesAnalysisGraph = ({
  pullRequests,
  startDate,
  endDate,
}: Props) => {
  const isMonthlyDisabled = areDatesInSameMonthAndYear(startDate, endDate);

  const defaultGraphMode = (
    isMonthlyDisabled ? TREND_VIEW.WEEKLY : TREND_VIEW.MONTHLY
  ) as TrendView;

  const [trendView, setTrendView] = useState<TrendView>(defaultGraphMode);

  const [barMode, setBarMode] = useState<BarMode>(GRAPH_TYPE.GROUP as BarMode);

  const xAxisName = trendView === TREND_VIEW.WEEKLY ? "Weeks" : "Months";

  const selectedClass =
    trendView === TREND_VIEW.WEEKLY
      ? LEAST_VOTE_CLASS.Weekly
      : LEAST_VOTE_CLASS.Monthly;

  const groupedLeastVoteAnalysis =
    trendView === TREND_VIEW.WEEKLY
      ? Weekly.getWeeklyLeastVotes(pullRequests, startDate, endDate)
      : Monthly.getMonthlyLeastVotes(pullRequests, startDate, endDate);

  const plots: Record<Vote, IBarPlot> = {
    rejected: {
      plotName: VOTE_LABEL.REJECTED,
      xLabels: [],
      yValues: [],
      color: VOTE_COLOR.REJECTED,
      hoverText: [],
    },
    waitForAuthor: {
      plotName: VOTE_LABEL.WAIT_FOR_AUTHOR,
      xLabels: [],
      yValues: [],
      color: VOTE_COLOR.WAIT_FOR_AUTHOR,
      hoverText: [],
    },
    approvedWithSuggestions: {
      plotName: VOTE_LABEL.APPROVED_WITH_SUGGESTIONS,
      xLabels: [],
      yValues: [],
      color: VOTE_COLOR.APPROVED_WITH_SUGGESTIONS,
      hoverText: [],
    },
    approved: {
      plotName: VOTE_LABEL.APPROVED,
      xLabels: [],
      yValues: [],
      color: VOTE_COLOR.APPROVED,
      hoverText: [],
    },
    noVote: {
      plotName: VOTE_LABEL.NO_VOTE,
      xLabels: [],
      yValues: [],
      color: VOTE_COLOR.NO_VOTE,
      hoverText: [],
    },
  };

  const addPlot = (
    group: PullRequestsVotesAnalysis,
    vote: Vote,
    tooltipHeader: string,
  ) => {
    plots[vote].xLabels.push(group.interval);
    plots[vote].yValues.push(group.pullRequestIds[vote].length);
    plots[vote].hoverText.push(
      selectedClass.getTooltipText(group.pullRequestIds[vote], tooltipHeader),
    );
  };

  groupedLeastVoteAnalysis.forEach((group: PullRequestsVotesAnalysis) => {
    Object.keys(plots).forEach((vote) => {
      addPlot(group, vote as Vote, GRAPH_TOOLTIP_HEADER[vote as Vote]);
    });
  });

  return (
    <div className={styles.barChartContainer}>
      <Tooltip
        className={styles.infoIconContainer}
        title={INFO_TEXT}
        placement="right"
        arrow
      >
        <InfoIcon className={styles.infoIcon} />
      </Tooltip>

      <div className={styles.graphButtonContainer}>
        <GraphDropdown
          graphOptions={{
            trendView,
            barMode,
            isMonthlyDisabled,
          }}
          setTrendView={setTrendView}
          setBarMode={setBarMode}
        />
      </div>

      <BarChart
        graphObject={{
          plots: Object.values(plots),
          xAxisName: xAxisName,
          yAxisName: Y_AXIS_NAME,
          graphAnnotationText: `Total Pull Requests : ${pullRequests.length}`,
          graphTitle: GRAPH_TITLE,
          barMode: barMode,
        }}
      />
    </div>
  );
};
