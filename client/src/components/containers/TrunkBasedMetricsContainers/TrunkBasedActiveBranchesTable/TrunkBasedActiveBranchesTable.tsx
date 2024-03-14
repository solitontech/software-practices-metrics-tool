import React, { ChangeEvent, useState } from "react";

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

import { SearchBox } from "src/components";
import { IFetchedTrunkBasedActiveBranch } from "src/fetchers";
import { formatDate } from "src/utils";

import styles from "./TrunkBasedActiveBranchesTable.module.scss";
import { columns } from "./trunkBasedActiveBranchesTableConstants";
import { filterActiveBranches } from "./trunkBasedActiveBranchesTableUtils";

interface ITrunkBasedActiveBranchesTableProps {
  activeBranches: IFetchedTrunkBasedActiveBranch[];
}

//TODO: refactor to use native table component for better performance

export const TrunkBasedActiveBranchesTable = ({ activeBranches }: ITrunkBasedActiveBranchesTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBraches = filterActiveBranches(searchTerm, activeBranches);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.trim());
  };

  return (
    <React.Fragment>
      <div className={styles.header}>
        <SearchBox
          label="Search for active pull requests"
          placeHolder="Search for branch name, title, author, creation date"
          width={370}
          isDebounced={true}
          onChange={handleSearchChange}
        ></SearchBox>
        <p className={styles.totalCount}>Total count : {filteredBraches.length}</p>
      </div>
      <Paper className={styles.container}>
        <TableContainer sx={{ maxHeight: "100%" }}>
          <Table stickyHeader>
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
              {filteredBraches.length ? (
                filteredBraches.map((row) => {
                  return (
                    <TableRow key={row.title} role="checkbox" tabIndex={-1} className={styles.tableRow}>
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
                      <TableCell className={styles.createdBy}>{row.createdBy}</TableCell>
                      <TableCell className={styles.date}>{formatDate(row.creationDate)}</TableCell>
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
    </React.Fragment>
  );
};
