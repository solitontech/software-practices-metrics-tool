import { ChangeEvent, useState } from "react";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";

import { SearchBox, ErrorBoundary } from "src/components/components.ts";
import { IFetchedTrunkMetricsBranch } from "src/services/api/api.ts";

import styles from "./TrunkBasedNamingConventionTable.module.scss";
import { filterBranches } from "./trunkBasedNamingConventionUtils.tsx";

interface ITrunkBasedNamingConventionTableProps {
  branchesNotFollowingNamingStandard: IFetchedTrunkMetricsBranch[];
}

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

      <div className={styles.container}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <td className={styles.tableCell} align="left">
                Branch Name
              </td>
            </tr>
          </thead>
          <tbody>
            {filteredBranches.length ? (
              filteredBranches.map((row) => {
                return (
                  <tr key={row.id + row.name} role="checkbox" tabIndex={-1} className={styles.tableRow}>
                    <td className={styles.tableCell}>
                      <NavLink to={row.url} target="_blank" className={styles.branchName}>
                        <Tooltip title={row.name} placement="bottom-start">
                          <span className={styles.title}>{row.name}</span>
                        </Tooltip>
                        <OpenInNewIcon className={styles.linkIcon} />
                      </NavLink>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={1} className={`${styles.noDataMessage} ${styles.tableCell}`}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </ErrorBoundary>
  );
};
