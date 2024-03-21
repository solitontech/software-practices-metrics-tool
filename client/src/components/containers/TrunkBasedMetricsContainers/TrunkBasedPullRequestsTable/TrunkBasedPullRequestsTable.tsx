import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Chip, Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";

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
                  <td className={`${styles.date} ${styles.tableCell}`}>
                    <Tooltip title={getFormattedDateWithTime(row.creationDate)} arrow>
                      <span>{getFormattedDateWithoutTime(row.creationDate)}</span>
                    </Tooltip>
                  </td>
                  <td className={`${styles.date} ${styles.tableCell}`}>
                    <Tooltip title={getFormattedDateWithTime(row.closedDate)} arrow>
                      <span>{getFormattedDateWithoutTime(row.closedDate)}</span>
                    </Tooltip>
                  </td>
                  <td className={styles.tableCell}>
                    <NavLink to={row.branchURL} target="_blank" className={styles.branchName}>
                      <Tooltip title={row.name} placement="bottom-start">
                        <span className={styles.title}>{row.name}</span>
                      </Tooltip>
                      <OpenInNewIcon className={styles.linkIcon} />
                    </NavLink>
                  </td>
                  <td className={styles.tableCell}>
                    <NavLink to={row.pullRequestURL} className={styles.pullRequest} target="_blank">
                      <Tooltip title={row.title} placement="bottom-start">
                        <span className={styles.title}>{row.title}</span>
                      </Tooltip>
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
              <td colSpan={tableColumns.length} className={`${styles.noDataMessage} ${styles.tableCell}`}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
