import { LeastVotesGraph } from "./LeastVotesGraph/LeastVotesGraph";
import styles from "./MetricsGraph.module.scss";
import { getGraphObject } from "./metricsGraphUtils";
import { TimeMetricsGraph } from "./TimeMetricsGraph/TimeMetricsGraph";
import { IFetchedCodeReviewPullRequest } from "../../../../../fetchers";
import { CODE_REVIEW_METRICS } from "../../../../../pages/CodeReviewMetrics/codeReviewMetricsConstants";
interface Props {
  pullRequests: IFetchedCodeReviewPullRequest[];
  averageFirstReviewResponseTime: number | string;
  averageApprovalTime: number | string;
  averageMergeTime: number | string;
}

export const CodeReviewMetricsGraph = ({
  pullRequests,
  averageFirstReviewResponseTime,
  averageApprovalTime,
  averageMergeTime,
}: Props) => {
  return (
    <div className={styles.graphs}>
      <TimeMetricsGraph
        graphObject={getGraphObject(pullRequests, CODE_REVIEW_METRICS.FIRST_REVIEW_RESPONSE, "first review response")}
        averageTime={averageFirstReviewResponseTime}
      />

      <TimeMetricsGraph
        graphObject={getGraphObject(pullRequests, CODE_REVIEW_METRICS.APPROVAL_TIME, "approval")}
        averageTime={averageApprovalTime}
      />

      <TimeMetricsGraph
        graphObject={getGraphObject(pullRequests, CODE_REVIEW_METRICS.MERGE_TIME, "merge")}
        averageTime={averageMergeTime}
      />
      {pullRequests.length && <LeastVotesGraph pullRequests={pullRequests}></LeastVotesGraph>}
    </div>
  );
};
