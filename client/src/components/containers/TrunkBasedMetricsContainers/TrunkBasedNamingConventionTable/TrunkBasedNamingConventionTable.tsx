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

import { SearchBox, ErrorBoundary } from "src/components/components.ts";
import { IFetchedTrunkMetricsBranch } from "src/fetchers/fetchers.ts";

import styles from "./TrunkBasedNamingConventionTable.module.scss";
import { filterBranches } from "./trunkBasedNamingConventionUtils.tsx";

interface ITrunkBasedNamingConventionTableProps {
  branchesNotFollowingNamingStandard: IFetchedTrunkMetricsBranch[];
}

//TODO: refactor to use native table component for better performance

export const TrunkBasedNamingConventionTable = ({
  branchesNotFollowingNamingStandard,
}: ITrunkBasedNamingConventionTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBranches = filterBranches(searchTerm, branchesNotFollowingNamingStandard);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.trim());
  };

  return (
    <ErrorBoundary>
      <div className={styles.header}>
        <SearchBox
          label="Search branches"
          placeHolder="Search branch name"
          width={320}
          isDebounced={true}
          onChange={handleSearchChange}
        ></SearchBox>
        <p className={styles.totalCount}>Total branches: {filteredBranches.length}</p>
      </div>

      <Paper className={styles.container}>
        <TableContainer sx={{ maxHeight: "100%" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="left">Branch Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBranches.length ? (
                filteredBranches.map((row) => {
                  return (
                    <TableRow key={row.id + row.name} role="checkbox" tabIndex={-1} className={styles.tableRow}>
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
                  <TableCell colSpan={1} className={styles.noDataMessage}>
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </ErrorBoundary>
  );
};
