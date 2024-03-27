import { ChangeEvent, useState } from "react";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

import { ErrorBoundary } from "src/components/reusables/ErrorBoundary/ErrorBoundary.tsx";
import { SearchBox } from "src/components/reusables/SearchBox/SearchBox.tsx";
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
          className={styles.searchBox}
          isDebounced={true}
          onChange={handleSearchChange}
        ></SearchBox>
        <p className={styles.totalCount}>Total branches: {filteredBranches.length}</p>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.tableHeaderCell} align="left">
                Branch Name
              </th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {filteredBranches.length ? (
              filteredBranches.map((row) => {
                return (
                  <tr key={row.id + row.name} className={styles.tableRow}>
                    <td className={styles.tableCell}>
                      <NavLink to={row.url} target="_blank" className={styles.branchName}>
                        <span title={row.name} className={styles.title}>
                          {row.name}
                        </span>

                        <OpenInNewIcon className={styles.linkIcon} />
                      </NavLink>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={1} className={clsx(styles.noDataMessage, styles.tableCell)}>
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
