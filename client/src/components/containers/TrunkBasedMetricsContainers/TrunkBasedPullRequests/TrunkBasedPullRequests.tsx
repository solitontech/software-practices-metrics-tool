import { ChangeEvent, useEffect, useState } from "react";

import {
  ErrorBoundary,
  LoadingSpinner,
  SearchBox,
  TrunkBasedPullRequestsTable,
  TrunkBasedPullRequestsTiles,
} from "src/components/components";
import { usePullRequestsMergedToTrunk } from "src/services/api/api";

import styles from "./TrunkBasedPullRequests.module.scss";
import { filterPullRequests } from "./trunkBasedPullRequestsUtils";

interface ITrunkBasedPullRequestsProps {
  startDate: Date;
  endDate: Date;
}

export const TrunkBasedPullRequests = ({ startDate, endDate }: ITrunkBasedPullRequestsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isPending, isError, data, error } = usePullRequestsMergedToTrunk(startDate, endDate);

  useEffect(() => {
    setSearchTerm("");
  }, [startDate, endDate]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.trim());
  };

  if (isPending) {
    return <LoadingSpinner content="Loading branches..." />;
  }

  if (isError) {
    return <p className={styles.errorMessage}>{error?.response?.data.error}</p>;
  }

  const filteredPullRequests = filterPullRequests(searchTerm, data.pullRequests);
  const mergedPullRequests = data.pullRequests.filter(({ status }) => status === "completed");

  return (
    <ErrorBoundary>
      <div className={styles.headerContainer}>
        <SearchBox
          onChange={handleSearchChange}
          label="Search Pull Requests"
          className={styles.searchBox}
          placeHolder="Search for dates, branch name, title and status"
          isDebounced={true}
        ></SearchBox>
      </div>
      <div className={styles.viewContainer}>
        <TrunkBasedPullRequestsTable pullRequests={filteredPullRequests} />
        <TrunkBasedPullRequestsTiles
          pullRequestCount={data.pullRequests.length}
          mergeCount={mergedPullRequests.length}
        />
      </div>
    </ErrorBoundary>
  );
};
