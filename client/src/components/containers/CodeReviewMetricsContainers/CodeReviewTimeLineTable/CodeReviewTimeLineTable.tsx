import clsx from "clsx";

import { CustomVote } from "src/components/components";
import { IFetchedPullRequestVotesTimeline } from "src/services/api/api";
import { getFormattedDateWithTime } from "src/utils/utils";

import styles from "./CodeReviewTimeLineTable.module.scss";
import { columns, votesImage, votesLabel } from "./codeReviewTimeLineTableConstants";
interface ICodeReviewTimeLineTableProps {
  timeLine: IFetchedPullRequestVotesTimeline[];
}

//TODO: fix sticky header issue & CustomVote alignment
export const CodeReviewTimeLineTable = ({ timeLine }: ICodeReviewTimeLineTableProps) => {
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
          {timeLine.length ? (
            timeLine.map((row) => {
              return (
                <tr key={row.author} className={styles.tableRow} data-testid="code-review-metrics-timeline-table">
                  <td data-uuid={row.id} title={`${row.author} - ${row.id}`} className={styles.tableCell}>
                    {row.author}
                  </td>
                  <td className={styles.tableCell}>{getFormattedDateWithTime(row.timeOfVote)}</td>
                  <td className={styles.tableCell}>
                    <CustomVote imgSrc={votesImage[row.vote]} tooltipText={votesLabel[row.vote]} />
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
  );
};
