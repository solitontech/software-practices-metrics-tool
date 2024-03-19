import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";

import { IFetchedCodeReviewPullRequest } from "src/services/api/api";

import styles from "./LeastVotesGraph.module.scss";
import { LeastVotesGraphUtils } from "./leastVotesGraphUtils";
import { VOTE_LABEL, VOTE_COLOR } from "../../../../../../pages/CodeReviewMetrics/votesConstants";
import { PieChart } from "../../../../../reusables/MetricsGraphs/PieChart/PieChart";
import { IPiePlot } from "../../../../../reusables/MetricsGraphs/PieChart/pieChartTypes";
interface Props {
  pullRequests: IFetchedCodeReviewPullRequest[];
}

const GRAPH_TITLE = `Pull Requests least votes`;
const GRAPH_HOVER_TEXT_TITLES: Record<string, string> = {
  rejected: "Pull Requests with rejected vote",
  approved: "Pull Requests with approved vote",
  waitForAuthor: "Pull Requests with wait for author vote",
  noVote: "Pull Requests with no vote",
  approvedWithSuggestions: "Pull Requests with approved with suggestions vote",
};
const ANNOTATION_Y_POSITION = 1.1;
const INFO_TEXT = "The least favored vote in PR's history timeline will be considered as least vote";

export const LeastVotesGraph = ({ pullRequests }: Props) => {
  const graphAnnotationText = `Total PR's: ${pullRequests.length}`;

  const plots: Record<string, IPiePlot> = {
    rejected: {
      label: VOTE_LABEL.REJECTED,
      value: 0,
      color: VOTE_COLOR.REJECTED,
      hoverText: "",
    },
    waitForAuthor: {
      label: VOTE_LABEL.WAIT_FOR_AUTHOR,
      value: 0,
      color: VOTE_COLOR.WAIT_FOR_AUTHOR,
      hoverText: "",
    },
    approvedWithSuggestions: {
      label: VOTE_LABEL.APPROVED_WITH_SUGGESTIONS,
      value: 0,
      color: VOTE_COLOR.APPROVED_WITH_SUGGESTIONS,
      hoverText: "",
    },
    approved: {
      label: VOTE_LABEL.APPROVED,
      value: 0,
      color: VOTE_COLOR.APPROVED,
      hoverText: "",
    },
    noVote: {
      label: VOTE_LABEL.NO_VOTE,
      value: 0,
      color: VOTE_COLOR.NO_VOTE,
      hoverText: "",
    },
  };

  const [firstPullRequest] = pullRequests;
  LeastVotesGraphUtils.setMaxLineAndIds(firstPullRequest.id);

  pullRequests.forEach((pullRequest) => {
    const leastVotePlot = plots[LeastVotesGraphUtils.getLeastVote(pullRequest.votesHistory)];

    leastVotePlot.hoverText += LeastVotesGraphUtils.appendPullRequestIdAndGetGraphHoverText(
      leastVotePlot.value,
      pullRequest.id,
    );

    leastVotePlot.value++;
  });

  Object.keys(plots).forEach((vote) => {
    plots[vote].hoverText = LeastVotesGraphUtils.getformatGraphHoverText(plots[vote], GRAPH_HOVER_TEXT_TITLES[vote]);
  });

  return (
    <div className={styles.pieChartContainer}>
      <Tooltip className={styles.infoIconContainer} title={INFO_TEXT} placement="right" arrow>
        <InfoIcon className={styles.infoIcon} />
      </Tooltip>

      <PieChart
        graph={{
          plots: Object.values(plots),
          totalValue: pullRequests.length,
          graphTitle: GRAPH_TITLE,
          graphAnnotationText,
          annotationYPosition: ANNOTATION_Y_POSITION,
        }}
      ></PieChart>
    </div>
  );
};
