import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Chip } from "@mui/material";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import { IFetchedTrunkBranchPullRequest } from "src/services/api/api";
import { getFormattedDateWithoutTime, getFormattedDateWithTime } from "src/utils/utils";

import styles from "./TrunkBasedPullRequestsTable.module.scss";
import { tableColumns } from "./trunkBasedPullRequestsTableConstants";

interface ITrunkBasedPullRequestsTableProps {
  pullRequests: IFetchedTrunkBranchPullRequest[];
}

export const TrunkBasedPullRequestsTable = ({ pullRequests }: ITrunkBasedPullRequestsTableProps) => {
  return (
    <div className={styles.container}>
      <table className={styles.table} aria-label="sticky table">
        <thead className={styles.tableHead}>
          <tr>
            {tableColumns.map((column) => (
              <td
                data-testid={`${column.id}-table-header`}
                key={column.id}
                align={column.align}
                style={{ width: column.width }}
                className={styles.tableCell}
              >
                {column.label}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {pullRequests.length ? (
            pullRequests.map((row) => {
              return (
                <tr
                  data-testid="trunk-based-metrics-table-row"
                  key={row.title}
                  role="checkbox"
                  tabIndex={-1}
                  className={styles.tableRow}
                >
                  <td className={styles.tableCell}>
                    <span title={getFormattedDateWithTime(row.creationDate)}>
                      {getFormattedDateWithoutTime(row.creationDate)}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    <span title={getFormattedDateWithTime(row.closedDate)}>
                      {getFormattedDateWithoutTime(row.closedDate)}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    <NavLink to={row.branchURL} target="_blank" className={styles.branchName}>
                      <span title={row.name} className={styles.title}>
                        {row.name}
                      </span>

                      <OpenInNewIcon className={styles.linkIcon} />
                    </NavLink>
                  </td>
                  <td className={styles.tableCell}>
                    <NavLink to={row.pullRequestURL} className={styles.pullRequest} target="_blank">
                      <span title={row.title} className={styles.title}>
                        {row.title}
                      </span>

                      <OpenInNewIcon className={styles.linkIcon} />
                    </NavLink>
                  </td>
                  <td className={styles.tableCell}>
                    <Chip className={styles[row.status]} label={row.status} />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={tableColumns.length} className={clsx(styles.noDataMessage, styles.tableCell)}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
