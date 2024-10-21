import { useState } from "react";

import { TrunkBasedMetricsTabs } from "src/components/containers/TrunkBasedMetricsContainers/TrunkBasedMetricsTabs/TrunkBasedMetricsTabs";
import { TrunkBasedMetricsTiles } from "src/components/containers/TrunkBasedMetricsContainers/TrunkBasedMetricsTiles/TrunkBasedMetricsTiles";
import { CommonLayout } from "src/components/reusables/CommonLayout/CommonLayout";
import { DateRangePicker } from "src/components/reusables/DateRangePicker/DateRangePicker";
import { ErrorBoundary } from "src/components/reusables/ErrorBoundary/ErrorBoundary";
import { TabToggle } from "src/components/reusables/TabToggle/TabToggle";
import { dateRange } from "src/constants/constants";

import styles from "./TrunkBasedMetrics.module.scss";
import { trunkBasedTabs } from "./trunkBasedMetricsConstants";
import { ITrunkBasedMetricsTabValue } from "./trunkBasedMetricsTypes";

export const TrunkBasedMetrics = () => {
  const [selectedTab, setSelectedTab] = useState<ITrunkBasedMetricsTabValue>("table");
  const [dates, setDates] = useState({
    startDate: dateRange.sevenDaysAgoFromToday,
    endDate: dateRange.today,
  });

  const handleDateChange = (date: Date, dateType: "startDate" | "endDate") => {
    setDates((prevDates) => {
      return { ...prevDates, [dateType]: date ?? prevDates[dateType] };
    });
  };

  const handleTabChange = (value: string) => {
    setSelectedTab(value as ITrunkBasedMetricsTabValue);
  };

  return (
    <ErrorBoundary key="trunk-based-metrics">
      <CommonLayout title="Trunk Based Metrics">
        <div className={styles.container}>
          <div className={styles.headerContainer}>
            <DateRangePicker
              date={dates}
              handleStartDateChange={(date: Date) => handleDateChange(date, "startDate")}
              handleEndDateChange={(date: Date) => handleDateChange(date, "endDate")}
              minDate={dateRange.sixMonthsAgoFrom(dates.endDate)}
              maxDate={dateRange.futureDateFrom(dates.startDate)}
            />
            <TabToggle tabs={trunkBasedTabs} selectedTab={selectedTab} handleTabChange={handleTabChange} />
            <div className={styles.tilesContainer}>
              <TrunkBasedMetricsTiles />
            </div>
          </div>
          <TrunkBasedMetricsTabs dates={dates} selectedTab={selectedTab} />
        </div>
      </CommonLayout>
    </ErrorBoundary>
  );
};
