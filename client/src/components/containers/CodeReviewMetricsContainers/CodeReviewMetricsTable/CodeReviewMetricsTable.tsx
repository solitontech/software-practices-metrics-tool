import React, { useState, memo } from "react";

import { IFetchedCodeReviewPullRequest, IFetchedPullRequestVotes } from "src/services/api/api";

import styles from "./CodeReviewMetricsTable.module.scss";
import { columns, DEFAULT_SORT_STATE, DEFAULT_FILTER_STATE } from "./codeReviewMetricsTableConstants";
import { ICodeReviewTableVotesFilterColumn } from "./codeReviewMetricsTableTypes";
import { CodeReviewMetricsTableUtil } from "./codeReviewMetricsTableUtils";
import { CodeReviewTableHeader } from "./CodeReviewTableHeader/CodeReviewTableHeader";
import { CodeReviewTableRow } from "./CodeReviewTableRow/CodeReviewTableRow";

interface ICodeReviewMetricsTableProps {
  pullRequests: IFetchedCodeReviewPullRequest[];
}

export const CodeReviewMetricsTable = memo(({ pullRequests }: ICodeReviewMetricsTableProps) => {
  const [sort, setSort] = useState(DEFAULT_SORT_STATE);
  const [filters, setFilters] = useState(DEFAULT_FILTER_STATE);

  const sortedPullRequests = CodeReviewMetricsTableUtil.sortPullRequests(pullRequests, sort);
  const filteredPullRequests = CodeReviewMetricsTableUtil.getFilteredPullRequests(sortedPullRequests, filters);
  const totalComments = CodeReviewMetricsTableUtil.getTotalComments(filteredPullRequests);

  const handleSort = (columnName: string, order: string) => {
    setSort({
      ...DEFAULT_SORT_STATE,
      [columnName]: order,
    });
  };

  const handleFilterChange = (
    columnName: ICodeReviewTableVotesFilterColumn,
    voteKey: keyof IFetchedPullRequestVotes,
    value: boolean,
  ) => {
    setFilters((previousState) => {
      return {
        ...DEFAULT_FILTER_STATE,
        [columnName]: {
          ...previousState[columnName],
          [voteKey]: value,
        },
      };
    });
  };

  const handleFilterReset = () => {
    setFilters(DEFAULT_FILTER_STATE);
  };

  return (
    <React.Fragment>
      <h4 className={styles.header}>
        Total PR&apos;s: {filteredPullRequests.length} | Total Comments: {totalComments}
      </h4>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              {columns.map((column) => (
                <CodeReviewTableHeader
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
                return <CodeReviewTableRow key={row.id} index={index} row={row} />;
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
    </React.Fragment>
  );
});

CodeReviewMetricsTable.displayName = "CodeReviewMetricsTable";
