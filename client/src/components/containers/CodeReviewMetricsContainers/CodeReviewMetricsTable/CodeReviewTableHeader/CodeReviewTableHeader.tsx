import styles from "./CodeReviewTableHeader.module.scss";
import { ICodeReviewTableHeaderProps } from "./codeReviewTableHeaderTypes";
import { FILTER_COLUMN_VOTES, FILTER_COLUMN_VOTES_HISTORY } from "../codeReviewMetricsTableConstants";
import { ICodeReviewTableVotesFilterColumn } from "../codeReviewMetricsTableTypes";

export const CodeReviewTableHeader = ({
  column,
  filters,
  handleSort,
  handleFilterReset,
  handleFilterChange,
}: ICodeReviewTableHeaderProps) => {
  const { action: TableAction } = column;

  return (
    <th
      key={column.id}
      className={styles.tableCell}
      style={{ minWidth: column.width, textAlign: column.align }}
      data-testid={`${column.id}-table-header`}
    >
      <div className={styles.tableHeader}>
        <p aria-label={column.label}>{column.label}</p>
        {TableAction && (
          <TableAction
            filter={filters[column.id as ICodeReviewTableVotesFilterColumn]}
            showNoVote={column.id === FILTER_COLUMN_VOTES}
            handleSort={(order) => handleSort(column.id, order)}
            handleFilterReset={handleFilterReset}
            handleFilterChange={(vote, value) => {
              if (column.id === FILTER_COLUMN_VOTES || column.id === FILTER_COLUMN_VOTES_HISTORY) {
                handleFilterChange(column.id, vote, value);
              }
            }}
          />
        )}
      </div>
    </th>
  );
};
