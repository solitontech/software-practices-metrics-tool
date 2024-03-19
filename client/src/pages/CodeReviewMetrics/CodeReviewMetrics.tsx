import { ChangeEvent, useEffect, useState } from "react";

import {
  LoadingSpinner,
  SnackBar,
  TabToggle,
  CommonLayout,
  DateRangePicker,
  ErrorBoundary,
  CodeReviewMetricsGraph,
  MetricsTrendAnalysisGraphs,
  CodeReviewMetricsTable,
  CodeReviewMetricsTiles,
  CodeReviewSearchBox,
} from "src/components/components";
import { dateRange } from "src/constants/constants";
import { useCodeReviewMetrics } from "src/services/api/api";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./CodeReviewMetrics.module.scss";
import {
  CODE_REVIEW_METRICS,
  CODE_REVIEW_METRICS_TABS,
  CODE_REVIEW_METRICS_TAB_VALUE,
} from "./codeReviewMetricsConstants.tsx";
import { filterPullRequests } from "./codeReviewMetricsUtils.ts";
import { getMetricsAverageTimeInHours } from "./getMetricsAverageTimeInHours.tsx";

type CodeReviewMetricsView = "table" | "graph" | "trend-graph";

export const CodeReviewMetrics = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChip, setSelectedChip] = useState("");
  const [selectedTab, setSelectedTab] = useState<CodeReviewMetricsView>(
    CODE_REVIEW_METRICS_TAB_VALUE.TABLE as CodeReviewMetricsView,
  );
  const [dates, setDates] = useState({
    startDate: dateRange.sevenDaysAgoFromToday,
    endDate: dateRange.today,
  });

  const {
    isPending,
    isError,
    data: { pullRequests, errorCount },
    error,
  } = useCodeReviewMetrics(dates.startDate, dates.endDate);

  const searchedPullRequests = searchTerm ? filterPullRequests(pullRequests, selectedChip, searchTerm) : pullRequests;

  const averageFirstReviewResponseTime = getMetricsAverageTimeInHours(
    searchedPullRequests,
    CODE_REVIEW_METRICS.FIRST_REVIEW_RESPONSE,
  );

  const averageApprovalTime = getMetricsAverageTimeInHours(searchedPullRequests, CODE_REVIEW_METRICS.APPROVAL_TIME);

  const averageMergeTime = getMetricsAverageTimeInHours(searchedPullRequests, CODE_REVIEW_METRICS.MERGE_TIME);

  const isTableView = () => {
    return selectedTab === (CODE_REVIEW_METRICS_TAB_VALUE.TABLE as CodeReviewMetricsView);
  };

  const isGraphView = () => {
    return selectedTab === (CODE_REVIEW_METRICS_TAB_VALUE.GRAPH as CodeReviewMetricsView);
  };

  const isTrendAnalysisView = () => {
    return selectedTab === (CODE_REVIEW_METRICS_TAB_VALUE.TREND_GRAPH as CodeReviewMetricsView);
  };

  useEffect(() => {
    if (errorCount > 0) {
      setSnackbarOpen(true);
    } else {
      setSnackbarOpen(false);
    }
  }, [errorCount]);

  const renderView = () => {
    if (isPending) {
      return <LoadingSpinner content="Loading pull requests..." />;
    }

    if (isError && error) {
      return <p className={styles.errorMessage}>{error?.response?.data.error}</p>;
    }

    if (isTableView()) {
      return (
        <div className={styles.codeReviewTable}>
          <ErrorBoundary key="code-review-table">
            <CodeReviewMetricsTable pullRequests={searchedPullRequests} />
          </ErrorBoundary>
        </div>
      );
    }

    if (isGraphView()) {
      return (
        <ErrorBoundary key="code-review-graph">
          <CodeReviewMetricsGraph
            pullRequests={searchedPullRequests}
            averageFirstReviewResponseTime={averageFirstReviewResponseTime}
            averageApprovalTime={averageApprovalTime}
            averageMergeTime={averageMergeTime}
          />
        </ErrorBoundary>
      );
    }

    if (isTrendAnalysisView()) {
      return (
        <ErrorBoundary key="code-review-trend">
          <MetricsTrendAnalysisGraphs
            pullRequests={searchedPullRequests}
            startDate={dates.startDate}
            endDate={dates.endDate}
          />
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
    <ErrorBoundary key="code-review-metrics">
      <CommonLayout
        title="Code Review Metrics"
        actions={
          <CodeReviewSearchBox
            selectedChip={selectedChip}
            handleChipChange={setSelectedChip}
            handleSearchChange={(event: ChangeEvent<HTMLInputElement>) => {
              setSearchTerm(event.target.value.trim().toLocaleLowerCase());
            }}
          />
        }
      >
        <div className={styles.codeReview}>
          <SnackBar
            isOpen={snackbarOpen}
            message={`Failed to fetch ${errorCount} pull request. Please try again.`}
            handleClose={() => setSnackbarOpen(false)}
          />
          <div className={styles.tableDetails}>
            <div className={styles.header}>
              <DateRangePicker
                minDate={dateRange.sixMonthsAgoFromToday}
                maxDate={dateRange.today}
                date={dates}
                handleStartDateChange={(date: Date) => handleDateChange(date, "startDate")}
                handleEndDateChange={(date: Date) => handleDateChange(date, "endDate")}
              />
              <TabToggle
                tabs={CODE_REVIEW_METRICS_TABS}
                selectedTab={selectedTab}
                handleTabChange={(value) => setSelectedTab(value as CodeReviewMetricsView)}
              />
              <div className={styles.tiles}>
                <CodeReviewMetricsTiles
                  averageFirstReviewResponseTime={averageFirstReviewResponseTime}
                  averageApprovalTime={averageApprovalTime}
                  averageMergeTime={averageMergeTime}
                />
              </div>
            </div>
          </div>
          {renderView()}
        </div>
      </CommonLayout>
    </ErrorBoundary>
  );
};
