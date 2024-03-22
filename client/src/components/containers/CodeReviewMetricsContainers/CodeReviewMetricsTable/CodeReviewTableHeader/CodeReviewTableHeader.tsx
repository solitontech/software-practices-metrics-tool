import styles from "./CodeReviewTableHeader.module.scss";
import { ICodeReviewTableHeaderProps } from "./codeReviewTableHeaderTypes";
import { ICodeReviewTableVotesFilterColumn } from "../codeReviewMetricsTableTypes";

const SHOW_NO_VOTE_COLUMN_ID = "votes";

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
      style={{ minWidth: column.minWidth, textAlign: column.align }}
      data-testid={`${column.id}-table-header`}
    >
      <div className={styles.tableHeader}>
        <p aria-label={column.label}>{column.label}</p>
        {TableAction && (
          <TableAction
            filter={filters[column.id as ICodeReviewTableVotesFilterColumn]}
            handleFilterReset={handleFilterReset}
            showNoVote={column.id === SHOW_NO_VOTE_COLUMN_ID}
            handleSort={(order) => handleSort(column.id, order)}
            handleFilter={(vote, value) => {
              handleFilterChange(column.id as ICodeReviewTableVotesFilterColumn, vote, value);
            }}
          />
        )}
      </div>
    </th>
  );
};
