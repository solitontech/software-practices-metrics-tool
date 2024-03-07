import styles from "./CodeReviewMetricsTable.module.scss";
import {
  IColumn,
  FilterColumn,
  Filters,
  Vote,
  ICustomSortingIconProps,
} from "./interfaces";

interface TableCellProps {
  column: IColumn;
  handleSort: (columnName: string, order: string) => void;
  handleFilterChange: (
    columnName: FilterColumn,
    vote: Vote,
    value: boolean,
  ) => void;
  filters: Filters;
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
  const Action: ((props: ICustomSortingIconProps) => JSX.Element) | undefined =
    column.action;

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
            filter={filters[column.id as FilterColumn]}
            showNoVote={column.id === COLUMN_ID.VOTES}
            handleFilter={(vote: Vote, value: boolean) => {
              handleFilterChange(column.id as FilterColumn, vote, value);
            }}
            handleFilterReset={handleFilterReset}
          />
        )}
      </div>
    </th>
  );
};
