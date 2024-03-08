import { memo } from "react";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Chip } from "@mui/material";
import { NavLink } from "react-router-dom";

import { VotesTimeLineView } from "./VotesTimeLineView";
import { NOT_AVAILABLE } from "../../../../../constants/commonConstants";
import { formatDate, formatDateWithoutTime } from "../../../../../utils/formatTimeUtils";
import styles from "../CodeReviewMetricsTable.module.scss";
import { getFormattedReviewerComments } from "../codeReviewMetricsTableUtils";
import { ConvertHoursToDays } from "../ConvertHoursToDays";
import { CustomCommentIcon } from "../CustomCommentIcon";
import { IPullRequestList } from "../interfaces";

interface Props {
  index: number;
  row: IPullRequestList;
}

export const CodeReviewMetricsTableRow = memo(({ index, row }: Props) => {
  const isEvenRow = index % 2 === 0;
  const { numberOfNitComments, numberOfMajorComments, totalComments } = row.comments;

  const formattedReviewerComments = getFormattedReviewerComments(row.reviewerComments);

  return (
    <tr
      tabIndex={-1}
      key={row.id}
      className={isEvenRow ? styles.rowEven : styles.rowOdd}
      data-testid="code-review-metrics-table-row"
    >
      <td className={`${styles.text} ${styles.date}`}>
        <time className={styles.startDate} title={formatDate(row.creationDate)}>
          {formatDateWithoutTime(row.creationDate)}
        </time>
      </td>
      <td className={`${styles.text} ${styles.date}`}>
        <time className={styles.startDate} title={formatDate(row.closedDate)}>
          {formatDateWithoutTime(row.closedDate)}
        </time>
      </td>
      <td className={styles.text}>
        <NavLink to={row.url} className={styles.pullRequestURL} target="_blank">
          <p className={styles.prTitle} title={row.title}>
            {row.title}
          </p>
          <OpenInNewIcon className={styles.linkIcon} />
        </NavLink>
      </td>

      <td className={`${styles.text} ${styles.tags}`}>
        <div className={styles.tagsContainer}>
          {row.tags.length
            ? row.tags.map((tag: string) => {
                return <Chip key={tag} title={tag} className={styles.tag} label={tag} />;
              })
            : NOT_AVAILABLE}
        </div>
      </td>

      <td className={`${styles.text} ${styles.author}`}>
        <span title={`${row.createdBy} - ${row.authorId}`} data-uuid={row.authorId}>
          {row.createdBy}
        </span>
      </td>
      <td className={`${styles.text} ${styles.commentCount}`}>
        <CustomCommentIcon
          total={totalComments}
          nit={numberOfNitComments}
          major={numberOfMajorComments}
          reviewerComments={formattedReviewerComments}
        />
      </td>
      <td className={styles.text}>
        <VotesTimeLineView
          className={styles.votesTimeLine}
          approved={row.votesHistory.approved}
          approvedWithSuggestions={row.votesHistory.approvedWithSuggestions}
          waitForAuthor={row.votesHistory.waitForAuthor}
          rejected={row.votesHistory.rejected}
          votesTimeLine={row.votesHistoryTimeline}
          title={row.title}
          url={row.url}
        />
      </td>
      <td className={styles.text}>
        <VotesTimeLineView
          className={styles.currentVotesList}
          approved={row.votes.approved}
          approvedWithSuggestions={row.votes.approvedWithSuggestions}
          waitForAuthor={row.votes.waitForAuthor}
          rejected={row.votes.rejected}
          isNoVotesVisible={true}
          noVote={row.votes.noVote}
          votesTimeLine={row.votesTimeline}
          title={row.title}
          url={row.url}
        />
      </td>
      <td className={`${styles.text} ${styles.firstReviewTime}`}>
        <ConvertHoursToDays timeInSeconds={row.firstReviewResponseTimeInSeconds} />
      </td>
      <td className={`${styles.text} ${styles.approvalTime}`}>
        <ConvertHoursToDays timeInSeconds={row.approvalTimeInSeconds} />
      </td>
      <td className={`${styles.text} ${styles.mergeTime}`}>
        <ConvertHoursToDays timeInSeconds={row.mergeTimeInSeconds} />
      </td>
      <td className={styles.text}>
        <Chip className={styles[row.status]} label={row.status} />
      </td>
    </tr>
  );
});

CodeReviewMetricsTableRow.displayName = "CodeReviewMetricsTableRow";
