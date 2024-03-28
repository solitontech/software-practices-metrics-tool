import { TrunkBasedMetricsGraphs } from "src/components/containers/TrunkBasedMetricsContainers/TrunkBasedMetricsGraphs/TrunkBasedMetricsGraphs";
import { TrunkBasedPullRequests } from "src/components/containers/TrunkBasedMetricsContainers/TrunkBasedPullRequests/TrunkBasedPullRequests";
import { ErrorBoundary } from "src/components/reusables/ErrorBoundary/ErrorBoundary";

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
          <TrunkBasedPullRequests startDate={dates.startDate} endDate={dates.endDate} />
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
