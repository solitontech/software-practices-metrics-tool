import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";

import { IPiePlot, PieChart } from "src/components/reusables/MetricsGraphs/PieChart/PieChart";
import { VOTES_LABEL, VOTES_COLOR } from "src/constants/constants";
import { IFetchedCodeReviewPullRequest } from "src/services/api/api";

import styles from "./CodeReviewGraphLeastVotes.module.scss";
import { CodeReviewGraphLeastVotesUtils } from "./codeReviewGraphLeastVotesUtils";
import {
  GRAPH_TITLE,
  ANNOTATION_Y_POSITION,
  INFO_TEXT,
  GRAPH_HOVER_TEXT_TITLES,
} from "./CodeReviewGraphLeasVotesConstants";

interface ICodeReviewGraphLeastVotesProps {
  pullRequests: IFetchedCodeReviewPullRequest[];
}

export const CodeReviewGraphLeastVotes = ({ pullRequests }: ICodeReviewGraphLeastVotesProps) => {
  const [firstPullRequest] = pullRequests;
  const graphAnnotationText = `Total pull requests: ${pullRequests.length}`;

  const plots: Record<string, IPiePlot> = {
    rejected: {
      label: VOTES_LABEL.REJECTED,
      value: 0,
      color: VOTES_COLOR.REJECTED,
      hoverText: "",
    },
    waitForAuthor: {
      label: VOTES_LABEL.WAIT_FOR_AUTHOR,
      value: 0,
      color: VOTES_COLOR.WAIT_FOR_AUTHOR,
      hoverText: "",
    },
    approvedWithSuggestions: {
      label: VOTES_LABEL.APPROVED_WITH_SUGGESTIONS,
      value: 0,
      color: VOTES_COLOR.APPROVED_WITH_SUGGESTIONS,
      hoverText: "",
    },
    approved: {
      label: VOTES_LABEL.APPROVED,
      value: 0,
      color: VOTES_COLOR.APPROVED,
      hoverText: "",
    },
    noVote: {
      label: VOTES_LABEL.NO_VOTE,
      value: 0,
      color: VOTES_COLOR.NO_VOTE,
      hoverText: "",
    },
  };

  CodeReviewGraphLeastVotesUtils.setMaxLineAndIds(firstPullRequest.id);

  pullRequests.forEach((pullRequest) => {
    const leastVote = CodeReviewGraphLeastVotesUtils.getLeastVote(pullRequest.votesHistory);
    const leastVotePlot = plots[leastVote];

    leastVotePlot.hoverText += CodeReviewGraphLeastVotesUtils.getGraphHoverText(leastVotePlot.value, pullRequest.id);
    leastVotePlot.value++;
  });

  Object.keys(plots).forEach((vote) => {
    plots[vote].hoverText = CodeReviewGraphLeastVotesUtils.getFormattedHoverText(
      plots[vote],
      GRAPH_HOVER_TEXT_TITLES[vote],
    );
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
