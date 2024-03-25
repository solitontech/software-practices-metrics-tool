import { memo } from "react";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Chip } from "@mui/material";
import { NavLink } from "react-router-dom";

import { CodeReviewVotesIcons, CodeReviewDisplayHoursToDays, CodeReviewCommentIcon } from "src/components/components";
import { NOT_AVAILABLE } from "src/constants/constants";
import { IFetchedCodeReviewPullRequest } from "src/services/api/api";
import { getFormattedDateWithTime, getFormattedDateWithoutTime } from "src/utils/utils";

import styles from "./CodeReviewTableRow.module.scss";
import { CodeReviewTabRowUtil } from "./codeReviewTabRowUtils";

interface ICodeReviewTableRowProps {
  row: IFetchedCodeReviewPullRequest;
}

export const CodeReviewTableRow = memo(({ row }: ICodeReviewTableRowProps) => {
  const { numberOfNitComments, numberOfMajorComments, totalComments } = row.comments;

  const formattedReviewerComments = CodeReviewTabRowUtil.getReviewerComments(row.reviewerComments);

  return (
    <tr key={row.id} className={styles.tableRow} data-testid="code-review-metrics-table-row">
      <td className={styles.tableCell}>
        <time title={getFormattedDateWithTime(row.creationDate)}>{getFormattedDateWithoutTime(row.creationDate)}</time>
      </td>
      <td className={styles.tableCell}>
        <time title={getFormattedDateWithTime(row.closedDate)}>{getFormattedDateWithoutTime(row.closedDate)}</time>
      </td>
      <td className={styles.tableCell}>
        <NavLink to={row.url} className={styles.pullRequest} target="_blank">
          <p className={styles.prTitle} title={row.title}>
            {row.title}
          </p>
          <OpenInNewIcon className={styles.linkIcon} />
        </NavLink>
      </td>

      <td className={styles.tableCell}>
        <div className={styles.tagsContainer}>
          {row.tags.length
            ? row.tags.map((tag) => {
                return <Chip key={tag} title={tag} className={styles.tag} label={tag} />;
              })
            : NOT_AVAILABLE}
        </div>
      </td>

      <td className={styles.tableCell}>
        <span title={`${row.createdBy} - ${row.authorId}`} data-uuid={row.authorId}>
          {row.createdBy}
        </span>
      </td>
      <td className={styles.tableCell}>
        <CodeReviewCommentIcon
          className={styles.commentIcon}
          total={totalComments}
          nit={numberOfNitComments}
          major={numberOfMajorComments}
          reviewerComments={formattedReviewerComments}
        />
      </td>
      <td className={styles.tableCell}>
        <CodeReviewVotesIcons
          className={styles.votesTimeLine}
          approved={row.votesHistory.approved}
          approvedWithSuggestions={row.votesHistory.approvedWithSuggestions}
          waitForAuthor={row.votesHistory.waitForAuthor}
          rejected={row.votesHistory.rejected}
          votesTimeLine={row.votesHistoryTimeline}
        />
      </td>
      <td className={styles.tableCell}>
        <CodeReviewVotesIcons
          className={styles.currentVotesList}
          approved={row.votes.approved}
          approvedWithSuggestions={row.votes.approvedWithSuggestions}
          waitForAuthor={row.votes.waitForAuthor}
          rejected={row.votes.rejected}
          isNoVotesVisible={true}
          noVote={row.votes.noVote}
          votesTimeLine={row.votesTimeline}
        />
      </td>
      <td className={styles.tableCell}>
        <CodeReviewDisplayHoursToDays timeInSeconds={row.firstReviewResponseTimeInSeconds} />
      </td>
      <td className={styles.tableCell}>
        <CodeReviewDisplayHoursToDays timeInSeconds={row.approvalTimeInSeconds} />
      </td>
      <td className={styles.tableCell}>
        <CodeReviewDisplayHoursToDays timeInSeconds={row.mergeTimeInSeconds} />
      </td>
      <td className={styles.tableCell}>
        <Chip className={styles[row.status]} label={row.status} />
      </td>
    </tr>
  );
});

CodeReviewTableRow.displayName = "CodeReviewTableRow";