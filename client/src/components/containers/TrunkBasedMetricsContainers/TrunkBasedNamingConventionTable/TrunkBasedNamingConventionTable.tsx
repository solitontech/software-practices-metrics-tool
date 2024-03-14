import { ChangeEvent, useState } from "react";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Tooltip } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { NavLink } from "react-router-dom";

import styles from "./TrunkBasedNamingConventionTable.module.scss";
import { columns } from "./trunkBasedNamingConventionTableConstants.ts";
import { filterBranches } from "./trunkBasedNamingConventionUtils.tsx";
import { ErrorBoundary } from "../../../reusables/ErrorBoundary/ErrorBoundary.tsx";
import { SearchBox } from "../../../reusables/SearchBox/SearchBox.tsx";
import { IBranchInfo } from "../TrunkBasedMetricsTiles/trunkBasedMetricsTilesTypes.tsx";

interface Props {
  branchesNotFollowingNamingStandard: IBranchInfo[];
}

export const TrunkBasedNamingConventionTable = ({ branchesNotFollowingNamingStandard }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const searchedBranches = searchTerm
    ? filterBranches(branchesNotFollowingNamingStandard, searchTerm)
    : branchesNotFollowingNamingStandard;

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.trim());
  };

  return (
    <ErrorBoundary>
      <div className={styles.tableHeader}>
        <SearchBox
          onChange={handleSearchChange}
          label="Search Branches"
          width={270}
          placeHolder="Search Branch Name"
          isDebounced={true}
        ></SearchBox>
        <div className={styles.totalCount}>Total Branches: {searchedBranches.length}</div>
      </div>
      <div className={styles.tableView}>
        <Paper className={styles.paper}>
          <TableContainer sx={{ maxHeight: "400px" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ width: column.width }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {searchedBranches.length ? (
                  searchedBranches.map((row, index) => {
                    const isEvenRow = index % 2 === 0;

                    return (
                      <TableRow
                        role="checkbox"
                        tabIndex={-1}
                        className={isEvenRow ? styles.rowEven : styles.rowOdd}
                        key={row.id + row.name}
                      >
                        <TableCell>
                          <NavLink to={row.url} target="_blank" className={styles.branchName}>
                            <Tooltip title={row.name} placement="bottom-start">
                              <span className={styles.title}>{row.name}</span>
                            </Tooltip>
                            <OpenInNewIcon className={styles.linkIcon} />
                          </NavLink>
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
      </div>
    </ErrorBoundary>
  );
};
