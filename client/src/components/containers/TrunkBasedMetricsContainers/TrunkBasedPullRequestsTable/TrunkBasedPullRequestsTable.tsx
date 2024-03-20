import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Chip, Tooltip } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { NavLink } from "react-router-dom";

import { IFetchedTrunkBranchPullRequest } from "src/services/api/api";
import { getFormattedDateWithoutTime, getFormattedDateWithTime } from "src/utils/utils";

import styles from "./TrunkBasedPullRequestsTable.module.scss";
import { tableColumns } from "./trunkBasedPullRequestsTableConstants";

interface ITrunkBasedPullRequestsTableProps {
  pullRequests: IFetchedTrunkBranchPullRequest[];
}

//TODO: Refactor to native table component for performance

export const TrunkBasedPullRequestsTable = ({ pullRequests }: ITrunkBasedPullRequestsTableProps) => {
  return (
    <Paper className={styles.container}>
      <TableContainer sx={{ maxHeight: "100%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {tableColumns.map((column) => (
                <TableCell
                  data-testid={`${column.id}-table-header`}
                  key={column.id}
                  align={column.align}
                  style={{ width: column.width }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {pullRequests.length ? (
              pullRequests.map((row) => {
                return (
                  <TableRow
                    data-testid="trunk-based-metrics-table-row"
                    key={row.title}
                    role="checkbox"
                    tabIndex={-1}
                    className={styles.tableRow}
                  >
                    <TableCell className={styles.date}>
                      <Tooltip title={getFormattedDateWithTime(row.creationDate)} arrow>
                        <span>{getFormattedDateWithoutTime(row.creationDate)}</span>
                      </Tooltip>
                    </TableCell>
                    <TableCell className={styles.date}>
                      <Tooltip title={getFormattedDateWithTime(row.closedDate)} arrow>
                        <span>{getFormattedDateWithoutTime(row.closedDate)}</span>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <NavLink to={row.branchURL} target="_blank" className={styles.branchName}>
                        <Tooltip title={row.name} placement="bottom-start">
                          <span className={styles.title}>{row.name}</span>
                        </Tooltip>
                        <OpenInNewIcon className={styles.linkIcon} />
                      </NavLink>
                    </TableCell>
                    <TableCell>
                      <NavLink to={row.pullRequestURL} className={styles.pullRequest} target="_blank">
                        <Tooltip title={row.title} placement="bottom-start">
                          <span className={styles.title}>{row.title}</span>
                        </Tooltip>
                        <OpenInNewIcon className={styles.linkIcon} />
                      </NavLink>
                    </TableCell>
                    <TableCell>
                      <Chip className={styles[row.status]} label={row.status} />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={tableColumns.length} className={styles.noDataMessage}>
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
