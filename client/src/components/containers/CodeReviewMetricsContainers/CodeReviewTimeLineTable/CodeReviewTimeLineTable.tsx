import clsx from "clsx";

import { CustomVote } from "src/components/reusables/CustomVote/CustomVote";
import { IFetchedPullRequestVotesTimeline } from "src/services/api/api";
import { getFormattedDateWithTime } from "src/utils/utils";

import styles from "./CodeReviewTimeLineTable.module.scss";
import { columns, votesImage, votesLabel } from "./codeReviewTimeLineTableConstants";
interface ICodeReviewTimeLineTableProps {
  timeLine: IFetchedPullRequestVotesTimeline[];
}

export const CodeReviewTimeLineTable = ({ timeLine }: ICodeReviewTimeLineTableProps) => {
  const handleCopyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content).catch(() => {});
  };

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
                  <td
                    data-uuid={row.id}
                    title={`Click to copy : "${row.id}": "${row.author}"`}
                    className={styles.tableCell}
                    onClick={() => handleCopyToClipboard(`"${row.id}": "${row.author}"`)}
                  >
                    {row.author}
                  </td>
                  <td className={styles.tableCell}>{getFormattedDateWithTime(row.timeOfVote)}</td>
                  <td className={clsx(styles.voteIcon, styles.tableCell)}>
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
