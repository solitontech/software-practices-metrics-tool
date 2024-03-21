import React, { ChangeEvent, useState } from "react";
import clsx from "clsx";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { NavLink } from "react-router-dom";

import { SearchBox } from "src/components/components";
import { IFetchedTrunkBasedActiveBranch } from "src/services/api/api";
import { getFormattedDateWithTime } from "src/utils/utils";

import styles from "./TrunkBasedActiveBranchesTable.module.scss";
import { columns } from "./trunkBasedActiveBranchesTableConstants";
import { filterActiveBranches } from "./trunkBasedActiveBranchesTableUtils";

interface ITrunkBasedActiveBranchesTableProps {
  activeBranches: IFetchedTrunkBasedActiveBranch[];
}

export const TrunkBasedActiveBranchesTable = ({ activeBranches }: ITrunkBasedActiveBranchesTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBranches = filterActiveBranches(searchTerm, activeBranches);

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
        <p className={styles.totalCount}>Total count : {filteredBranches.length}</p>
      </div>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              {columns.map((column) => (
                <td className={styles.tableCell} key={column.id} align={column.align} style={{ width: column.width }}>
                  {column.label}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredBranches.length ? (
              filteredBranches.map((row) => {
                return (
                  <tr key={row.title} className={styles.tableRow}>
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
                    <td className={styles.tableCell}>{row.createdBy}</td>
                    <td className={styles.tableCell}>{getFormattedDateWithTime(row.creationDate)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length} className={clsx(styles.noDataMessage, styles.tableCell)}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};
