import { ChangeEvent, useEffect, useState } from "react";

import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import TableRowsIcon from "@mui/icons-material/TableRows";

import { CodeReviewMetricsTabs } from "src/components/containers/CodeReviewMetricsContainers/CodeReviewMetricsTabs/CodeReviewMetricsTabs.tsx";
import { CodeReviewMetricsTiles } from "src/components/containers/CodeReviewMetricsContainers/CodeReviewMetricsTiles/CodeReviewMetricsTiles.tsx";
import { CodeReviewSearchBox } from "src/components/containers/CodeReviewMetricsContainers/CodeReviewSearchBox/CodeReviewSearchBox.tsx";
import { CommonLayout } from "src/components/reusables/CommonLayout/CommonLayout.tsx";
import { DateRangePicker } from "src/components/reusables/DateRangePicker/DateRangePicker.tsx";
import { ErrorBoundary } from "src/components/reusables/ErrorBoundary/ErrorBoundary.tsx";
import { SnackBar } from "src/components/reusables/SnackBar/SnackBar.tsx";
import { TabToggle } from "src/components/reusables/TabToggle/TabToggle.tsx";
import { dateRange } from "src/constants/constants";
import { useCodeReviewMetrics } from "src/services/api/api";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./CodeReviewMetrics.module.scss";
import { CODE_REVIEW_METRICS, CHIPS } from "./codeReviewMetricsConstants";
import { ICodeReviewMetricsTabValue } from "./codeReviewMetricsType.ts";
import { CodeReviewMetricsUtil } from "./codeReviewMetricsUtils.ts";

const CODE_REVIEW_METRICS_TABS = [
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
  {
    label: "TREND ANALYSIS",
    value: "trendGraph",
    icon: <InsightsOutlinedIcon />,
  },
];

export const CodeReviewMetrics = () => {
  const [dates, setDates] = useState({
    startDate: dateRange.sevenDaysAgoFromToday,
    endDate: dateRange.today,
  });
  const [selectedTab, setSelectedTab] = useState<ICodeReviewMetricsTabValue>("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChip, setSelectedChip] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const {
    isPending,
    isError,
    data: { pullRequests, errorCount },
    error,
  } = useCodeReviewMetrics(dates.startDate, dates.endDate);

  const searchedPullRequests = searchTerm
    ? CodeReviewMetricsUtil.filterPullRequests(pullRequests, selectedChip, searchTerm)
    : pullRequests;

  const firstReviewResponseTime = CodeReviewMetricsUtil.getMetricsAverageTimeInHours(
    searchedPullRequests,
    CODE_REVIEW_METRICS.FIRST_REVIEW_RESPONSE,
  );

  const approvalTime = CodeReviewMetricsUtil.getMetricsAverageTimeInHours(
    searchedPullRequests,
    CODE_REVIEW_METRICS.APPROVAL_TIME,
  );

  const mergeTime = CodeReviewMetricsUtil.getMetricsAverageTimeInHours(
    searchedPullRequests,
    CODE_REVIEW_METRICS.MERGE_TIME,
  );

  useEffect(() => {
    if (errorCount) {
      return setSnackbarOpen(true);
    }

    setSnackbarOpen(false);
  }, [errorCount]);

  const handleDateChange = (date: Date, dateType: "startDate" | "endDate") => {
    setDates((prevDates) => {
      return { ...prevDates, [dateType]: date ?? prevDates[dateType] };
    });
  };

  const handleTabChange = (value: string) => {
    setSelectedTab(value as ICodeReviewMetricsTabValue);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  return (
    <ErrorBoundary key="code-review-metrics">
      <CommonLayout
        title="Code Review Metrics"
        actions={
          <CodeReviewSearchBox
            selectedChip={selectedChip}
            chips={CHIPS}
            handleChipChange={setSelectedChip}
            handleSearchChange={handleSearchChange}
          />
        }
      >
        <div className={styles.container}>
          <SnackBar
            isOpen={snackbarOpen}
            message={`Failed to fetch ${errorCount} pull request. Please try again.`}
            handleClose={() => setSnackbarOpen(false)}
          />
          <div className={styles.headerContainer}>
            <DateRangePicker
              minDate={dateRange.sixMonthsAgoFrom(dates.endDate)}
              maxDate={dateRange.futureDateFrom(dates.startDate)}
              date={dates}
              handleStartDateChange={(date: Date) => handleDateChange(date, "startDate")}
              handleEndDateChange={(date: Date) => handleDateChange(date, "endDate")}
            />
            <TabToggle tabs={CODE_REVIEW_METRICS_TABS} selectedTab={selectedTab} handleTabChange={handleTabChange} />
            <div className={styles.tilesContainer}>
              <CodeReviewMetricsTiles
                firstReviewResponseTime={firstReviewResponseTime}
                approvalTime={approvalTime}
                mergeTime={mergeTime}
              />
            </div>
          </div>
          <div className={styles.tabContainer}>
            <CodeReviewMetricsTabs
              selectedTab={selectedTab}
              dates={dates}
              pullRequests={searchedPullRequests}
              isPending={isPending}
              isError={isError}
              errorMessage={error?.response?.data?.error ?? ""}
              firstReviewResponseTime={firstReviewResponseTime}
              approvalTime={approvalTime}
              mergeTime={mergeTime}
            />
          </div>
        </div>
      </CommonLayout>
    </ErrorBoundary>
  );
};
