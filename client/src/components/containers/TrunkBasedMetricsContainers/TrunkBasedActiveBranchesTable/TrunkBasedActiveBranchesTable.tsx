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

import styles from "./TrunkBasedActiveBranchesTable.module.scss";
import { columns } from "./trunkBasedActiveBranchesTableConstants";
import { filterActiveBranches } from "./trunkBasedActiveBranchesTableUtils";
import { formatDate } from "../../../../utils/formatTimeUtils";
import { SearchBox } from "../../../reusables/SearchBox/SearchBox";
import { IActiveBranch } from "../TrunkBasedMetricsTiles/interfaces";

interface Props {
  activeBranches: IActiveBranch[];
}

export const TrunkBasedActiveBranchesTable = ({ activeBranches }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const searchedActiveBranches = searchTerm ? filterActiveBranches(activeBranches, searchTerm) : activeBranches;

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.trim());
  };

  return (
    <>
      <div className={styles.header}>
        <SearchBox
          onChange={handleSearchChange}
          label="Search for active pull requests"
          width={370}
          placeHolder="Search for branch name, title, author, creation date"
          isDebounced={true}
        ></SearchBox>
        <div className={styles.totalCount}>Total Active PR&apos;s: {searchedActiveBranches.length}</div>
      </div>
      <Paper className={styles.paper}>
        <TableContainer sx={{ maxHeight: 440 }}>
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
              {searchedActiveBranches.length ? (
                searchedActiveBranches.map((row, index) => {
                  const isEvenRow = index % 2 === 0;

                  return (
                    <TableRow
                      role="checkbox"
                      tabIndex={-1}
                      className={isEvenRow ? styles.rowEven : styles.rowOdd}
                      key={String(row.title)}
                    >
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
                      <TableCell className={styles.text}>{row.createdBy}</TableCell>
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
    </>
  );
};
