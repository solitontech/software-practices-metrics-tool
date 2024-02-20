import { useState, memo } from "react";

import styles from "./CodeReviewMetricsTable.module.scss";
import { columns, sortMap } from "./codeReviewMetricsTableConstants";
import {
  getFilteredPullRequests,
  getTotalComments,
  sortPullRequests,
} from "./codeReviewMetricsTableUtils";
import { CustomTableCell } from "./CustomTableCell";
import {
  IPullRequestList,
  Vote,
  IColumn,
  Filters,
  FilterColumn,
} from "./interfaces";
import { CodeReviewMetricsTableRow } from "./TableChildren/CodeReviewMetricsTableRow";
import { VOTES_FILTER_DEFAULT_STATE } from "./VotesFilter/votesFilterConstants";

interface Props {
  pullRequests: IPullRequestList[];
}

const SORT_DEFAULT_STATE = {
  comments: sortMap.noSort,
  firstReviewResponseTimeInSeconds: sortMap.noSort,
  approvalTimeInSeconds: sortMap.noSort,
  mergeTimeInSeconds: sortMap.noSort,
};

const FILTER_DEFAULT_STATE: Filters = {
  votesHistory: VOTES_FILTER_DEFAULT_STATE,
  votes: VOTES_FILTER_DEFAULT_STATE,
};

export const CodeReviewMetricsTable = memo(({ pullRequests }: Props) => {
  const [filters, setFilter] = useState<Filters>(FILTER_DEFAULT_STATE);
  const [sort, setSort] = useState<Record<string, string>>(SORT_DEFAULT_STATE);

  const sortedPullRequests = sortPullRequests(pullRequests, sort);

  const filteredPullRequests = getFilteredPullRequests(
    sortedPullRequests,
    filters,
  );

  const totalComments = getTotalComments(filteredPullRequests);

  const handleSort = (columnName: string, order: string) => {
    setSort({
      ...SORT_DEFAULT_STATE,
      [columnName]: order,
    });
  };

  const handleFilterChange = (
    columnName: FilterColumn,
    vote: Vote,
    value: boolean,
  ) => {
    setFilter((previousState) => {
      return {
        ...FILTER_DEFAULT_STATE,
        [columnName]: {
          ...previousState[columnName],
          [vote]: value,
        },
      };
    });
  };

  const handleFilterReset = () => {
    setFilter(FILTER_DEFAULT_STATE);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.totalPRs}>
          Total PR&apos;s: {filteredPullRequests.length} | Total Comments:{" "}
          {totalComments}
        </div>
      </div>
      <div className={styles.paper}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              {columns.map((column: IColumn) => (
                <CustomTableCell
                  filters={filters}
                  key={column.id}
                  column={column}
                  handleSort={handleSort}
                  handleFilterChange={handleFilterChange}
                  handleFilterReset={handleFilterReset}
                />
              ))}
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {filteredPullRequests.length ? (
              filteredPullRequests.map((row, index) => {
                return (
                  <CodeReviewMetricsTableRow
                    key={row.id}
                    index={index}
                    row={row}
                  />
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
    </>
  );
});

CodeReviewMetricsTable.displayName = "CodeReviewMetricsTable";
