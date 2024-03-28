import { IPiePlot } from "src/components/reusables/MetricsGraphs/PieChart/PieChart";
import {
  VOTES,
  MAX_CHARACTERS_IN_LINE_IN_TOOLTIP,
  MAX_PULL_REQUEST_IDS_IN_LINE_IN_TOOLTIP,
  MAX_PULL_REQUEST_ID_ROWS,
  TAB_SPACE,
  LINE_BREAKER,
  DOUBLE_SPACE,
} from "src/constants/constants";
import { IFetchedPullRequestVotes } from "src/services/api/api";

const MAX_CHARACTERS = MAX_CHARACTERS_IN_LINE_IN_TOOLTIP;

export class CodeReviewGraphLeastVotesUtils {
  static #maxIds;
  static #maxLine = MAX_PULL_REQUEST_IDS_IN_LINE_IN_TOOLTIP;

  static {
    this.#maxIds = MAX_PULL_REQUEST_ID_ROWS * this.#maxLine;
  }

  static setMaxLineAndIds(pullRequestId: number) {
    const pullRequestIdLength = String(pullRequestId).length;
    const pullRequestInLine = Math.ceil(MAX_CHARACTERS / pullRequestIdLength);

    this.#maxLine = Math.min(pullRequestInLine, this.#maxLine);
    this.#maxIds = this.#maxLine * MAX_PULL_REQUEST_ID_ROWS;
  }

  static getLeastVote(votesHistory: IFetchedPullRequestVotes) {
    if (votesHistory.rejected) {
      return VOTES.REJECTED;
    }

    if (votesHistory.waitForAuthor) {
      return VOTES.WAIT_FOR_AUTHOR;
    }

    if (votesHistory.approvedWithSuggestions) {
      return VOTES.APPROVED_WITH_SUGGESTIONS;
    }

    if (votesHistory.approved) {
      return VOTES.APPROVED;
    }

    return VOTES.NO_VOTE;
  }

  static getGraphHoverText(votesValue: number, pullRequestId: number) {
    const isEndOfLine = !(votesValue % this.#maxLine);
    const isLimitExceeded = votesValue >= this.#maxIds;

    if (isLimitExceeded) {
      return "";
    }

    return TAB_SPACE + (isEndOfLine ? LINE_BREAKER + LINE_BREAKER + TAB_SPACE : "") + pullRequestId;
  }

  static getFormattedHoverText({ hoverText, value }: IPiePlot, title: string) {
    return (
      DOUBLE_SPACE +
      `<b>${title} (Total PR's: ${value})</b>` +
      DOUBLE_SPACE +
      LINE_BREAKER +
      LINE_BREAKER +
      DOUBLE_SPACE +
      "<b>Pull request Id's</b>" +
      hoverText +
      TAB_SPACE +
      LINE_BREAKER +
      TAB_SPACE
    );
  }
}
