import styles from "./CodeReviewTimeLineTable.module.scss";
import { columns, votesImage, votesLabel } from "./codeReviewTimeLineTableConstants";
import { IVotesLabel } from "./interfaces";
import { getFormattedDateWithTime } from "../../../../utils/dateUtil";
import { CustomVote } from "../../../reusables/CustomVote/CustomVote";
import { IVotesTimeline } from "../CodeReviewMetricsTable/interfaces";

interface Props {
  timeLine: IVotesTimeline[];
}

export const CodeReviewTimeLineTable = ({ timeLine }: Props) => {
  const rows = timeLine.map(({ author, timeOfVote, vote, id }) => ({
    author,
    id,
    time: timeOfVote,
    vote,
  }));

  return (
    <div className={styles.paper}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              {columns.map((column) => (
                <th
                  className={styles.tableCell}
                  key={column.id}
                  style={{
                    width: column.width,
                    textAlign: column.align ?? "left",
                  }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {rows.length ? (
              rows.map((row, index) => {
                const isEvenRow = index % 2 === 0;

                return (
                  <tr
                    role="checkbox"
                    tabIndex={-1}
                    className={isEvenRow ? styles.rowEven : styles.rowOdd}
                    key={String(row.time ?? row.author)}
                  >
                    <th
                      className={`${styles.text} ${styles.tableCell}`}
                      data-uuid={row.id}
                      title={`${row.author} - ${row.id}`}
                    >
                      {row.author}
                    </th>
                    <th className={`${styles.text} ${styles.tableCell}`}>{getFormattedDateWithTime(row.time)}</th>
                    <th className={`${styles.text} ${styles.tableCell}`}>
                      <CustomVote
                        imgSrc={votesImage[row.vote as keyof IVotesLabel]}
                        tooltipText={votesLabel[row.vote as keyof IVotesLabel]}
                      />
                    </th>
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
    </div>
  );
};
