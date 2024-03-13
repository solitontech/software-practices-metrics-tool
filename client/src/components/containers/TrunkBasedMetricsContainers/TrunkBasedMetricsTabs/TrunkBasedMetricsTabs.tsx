import { TrunkBasedPullRequestsTable, TrunkBasedMetricsGraphs, ErrorBoundary } from "src/components";

import styles from "./TrunkBasedMetricsTabs.module.scss";

interface ITrunkBasedMetricsTabsProps {
  selectedTab: "table" | "graph";
  dates: {
    startDate: Date;
    endDate: Date;
  };
}

export const TrunkBasedMetricsTabs = ({ selectedTab, dates }: ITrunkBasedMetricsTabsProps) => {
  if (selectedTab === "table") {
    return (
      <div className={styles.trunkBasedTable}>
        <ErrorBoundary key="trunk-based-table">
          <TrunkBasedPullRequestsTable startDate={dates.startDate} endDate={dates.endDate} />
        </ErrorBoundary>
      </div>
    );
  }

  if (selectedTab === "graph") {
    return (
      <ErrorBoundary key="trunk-based-graph">
        <TrunkBasedMetricsGraphs startDate={dates.startDate} endDate={dates.endDate} />
      </ErrorBoundary>
    );
  }

  return null;
};
