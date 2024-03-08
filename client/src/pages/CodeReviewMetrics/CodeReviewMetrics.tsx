import { ChangeEvent, useEffect, useState } from "react";

import { DateTime } from "luxon";
import "react-datepicker/dist/react-datepicker.css";

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
import { DisplayError } from "../../components/reusables/DisplayError/DisplayError.tsx";
import { LoadingSpinner } from "../../components/reusables/LoadingSpinner/LoadingSpinner.tsx";
import { IMetricsView } from "../../components/reusables/MetricsToggleTab/interfaces.tsx";
import { MetricsToggleTab } from "../../components/reusables/MetricsToggleTab/MetricsToggleTab.tsx";
import { SearchBox } from "../../components/reusables/SearchBox/SearchBox.tsx";
import SnackbarMessage from "../../components/reusables/SnackbarMessage/SnackbarMessage.tsx";
import { ErrorBoundary } from "../../errorBoundary/ErrorBoundary.tsx";
import { useCodeReviewMetrics } from "../../fetchers/hooks/codeReview/useCodeReviewMetrics.ts";
import { filterPullRequests } from "../../utils/filterPullRequests.tsx";

const today = DateTime.local();
const sevenDaysAgoFromToday = today.minus({ days: 7 });
const sixMonthsAgoFromToday = today.minus({ days: 190 });
const metricsToggleTabs = CODE_REVIEW_METRICS_TABS as IMetricsView<CodeReviewMetricsView>[];

const PLACEHOLDER = "Search for date, title, tags, author, reviewer & status";
const SEARCH_BOX_ID = "search-box";

type CodeReviewMetricsView = "table" | "graph" | "trend-graph";

export const CodeReviewMetrics = () => {
  const [selectedChips, setSelectedChips] = useState(ALL_CHIPS);

  const [searchPlaceHolder, setSearchPlaceHolder] = useState<string>(PLACEHOLDER);

  const [isSearchBoxDropdownOpen, setIsSearchBoxDropdownOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [selectedView, setSelectedView] = useState<CodeReviewMetricsView>(
    CODE_REVIEW_METRICS_TAB_VALUE.TABLE as CodeReviewMetricsView,
  );

  const [dates, setDates] = useState({
    startDate: sevenDaysAgoFromToday.toJSDate(),
    endDate: today.toJSDate(),
  });

  const {
    isLoading,
    data: { pullRequestList, errorCount },
    error,
  } = useCodeReviewMetrics(dates.startDate, dates.endDate);

  const searchedPullRequests = searchTerm
    ? filterPullRequests(pullRequestList, selectedChips, searchTerm)
    : pullRequestList;

  const averageFirstReviewResponseTime = getMetricsAverageTimeInHours(
    searchedPullRequests,
    CODE_REVIEW_METRICS.FIRST_REVIEW_RESPONSE,
  );

  const averageApprovalTime = getMetricsAverageTimeInHours(searchedPullRequests, CODE_REVIEW_METRICS.APPROVAL_TIME);

  const averageMergeTime = getMetricsAverageTimeInHours(searchedPullRequests, CODE_REVIEW_METRICS.MERGE_TIME);

  const handleViewChange = (newView: CodeReviewMetricsView) => {
    setSelectedView(newView);
  };

  const handleSearchBoxOutsideClick = (event: MouseEvent) => {
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
    if (isLoading) {
      return <LoadingSpinner content="Loading pull requests..." />;
    }

    if (error) {
      return <DisplayError error={error.response.data.error} />;
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
    <CommonLayout
      id={SEARCH_BOX_ID}
      pageHeader="Code Review Metrics"
      searchBox={
        <SearchBox
          onChange={handleSearchChange}
          label="Search Pull Requests"
          width={380}
          placeHolder={searchPlaceHolder}
          isDebounced={true}
          onClick={() => setIsSearchBoxDropdownOpen(true)}
        ></SearchBox>
      }
      filter={<ClientFilters />}
      searchDialogBox={
        isSearchBoxDropdownOpen && (
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
        )
      }
    >
      <div className={styles.codeReview}>
        <SnackbarMessage
          open={snackbarOpen}
          onClose={() => {
            setSnackbarOpen(false);
          }}
          message={`Failed to fetch ${errorCount} pull request. Please try again.`}
        />
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
  );
};
