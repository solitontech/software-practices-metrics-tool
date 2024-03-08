import { ChangeEvent, useEffect, useState } from "react";

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

import styles from "./TrunkBasedPullRequestsTable.module.scss";
import { columns } from "./trunkBasedPullRequestsTableConstants";
import { filterPullRequests, getMergedPullRequest } from "./trunkBasedPullRequestsTableUtils";
import { ErrorBoundary } from "../../../../errorBoundary/ErrorBoundary";
import { useTrunkBasedMetricsPullRequests } from "../../../../fetchers/hooks/trunkBasedDevelopment/useTrunkBasedMetricsPullRequests";
import { formatDate, formatDateWithoutTime } from "../../../../utils/formatTimeUtils";
import { DisplayError } from "../../../reusables/DisplayError/DisplayError";
import { InfoIconTooltip } from "../../../reusables/InfoIconTooltip/InfoIconTooltip";
import { LoadingSpinner } from "../../../reusables/LoadingSpinner/LoadingSpinner";
import { SearchBox } from "../../../reusables/SearchBox/SearchBox";
import { Tile } from "../../../reusables/Tile/Tile";

const TRUNK_BASED_TILE_HEADERS = {
  TOTAL_PULL_REQUESTS: "Total Pull Requests",
  PERCENTAGE_OF_PULL_REQUESTS_MERGED: "Percentage of branches merged",
};

interface Props {
  startDate: Date;
  endDate: Date;
}

export const TrunkBasedPullRequestsTable = ({ startDate, endDate }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSearchTerm("");
  }, [startDate, endDate]);

  const {
    isLoading: isPullRequestsLoading,
    data: { pullRequestsMergedList },
    error: pullRequestsError,
  } = useTrunkBasedMetricsPullRequests(startDate, endDate);

  if (isPullRequestsLoading) {
    return <LoadingSpinner content="Loading branches..." />;
  }

  if (pullRequestsError) {
    return <DisplayError error={pullRequestsError?.response.data.error} />;
  }

  const searchedActiveBranches = searchTerm
    ? filterPullRequests(pullRequestsMergedList, searchTerm)
    : pullRequestsMergedList;

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.trim());
  };

  return (
    <ErrorBoundary>
      <div className={styles.tableHeader}>
        <SearchBox
          onChange={handleSearchChange}
          label="Search Pull Requests"
          width={380}
          placeHolder="Search for dates, branch name, title and status"
          isDebounced={true}
        ></SearchBox>
      </div>
      <div className={styles.tableView}>
        <Paper className={styles.paper}>
          <TableContainer sx={{ maxHeight: "100%" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      data-testid={`${column.id}-table-header`}
                      align={column.align}
                      style={{ width: column.width }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {searchedActiveBranches.length ? (
                  searchedActiveBranches.map((row, index) => {
                    const { creationDate, closedDate, name, title, status, pullRequestURL, branchURL } = row;
                    const isEvenRow = index % 2 === 0;

                    return (
                      <TableRow
                        data-testid="trunk-based-metrics-table-row"
                        role="checkbox"
                        tabIndex={-1}
                        className={isEvenRow ? styles.rowEven : styles.rowOdd}
                        key={String(title)}
                      >
                        <TableCell className={styles.date}>
                          <Tooltip title={formatDate(creationDate)} arrow>
                            <span className={styles.startDate}>{formatDateWithoutTime(creationDate)}</span>
                          </Tooltip>
                        </TableCell>
                        <TableCell className={styles.date}>
                          <Tooltip title={formatDate(closedDate)} arrow>
                            <span className={styles.closedDate}>{formatDateWithoutTime(closedDate)}</span>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <NavLink to={branchURL} target="_blank" className={styles.branchName}>
                            <Tooltip title={name} placement="bottom-start">
                              <span className={styles.title}>{name}</span>
                            </Tooltip>
                            <OpenInNewIcon className={styles.linkIcon} />
                          </NavLink>
                        </TableCell>
                        <TableCell>
                          <NavLink to={pullRequestURL} className={styles.pullRequestURL} target="_blank">
                            <Tooltip title={title} placement="bottom-start">
                              <span className={styles.title}>{title}</span>
                            </Tooltip>
                            <OpenInNewIcon className={styles.linkIcon} />
                          </NavLink>
                        </TableCell>

                        <TableCell>
                          <Chip className={styles[status]} label={status} />
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className={styles.noDataMessage}>
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <div className={styles.tiles}>
          <Tile title={TRUNK_BASED_TILE_HEADERS.TOTAL_PULL_REQUESTS}>
            <div className={styles.tileContent}>
              <InfoIconTooltip content="Total pull requests for the selected start date range" size="16px" />
              <div>
                <span data-testid="total-pull-requests">{searchedActiveBranches.length}</span>
              </div>
            </div>
          </Tile>
          <Tile title={TRUNK_BASED_TILE_HEADERS.PERCENTAGE_OF_PULL_REQUESTS_MERGED}>
            <div className={styles.tileContent}>
              <InfoIconTooltip content={getMergedPullRequest(searchedActiveBranches).count} size="16px" />
              <div>
                <span data-testid="merged-branches-percentage">
                  {getMergedPullRequest(searchedActiveBranches).percentage}
                </span>
              </div>
            </div>
          </Tile>
        </div>
      </div>
    </ErrorBoundary>
  );
};
