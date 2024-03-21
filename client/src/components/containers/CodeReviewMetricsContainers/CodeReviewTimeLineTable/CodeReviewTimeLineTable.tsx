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
    <div className={styles.container}>
      <table className={styles.table} aria-label="sticky table">
        <thead className={styles.tableHead}>
          <tr>
            {columns.map((column) => (
              <td
                key={column.id}
                style={{
                  width: column.width,
                }}
                className={styles.tableCell}
              >
                {column.label}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeLine.length ? (
            timeLine.map((row) => {
              return (
                <tr data-testid="code-review-metrics-timeline-table" key={row.author} className={styles.tableRow}>
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
              <td colSpan={columns.length} className={clsx(styles.noDataMessage, styles.tableCell)}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
