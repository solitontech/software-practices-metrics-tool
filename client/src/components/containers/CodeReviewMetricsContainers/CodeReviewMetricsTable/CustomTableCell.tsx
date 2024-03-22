import { IFetchedPullRequestVotes } from "src/services/api/api";

import styles from "./CodeReviewMetricsTable.module.scss";
import { ICodeReviewTableVotesFilterColumn, ICodeReviewTableColumn } from "./codeReviewMetricsTableTypes";

interface TableCellProps {
  column: ICodeReviewTableColumn;
  handleSort: (columnName: string, order: string) => void;
  handleFilterChange: (
    columnName: ICodeReviewTableVotesFilterColumn,
    vote: keyof IFetchedPullRequestVotes,
    value: boolean,
  ) => void;
  filters: Record<ICodeReviewTableVotesFilterColumn, Record<keyof IFetchedPullRequestVotes, boolean>>;
  handleFilterReset: () => void;
}

const COLUMN_ID = {
  VOTES: "votes",
};

export const CustomTableCell = ({
  column,
  handleSort,
  handleFilterChange,
  filters,
  handleFilterReset,
}: TableCellProps) => {
  const Action = column.action;

  return (
    <th
      data-testid={`${column.id}-table-header`}
      className={styles.tableCell}
      key={column.id}
      style={{ minWidth: column.minWidth, textAlign: column.align ?? "left" }}
    >
      <div className={styles.tableHeader}>
        <span aria-label={column.label} className={styles.closedDateTitle}>
          {column.label}
        </span>
        {Action && (
          <Action
            handleSort={(order: string) => {
              handleSort(column.id, order);
            }}
            filter={filters[column.id as ICodeReviewTableVotesFilterColumn]}
            showNoVote={column.id === COLUMN_ID.VOTES}
            handleFilter={(vote: keyof IFetchedPullRequestVotes, value: boolean) => {
              handleFilterChange(column.id as ICodeReviewTableVotesFilterColumn, vote, value);
            }}
            handleFilterReset={handleFilterReset}
          />
        )}
      </div>
    </th>
  );
};
