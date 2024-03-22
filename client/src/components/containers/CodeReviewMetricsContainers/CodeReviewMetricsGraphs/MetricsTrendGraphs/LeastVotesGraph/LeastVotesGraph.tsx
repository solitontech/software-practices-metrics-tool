import { useState } from "react";

import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";

import { VOTES_LABEL, VOTES_COLOR } from "src/constants/constants";
import { IFetchedCodeReviewPullRequest, IFetchedPullRequestVotes } from "src/services/api/api";

import { LEAST_VOTE_CLASS } from "./leastVotesConstants";
import styles from "./LeastVotesGraph.module.scss";
import { PullRequestsVotesAnalysis } from "./leastVotesGraphInterface";
import { Monthly } from "./monthlyGraphUtils";
import { Weekly } from "./weeklyGraphUtils";
import { BarChart } from "../../../../../reusables/MetricsGraphs/BarChart/BarChart";
import { TREND_VIEW, GRAPH_TYPE } from "../../../../../reusables/MetricsGraphs/BarChart/barChartConstants";
import {
  IBarChartTrendView,
  IBarChartMode,
  IBarPlot,
} from "../../../../../reusables/MetricsGraphs/BarChart/barChartTypes";
import { GraphDropdown } from "../GraphDropdown/GraphDropdown";
import { areDatesInSameMonthAndYear } from "../metricsTrendGraphUtils";

interface Props {
  pullRequests: IFetchedCodeReviewPullRequest[];
  startDate: Date;
  endDate: Date;
}

const GRAPH_TITLE = "Pull Requests least votes trend";
const Y_AXIS_NAME = "Pull Requests count";
const INFO_TEXT = "The least favored vote in PR's history timeline will be considered as least vote";
const GRAPH_TOOLTIP_HEADER: Record<keyof IFetchedPullRequestVotes, string> = {
  rejected: "Pull Requests with rejected vote",
  approved: "Pull Requests with approved vote",
  waitForAuthor: "Pull Requests with wait for author vote",
  noVote: "Pull Requests with no vote",
  approvedWithSuggestions: "Pull Requests with approved with suggestions vote",
};

export const LeastVotesAnalysisGraph = ({ pullRequests, startDate, endDate }: Props) => {
  const isMonthlyDisabled = areDatesInSameMonthAndYear(startDate, endDate);

  const defaultGraphMode = (isMonthlyDisabled ? TREND_VIEW.WEEKLY : TREND_VIEW.MONTHLY) as IBarChartTrendView;

  const [trendView, setTrendView] = useState<IBarChartTrendView>(defaultGraphMode);

  const [barMode, setBarMode] = useState<IBarChartMode>(GRAPH_TYPE.GROUP as IBarChartMode);

  const xAxisName = trendView === TREND_VIEW.WEEKLY ? "Weeks" : "Months";

  const selectedClass = trendView === TREND_VIEW.WEEKLY ? LEAST_VOTE_CLASS.Weekly : LEAST_VOTE_CLASS.Monthly;

  const groupedLeastVoteAnalysis =
    trendView === TREND_VIEW.WEEKLY
      ? Weekly.getWeeklyLeastVotes(pullRequests, startDate, endDate)
      : Monthly.getMonthlyLeastVotes(pullRequests, startDate, endDate);

  const plots: Record<keyof IFetchedPullRequestVotes, IBarPlot> = {
    rejected: {
      plotName: VOTES_LABEL.REJECTED,
      xLabels: [],
      yValues: [],
      color: VOTES_COLOR.REJECTED,
      hoverText: [],
    },
    waitForAuthor: {
      plotName: VOTES_LABEL.WAIT_FOR_AUTHOR,
      xLabels: [],
      yValues: [],
      color: VOTES_COLOR.WAIT_FOR_AUTHOR,
      hoverText: [],
    },
    approvedWithSuggestions: {
      plotName: VOTES_LABEL.APPROVED_WITH_SUGGESTIONS,
      xLabels: [],
      yValues: [],
      color: VOTES_COLOR.APPROVED_WITH_SUGGESTIONS,
      hoverText: [],
    },
    approved: {
      plotName: VOTES_LABEL.APPROVED,
      xLabels: [],
      yValues: [],
      color: VOTES_COLOR.APPROVED,
      hoverText: [],
    },
    noVote: {
      plotName: VOTES_LABEL.NO_VOTE,
      xLabels: [],
      yValues: [],
      color: VOTES_COLOR.NO_VOTE,
      hoverText: [],
    },
  };

  const addPlot = (group: PullRequestsVotesAnalysis, vote: keyof IFetchedPullRequestVotes, tooltipHeader: string) => {
    plots[vote].xLabels.push(group.interval);
    plots[vote].yValues.push(group.pullRequestIds[vote].length);
    plots[vote].hoverText.push(selectedClass.getTooltipText(group.pullRequestIds[vote], tooltipHeader));
  };

  groupedLeastVoteAnalysis.forEach((group: PullRequestsVotesAnalysis) => {
    Object.keys(plots).forEach((vote) => {
      addPlot(
        group,
        vote as keyof IFetchedPullRequestVotes,
        GRAPH_TOOLTIP_HEADER[vote as keyof IFetchedPullRequestVotes],
      );
    });
  });

  return (
    <div className={styles.barChartContainer}>
      <Tooltip className={styles.infoIconContainer} title={INFO_TEXT} placement="right" arrow>
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
        graph={{
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
