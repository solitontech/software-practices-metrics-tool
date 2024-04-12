import { NOT_AVAILABLE } from "src/constants/constants";
import { IFetchedPullRequestVotesTimeline } from "src/services/api/api";
import { getFormattedDateWithTime, getTimeFromSeconds, getTimeInDays, getTimeInSeconds } from "src/utils/utils";

import styles from "./CodeReviewFirstResponseReviewersTable.module.scss";
import { columns } from "./codeReviewFirstResponseReviewersTableConstants";

interface ICodeReviewFirstResponseTable {
  votesHistoryTimeline: IFetchedPullRequestVotesTimeline[];
}

export const CodeReviewFirstResponseReviewersTable = ({ votesHistoryTimeline }: ICodeReviewFirstResponseTable) => {
  const reviewersFirstVotesArray = votesHistoryTimeline.reduce(
    (acc: IFetchedPullRequestVotesTimeline[], vote: IFetchedPullRequestVotesTimeline) => {
      if (!acc.find((v) => v.id === vote.id)) {
        acc.push(vote);
      }
      return acc;
    },
    [],
  );

  return (
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
              const reviewerResponseTimeInSeconds =
                row.timeOfVote && row.reviewerAddedTime
                  ? getTimeInSeconds(row.timeOfVote, row.reviewerAddedTime)
                  : null;

              const time = getTimeFromSeconds(reviewerResponseTimeInSeconds);
              const timeInDays = reviewerResponseTimeInSeconds
                ? getTimeInDays(reviewerResponseTimeInSeconds, time)
                : NOT_AVAILABLE;

              return (
                <tr key={row.author} className={styles.tableRow}>
                  <td data-uuid={row.id} title={row.author} className={styles.tableCell}>
                    {row.author}
                  </td>
                  <td className={styles.tableCell}>{getFormattedDateWithTime(row.reviewerAddedTime)}</td>
                  <td className={styles.tableCell}>{getFormattedDateWithTime(row.timeOfVote)}</td>
                  <td className={styles.tableCell} title={timeInDays}>
                    {time}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columns.length} className={styles.noDataMessage}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
