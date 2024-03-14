import { ChangeEvent, useEffect, useState } from "react";

import { DateTime } from "luxon";
import "react-datepicker/dist/react-datepicker.css";

import { LoadingSpinner, SnackBar, TabToggle } from "src/components";

import styles from "./CodeReviewMetrics.module.scss";
import {
  CODE_REVIEW_METRICS,
  CODE_REVIEW_METRICS_TABS,
  CODE_REVIEW_METRICS_TAB_VALUE,
} from "./codeReviewMetricsConstants.tsx";
import { getMetricsAverageTimeInHours } from "./getMetricsAverageTimeInHours.tsx";
import { ClientFilters } from "../../components/containers/ClientFilters/ClientFilters.tsx";
import { CodeReviewSearchChips } from "../../components/containers/CodeReviewMetricsContainers/CodeReviewChips/CodeReviewSearchChips.tsx";
import {
  ALL_CHIPS,
  CHIP,
  ChipKey,
} from "../../components/containers/CodeReviewMetricsContainers/CodeReviewChips/codeReviewSearchChipsConstants.ts";
import { CodeReviewMetricsGraph } from "../../components/containers/CodeReviewMetricsContainers/CodeReviewMetricsGraphs/MetricsGraphs/CodeReviewMetricsGraph.tsx";
import { MetricsTrendAnalysisGraphs } from "../../components/containers/CodeReviewMetricsContainers/CodeReviewMetricsGraphs/MetricsTrendGraphs/MetricsTrendGraphs.tsx";
import { CodeReviewMetricsTable } from "../../components/containers/CodeReviewMetricsContainers/CodeReviewMetricsTable/CodeReviewMetricsTable.tsx";
import { CodeReviewMetricsTiles } from "../../components/containers/CodeReviewMetricsContainers/CodeReviewMetricsTiles/CodeReviewMetricsTiles.tsx";
import { CommonLayout } from "../../components/reusables/CommonLayout/CommonLayout";
import { DateRangePicker } from "../../components/reusables/DateRangePicker/DateRangePicker.tsx";
import { ErrorBoundary } from "../../components/reusables/ErrorBoundary/ErrorBoundary.tsx";
import { SearchBox } from "../../components/reusables/SearchBox/SearchBox.tsx";
import { useCodeReviewMetrics } from "../../fetchers/hooks/codeReview/useCodeReviewMetrics.hook.ts";
import { filterPullRequests } from "../../utils/filterPullRequests.tsx";

const today = DateTime.local();
const sevenDaysAgoFromToday = today.minus({ days: 7 });
const sixMonthsAgoFromToday = today.minus({ days: 190 });
const metricsToggleTabs = CODE_REVIEW_METRICS_TABS;

const PLACEHOLDER = "Search for date, title, tags, author, reviewer & status";
const SEARCH_BOX_ID = "search-box";

type CodeReviewMetricsView = "table" | "graph" | "trend-graph";

export const CodeReviewMetrics = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isSearchBoxDropdownOpen, setIsSearchBoxDropdownOpen] = useState(false);
  const [searchPlaceHolder, setSearchPlaceHolder] = useState<string>(PLACEHOLDER);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChips, setSelectedChips] = useState(ALL_CHIPS);
  const [selectedView, setSelectedView] = useState<CodeReviewMetricsView>(
    CODE_REVIEW_METRICS_TAB_VALUE.TABLE as CodeReviewMetricsView,
  );
  const [dates, setDates] = useState({
    startDate: sevenDaysAgoFromToday.toJSDate(),
    endDate: today.toJSDate(),
  });

  const {
    isPending,
    isError,
    data: { pullRequests, errorCount },
    error,
  } = useCodeReviewMetrics(dates.startDate, dates.endDate);

  const searchedPullRequests = searchTerm ? filterPullRequests(pullRequests, selectedChips, searchTerm) : pullRequests;

  const averageFirstReviewResponseTime = getMetricsAverageTimeInHours(
    searchedPullRequests,
    CODE_REVIEW_METRICS.FIRST_REVIEW_RESPONSE,
  );

  const averageApprovalTime = getMetricsAverageTimeInHours(searchedPullRequests, CODE_REVIEW_METRICS.APPROVAL_TIME);

  const averageMergeTime = getMetricsAverageTimeInHours(searchedPullRequests, CODE_REVIEW_METRICS.MERGE_TIME);

  const handleViewChange = (newView: string) => {
    setSelectedView(newView as CodeReviewMetricsView);
  };

  const handleSearchBoxOutsideClick = (event: MouseEvent) => {
    // TODO: This is broken and needs to be fixed
    const searchBox = document.getElementById(SEARCH_BOX_ID);

    if (searchBox && !searchBox.contains(event.target as Node)) {
      setIsSearchBoxDropdownOpen(false);
    }
  };

  const isTableView = () => {
    return selectedView === (CODE_REVIEW_METRICS_TAB_VALUE.TABLE as CodeReviewMetricsView);
  };

  const isGraphView = () => {
    return selectedView === (CODE_REVIEW_METRICS_TAB_VALUE.GRAPH as CodeReviewMetricsView);
  };

  const isTrendAnalysisView = () => {
    return selectedView === (CODE_REVIEW_METRICS_TAB_VALUE.TREND_GRAPH as CodeReviewMetricsView);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleSearchBoxOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleSearchBoxOutsideClick);
    };
  }, []);

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

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.trim().toLocaleLowerCase());
  };

  const handleChipClick = (chipKey: ChipKey) => {
    const chip = CHIP.find((chip) => chip.chipKey === chipKey);
    const keyAsString = chipKey.toString();

    if (!chip) {
      return;
    }

    if (selectedChips.includes(chip.chipKey)) {
      setSelectedChips(ALL_CHIPS);
      setSearchPlaceHolder(PLACEHOLDER);
    } else {
      setSelectedChips(keyAsString);
      setSearchPlaceHolder(chip.placeholder);
    }
  };

  return (
    <ErrorBoundary key="code-review-metrics">
      <CommonLayout
        title="Code Review Metrics"
        actions={
          <div>
            <SearchBox
              onChange={handleSearchChange}
              label="Search Pull Requests"
              width={380}
              placeHolder={searchPlaceHolder}
              isDebounced={true}
              onClick={() => setIsSearchBoxDropdownOpen(true)}
            ></SearchBox>
            {isSearchBoxDropdownOpen && (
              <div className={styles.dropDown}>
                {CHIP.map((chip) => (
                  <CodeReviewSearchChips
                    key={chip.chipKey}
                    label={chip.chipLabel}
                    selected={selectedChips.includes(chip.chipKey)}
                    onClick={() => handleChipClick(chip.chipKey as keyof typeof CHIP)}
                  />
                ))}
              </div>
            )}
            <ClientFilters />
          </div>
        }
      >
        <div className={styles.codeReview}>
          <SnackBar
            isOpen={snackbarOpen}
            handleClose={() => {
              setSnackbarOpen(false);
            }}
            message={`Failed to fetch ${errorCount} pull request. Please try again.`}
          />
          <div className={styles.tableDetails}>
            <div className={styles.header}>
              <DateRangePicker
                date={dates}
                handleStartDateChange={(date: Date) => handleDateChange(date, "startDate")}
                handleEndDateChange={(date: Date) => handleDateChange(date, "endDate")}
                minDate={sixMonthsAgoFromToday.toJSDate()}
                maxDate={today.toJSDate()}
              />
              <TabToggle tabs={metricsToggleTabs} selectedTab={selectedView} handleTabChange={handleViewChange} />
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
