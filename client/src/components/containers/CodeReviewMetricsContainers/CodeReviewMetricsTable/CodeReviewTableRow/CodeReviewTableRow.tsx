import React, { memo, useState } from "react";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Chip } from "@mui/material";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

import dataInfoAlert from "src/assets/images/dataInfoAlert.svg";
import { CodeReviewCommentIcon } from "src/components/containers/CodeReviewMetricsContainers/CodeReviewCommentIcon/CodeReviewCommentIcon";
import { CodeReviewDisplayHoursToDays } from "src/components/containers/CodeReviewMetricsContainers/CodeReviewDisplayHoursToDays/CodeReviewDisplayHoursToDays";
import { CodeReviewVotesIcons } from "src/components/containers/CodeReviewMetricsContainers/CodeReviewVotesIcons/CodeReviewVotesIcons";
import { DialogBox } from "src/components/reusables/DialogBox/DialogBox";
import { NOT_AVAILABLE } from "src/constants/constants";
import { IFetchedCodeReviewPullRequest, IFetchedPullRequestVotesTimeline } from "src/services/api/api";
import { getFormattedDateWithTime, getFormattedDateWithoutTime } from "src/utils/utils";

import styles from "./CodeReviewTableRow.module.scss";
import { CodeReviewTabRowUtil } from "./codeReviewTabRowUtils";
import { CodeReviewDisplayHoursToDaysUtil } from "../../CodeReviewDisplayHoursToDays/codeReviewDisplayHoursToDaysUtils";

interface ICodeReviewTableRowProps {
  row: IFetchedCodeReviewPullRequest;
}

export const CodeReviewTableRow = memo(({ row }: ICodeReviewTableRowProps) => {
  const { numberOfNitComments, numberOfMajorComments, totalComments } = row.comments;

  const formattedReviewerComments = CodeReviewTabRowUtil.getReviewerComments(row.reviewerComments);

  const handleCopyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content).catch(() => {});
  };

  const [isVotesTimeLineOpen, setIsVotesTimeLineOpen] = useState(false);

  const showTimeLineTable = () => {
    setIsVotesTimeLineOpen(true);
  };

  const getTimeInSeconds = (endDate: string | null, startDate: string | null) => {
    if (!endDate || !startDate) {
      return null;
    }
    const differenceInMilliseconds = new Date(endDate).getTime() - new Date(startDate).getTime();
    const milliSecondsInSecond = 1000;

    const timeInSeconds = differenceInMilliseconds / milliSecondsInSecond;

    return Math.round(timeInSeconds);
  };

  const getFirstVotedTime = (id: string) => {
    const firstVotedTime = row.votesHistoryTimeline.find((vote) => vote.id === id);

    return firstVotedTime ? firstVotedTime.timeOfVote : null;
  };

  const reviewersFirstVotesArray = row.votesHistoryTimeline.reduce(
    (acc: IFetchedPullRequestVotesTimeline[], vote: IFetchedPullRequestVotesTimeline) => {
      if (!acc.find((v) => v.id === vote.id)) {
        acc.push(vote);
      }
      return acc;
    },
    [],
  );

  const columns = [
    {
      id: "reviewer",
      label: "Reviewer",
      width: 220,
    },
    {
      id: "addedTime",
      label: "Added Time",
      width: 185,
    },
    {
      id: "votedTime",
      label: "First Voted Time",
      width: 185,
    },
    {
      id: "firstReviewResponseTime",
      label: "First Review Response Time",
      width: 170,
    },
  ];

  return (
    <React.Fragment>
      <tr key={row.id} className={styles.tableRow} data-testid="code-review-metrics-table-row">
        <td className={styles.tableCell}>
          <time title={getFormattedDateWithTime(row.creationDate)}>
            {getFormattedDateWithoutTime(row.creationDate)}
          </time>
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
          <span
            title={`Click to copy : "${row.authorId}": "${row.createdBy}"`}
            data-uuid={row.authorId}
            onClick={() => handleCopyToClipboard(`"${row.authorId}": "${row.createdBy}"`)}
          >
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
        <td className={clsx(styles.tableCell)}>
          <div className={styles.firstReviewResponseTimeContainer}>
            <div className={styles.firstReviewResponseTime}>
              <CodeReviewDisplayHoursToDays timeInSeconds={row.firstReviewResponseTimeInSeconds} />
            </div>

            <div onClick={showTimeLineTable}>
              <img src={dataInfoAlert} className={styles.timelineIconColor} onClick={showTimeLineTable} />
            </div>
          </div>
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

      <DialogBox
        title="Reviewers First Review Response Time"
        className={styles.votesTimelineDialog}
        isOpen={isVotesTimeLineOpen}
        handleClose={() => setIsVotesTimeLineOpen(false)}
      >
        <div className={styles.tableContainer}>
          <table className={styles.table} aria-label="sticky table">
            <thead className={styles.tableHead}>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.id}
                    style={{
                      width: column.width,
                    }}
                    className={styles.tableHeaderCell}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {reviewersFirstVotesArray.length ? (
                reviewersFirstVotesArray.map((row) => {
                  const reviewerFirstVotedTime = getFirstVotedTime(row.id);
                  const timeInSeconds = getTimeInSeconds(reviewerFirstVotedTime, row.reviewerAddedTime);

                  const time = CodeReviewDisplayHoursToDaysUtil.getTimeFromSeconds(timeInSeconds);
                  const timeInDays = timeInSeconds
                    ? CodeReviewDisplayHoursToDaysUtil.getTimeInDays(timeInSeconds, time)
                    : NOT_AVAILABLE;

                  return (
                    <tr key={row.author} className={styles.tableRow}>
                      <td
                        data-uuid={row.id}
                        title={`Click to copy : "${row.id}": "${row.author}"`}
                        className={styles.tableCell}
                        onClick={() => handleCopyToClipboard(`"${row.id}": "${row.author}"`)}
                      >
                        {row.author}
                      </td>
                      <td className={styles.tableCell}>{getFormattedDateWithTime(row.reviewerAddedTime)}</td>
                      <td className={styles.tableCell}>{getFormattedDateWithTime(reviewerFirstVotedTime)}</td>
                      <td className={styles.tableCell} title={timeInDays}>
                        {time}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={columns.length} className={clsx(styles.noDataMessage)}>
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </DialogBox>
    </React.Fragment>
  );
});

CodeReviewTableRow.displayName = "CodeReviewTableRow";
