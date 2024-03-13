import { useState } from "react";

import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import TableRowsIcon from "@mui/icons-material/TableRows";

import {
  CommonLayout,
  DateRangePicker,
  TabToggle,
  ErrorBoundary,
  TrunkBasedMetricsTabs,
  TrunkBasedMetricsTiles,
} from "src/components";
import { dateRange } from "src/constants";

import styles from "./TrunkBasedMetrics.module.scss";
import { ITrukBasedMetricsTabs, ITrunkBasedMetricsTabValue } from "./types";

const tabs: ITrukBasedMetricsTabs[] = [
  {
    label: "TABLE VIEW",
    value: "table",
    icon: <TableRowsIcon />,
  },
  {
    label: "GRAPHICAL VIEW",
    value: "graph",
    icon: <BarChartOutlinedIcon />,
  },
];

export const TrunkBasedMetrics = () => {
  const [selectedTab, setSelectedTab] = useState<ITrunkBasedMetricsTabValue>("table");
  const [dates, setDates] = useState({
    startDate: dateRange.sevenDaysAgoFromToday,
    endDate: dateRange.today,
  });

  const handleDateChange = (date: Date, dateType: "startDate" | "endDate") => {
    setDates((prevDates) => ({
      ...prevDates,
      [dateType]: date ?? prevDates[dateType],
    }));
  };

  return (
    <ErrorBoundary key="trunk-based-metrics">
      <CommonLayout title="Trunk Based Metrics">
        <div className={styles.container}>
          <div className={styles.tableDetails}>
            <div className={styles.header}>
              <DateRangePicker
                date={dates}
                handleStartDateChange={(date: Date) => handleDateChange(date, "startDate")}
                handleEndDateChange={(date: Date) => handleDateChange(date, "endDate")}
                minDate={dateRange.sixMonthsAgoFromToday}
                maxDate={dateRange.today}
              />
              <TabToggle
                tabs={tabs}
                selectedTab={selectedTab}
                handleTabChange={(value) => setSelectedTab(value as ITrunkBasedMetricsTabValue)}
              />
              <div className={styles.tiles}>
                <TrunkBasedMetricsTiles />
              </div>
            </div>
          </div>
          <TrunkBasedMetricsTabs dates={dates} selectedTab={selectedTab} />
        </div>
      </CommonLayout>
    </ErrorBoundary>
  );
};
