import { useState } from "react";

import { DateTime } from "luxon";

import { CommonLayout, DateRangePicker, MetricsToggleTab, ErrorBoundary } from "src/components";

import styles from "./TrunkBasedMetrics.module.scss";
import { TRUNK_BASED_METRICS_TABS, TRUNK_BASED_METRICS_TAB_VALUE } from "./trunkBasedMetricsConstants";
import { TrunkBasedMetricsGraphs } from "../../components/containers/TrunkBasedMetricsContainers/TrunkBasedMetricsGraphs/TrunkBasedMetricsGraphs";
import { TrunkBasedMetricsTiles } from "../../components/containers/TrunkBasedMetricsContainers/TrunkBasedMetricsTiles/TrunkBasedMetricsTiles";
import { TrunkBasedPullRequestsTable } from "../../components/containers/TrunkBasedMetricsContainers/TrunkBasedPullRequestsTable/TrunkBasedPullRequestsTable";
import { IMetricsView } from "../../components/reusables/MetricsToggleTab/interfaces";

const today = DateTime.local();
const sevenDaysAgoFromToday = today.minus({ days: 7 });
const sixMonthsAgoFromToday = today.minus({ days: 190 });
const metricsToggleTabs = TRUNK_BASED_METRICS_TABS as IMetricsView<TrunkBasedMetricsView>[];

type TrunkBasedMetricsView = "table" | "graph";

export const TrunkBasedMetrics = () => {
  const [selectedView, setSelectedView] = useState<TrunkBasedMetricsView>(
    TRUNK_BASED_METRICS_TAB_VALUE.TABLE as TrunkBasedMetricsView,
  );

  const [dates, setDates] = useState({
    startDate: sevenDaysAgoFromToday.toJSDate(),
    endDate: today.toJSDate(),
  });

  const handleViewChange = (newView: TrunkBasedMetricsView) => {
    setSelectedView(newView);
  };

  const isTableView = () => {
    return selectedView === (TRUNK_BASED_METRICS_TAB_VALUE.TABLE as TrunkBasedMetricsView);
  };

  const isGraphView = () => {
    return selectedView === (TRUNK_BASED_METRICS_TAB_VALUE.GRAPH as TrunkBasedMetricsView);
  };

  const renderView = () => {
    if (isTableView()) {
      return (
        <div className={styles.trunkBasedTable}>
          <ErrorBoundary key="trunk-based-table">
            <TrunkBasedPullRequestsTable startDate={dates.startDate} endDate={dates.endDate} />
          </ErrorBoundary>
        </div>
      );
    }

    if (isGraphView()) {
      return (
        <ErrorBoundary key="trunk-based-graph">
          <TrunkBasedMetricsGraphs startDate={dates.startDate} endDate={dates.endDate} />
        </ErrorBoundary>
      );
    }
  };

  const handleDateChange = (date: Date, dateType: "startDate" | "endDate") => {
    setDates((prevDates) => ({
      ...prevDates,
      [dateType]: date || prevDates[dateType],
    }));
  };

  return (
    <ErrorBoundary key="trunk-based-metrics">
      <CommonLayout title="Trunk Based Metrics">
        <div className={styles.trunkBased}>
          <div className={styles.tableDetails}>
            <div className={styles.header}>
              <DateRangePicker
                date={dates}
                onStartDateChange={(date: Date) => handleDateChange(date, "startDate")}
                onEndDateChange={(date: Date) => handleDateChange(date, "endDate")}
                minDate={sixMonthsAgoFromToday.toJSDate()}
                maxDate={today.toJSDate()}
              />
              <MetricsToggleTab
                metricsViews={metricsToggleTabs}
                selectedView={selectedView}
                onViewChange={handleViewChange}
              />
              <div className={styles.tiles}>
                <TrunkBasedMetricsTiles />
              </div>
            </div>
          </div>

          {renderView()}
        </div>
      </CommonLayout>
    </ErrorBoundary>
  );
};
