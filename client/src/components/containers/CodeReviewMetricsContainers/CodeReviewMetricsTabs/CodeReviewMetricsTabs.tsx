import {
  LoadingSpinner,
  ErrorBoundary,
  CodeReviewMetricsGraph,
  MetricsTrendAnalysisGraphs,
  CodeReviewMetricsTable,
} from "src/components/components";
import { IFetchedCodeReviewPullRequest } from "src/services/api/api";

import styles from "./CodeReviewMetricsTabs.module.scss";

interface ICodeReviewMetricsTabsProps {
  dates: {
    startDate: Date;
    endDate: Date;
  };
  selectedTab: "table" | "graph" | "trendGraph";
  pullRequests: IFetchedCodeReviewPullRequest[];
  isPending: boolean;
  isError: boolean;
  errorMessage: string;
  firstReviewResponseTime: string | number;
  approvalTime: string | number;
  mergeTime: string | number;
}

export const CodeReviewMetricsTabs = ({
  selectedTab,
  dates,
  pullRequests,
  isPending,
  isError,
  errorMessage,
  firstReviewResponseTime,
  approvalTime,
  mergeTime,
}: ICodeReviewMetricsTabsProps) => {
  if (isPending) {
    return <LoadingSpinner content="Loading pull requests..." />;
  }

  if (isError) {
    return <p className={styles.errorMessage}>{errorMessage}</p>;
  }

  if (selectedTab === "table") {
    return (
      <div className={styles.codeReviewTable}>
        <ErrorBoundary key="code-review-table">
          <CodeReviewMetricsTable pullRequests={pullRequests} />
        </ErrorBoundary>
      </div>
    );
  }

  if (selectedTab === "graph") {
    return (
      <ErrorBoundary key="code-review-graph">
        <CodeReviewMetricsGraph
          pullRequests={pullRequests}
          averageFirstReviewResponseTime={firstReviewResponseTime}
          averageApprovalTime={approvalTime}
          averageMergeTime={mergeTime}
        />
      </ErrorBoundary>
    );
  }

  if (selectedTab === "trendGraph") {
    return (
      <ErrorBoundary key="code-review-trend-graph">
        <MetricsTrendAnalysisGraphs pullRequests={pullRequests} startDate={dates.startDate} endDate={dates.endDate} />
      </ErrorBoundary>
    );
  }

  return null;
};
