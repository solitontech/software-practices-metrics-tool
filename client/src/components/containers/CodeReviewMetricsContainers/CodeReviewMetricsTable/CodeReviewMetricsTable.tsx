import { useState, memo } from "react";

import { IFetchedCodeReviewPullRequest } from "src/services/api/api";

import styles from "./CodeReviewMetricsTable.module.scss";
import { columns, DEFAULT_SORT_STATE, DEFAULT_FILTER_STATE } from "./codeReviewMetricsTableConstants";
import { ICodeReviewTableVotes, ICodeReviewTableVotesFilterColumn } from "./codeReviewMetricsTableTypes";
import { getFilteredPullRequests, getTotalComments, sortPullRequests } from "./codeReviewMetricsTableUtils";
import { CustomTableCell } from "./CustomTableCell";
import { CodeReviewMetricsTableRow } from "./TableChildren/CodeReviewMetricsTableRow";

interface ICodeReviewMetricsTableProps {
  pullRequests: IFetchedCodeReviewPullRequest[];
}

export const CodeReviewMetricsTable = memo(({ pullRequests }: ICodeReviewMetricsTableProps) => {
  const [sort, setSort] = useState(DEFAULT_SORT_STATE);
  const [filters, setFilters] = useState(DEFAULT_FILTER_STATE);

  const sortedPullRequests = sortPullRequests(pullRequests, sort);
  const filteredPullRequests = getFilteredPullRequests(sortedPullRequests, filters);
  const totalComments = getTotalComments(filteredPullRequests);

  const handleSort = (columnName: string, order: string) => {
    setSort({
      ...DEFAULT_SORT_STATE,
      [columnName]: order,
    });
  };

  const handleFilterChange = (
    columnName: ICodeReviewTableVotesFilterColumn,
    vote: ICodeReviewTableVotes,
    value: boolean,
  ) => {
    setFilters((previousState) => {
      return {
        ...DEFAULT_FILTER_STATE,
        [columnName]: {
          ...previousState[columnName],
          [vote]: value,
        },
      };
    });
  };

  const handleFilterReset = () => {
    setFilters(DEFAULT_FILTER_STATE);
  };

  return (
    <>
      <div className={styles.header}>
        <p className={styles.totalPRs}>
          Total PR&apos;s: {filteredPullRequests.length} | Total Comments: {totalComments}
        </p>
      </div>
      <div className={styles.paper}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              {columns.map((column) => (
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
                return <CodeReviewMetricsTableRow key={row.id} index={index} row={row} />;
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
