import { IFetchedPullRequestVotesTimeline } from "src/services/api/api";
import { getFormattedDateWithTime, getTimeFromSeconds, getTimeInDays, getTimeInSeconds } from "src/utils/utils";

import styles from "./CodeReviewFirstResponseReviewersTable.module.scss";
import { columns } from "./codeReviewFirstResponseReviewersTableConstants";

interface ICodeReviewFirstResponseTable {
  votesHistoryTimeline: IFetchedPullRequestVotesTimeline[];
}

export const CodeReviewFirstResponseReviewersTable = ({ votesHistoryTimeline }: ICodeReviewFirstResponseTable) => {
  const initialVoteTimeline: IFetchedPullRequestVotesTimeline[] = [];

  const reviewersFirstVotesArray = votesHistoryTimeline.reduce((acc, vote) => {
    if (!acc.find((accVote) => accVote.id === vote.id)) {
      acc.push(vote);
    }

    return acc;
  }, initialVoteTimeline);

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
              const reviewerResponseTimeInSeconds = getTimeInSeconds(row.timeOfVote, row.reviewerAddedTime);
              const time = getTimeFromSeconds(reviewerResponseTimeInSeconds);
              const timeInDays = getTimeInDays(reviewerResponseTimeInSeconds, time);

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
