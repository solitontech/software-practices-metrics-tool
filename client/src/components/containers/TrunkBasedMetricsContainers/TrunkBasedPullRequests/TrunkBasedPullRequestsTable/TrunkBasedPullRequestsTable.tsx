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

import { IFetchedTrunkBranchPullRequest } from "src/fetchers";
import { formatDateWithoutTime, formatDate } from "src/utils";

import { tableColumns } from "./constants";
import styles from "./TrunkBasedPullRequestsTable.module.scss";
import { filterPullRequests } from "./utils";

interface ITrunkBasedPullRequestsTableProps {
  searchTerm: string;
  pullRequests: IFetchedTrunkBranchPullRequest[];
}

export const TrunkBasedPullRequestsTable = ({ searchTerm, pullRequests }: ITrunkBasedPullRequestsTableProps) => {
  const filteredPullRequests = filterPullRequests(searchTerm, pullRequests);

  return (
    <Paper className={styles.paper}>
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
            {filteredPullRequests.length ? (
              filteredPullRequests.map((row, idx) => {
                const isEvenRow = idx % 2 === 0;

                return (
                  <TableRow
                    data-testid="trunk-based-metrics-table-row"
                    key={row.title}
                    role="checkbox"
                    tabIndex={-1}
                    className={isEvenRow ? styles.rowEven : styles.rowOdd}
                  >
                    <TableCell className={styles.date}>
                      <Tooltip title={formatDate(row.creationDate)} arrow>
                        <span>{formatDateWithoutTime(row.creationDate)}</span>
                      </Tooltip>
                    </TableCell>
                    <TableCell className={styles.date}>
                      <Tooltip title={formatDate(row.closedDate)} arrow>
                        <span>{formatDateWithoutTime(row.closedDate)}</span>
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
                      <NavLink to={row.pullRequestURL} className={styles.pullRequestURL} target="_blank">
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
