import styles from "./CodeReviewMetricsTable.module.scss";
import {
  ICodeReviewTableVotesFilterColumn,
  ICodeReviewTableVotesFilter,
  ICodeReviewTableVotes,
  ICustomSortingIconProps,
  ICodeReviewTableColumn,
} from "./codeReviewMetricsTableTypes";

interface TableCellProps {
  column: ICodeReviewTableColumn;
  handleSort: (columnName: string, order: string) => void;
  handleFilterChange: (
    columnName: ICodeReviewTableVotesFilterColumn,
    vote: ICodeReviewTableVotes,
    value: boolean,
  ) => void;
  filters: Record<ICodeReviewTableVotesFilterColumn, ICodeReviewTableVotesFilter>;
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
  const Action: ((props: ICustomSortingIconProps) => JSX.Element) | undefined = column.action;

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
            handleFilter={(vote: ICodeReviewTableVotes, value: boolean) => {
              handleFilterChange(column.id as ICodeReviewTableVotesFilterColumn, vote, value);
            }}
            handleFilterReset={handleFilterReset}
          />
        )}
      </div>
    </th>
  );
};
