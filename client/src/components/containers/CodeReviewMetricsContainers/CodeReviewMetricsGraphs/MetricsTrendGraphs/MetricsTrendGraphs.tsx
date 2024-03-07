import { LeastVotesAnalysisGraph } from "./LeastVotesGraph/LeastVotesGraph";
import styles from "./MetricsTrendGraphs.module.scss";
import { TimeMetricsAnalysisGraph } from "./TimeMetricsGraph/TimeMetricsGraph";
import { IPullRequestList } from "../../CodeReviewMetricsTable/interfaces";

interface Props {
  pullRequests: IPullRequestList[];
  startDate: Date;
  endDate: Date;
}

export const MetricsTrendAnalysisGraphs = ({
  pullRequests,
  startDate,
  endDate,
}: Props) => {
  return (
    <div className={styles.graphs}>
      <LeastVotesAnalysisGraph
        pullRequests={pullRequests}
        startDate={startDate}
        endDate={endDate}
      />

      <TimeMetricsAnalysisGraph
        pullRequests={pullRequests}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
};
