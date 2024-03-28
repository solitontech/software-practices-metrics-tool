import { IFetchedCodeReviewPullRequest } from "src/services/api/api";

import { LeastVotesAnalysisGraph } from "./LeastVotesGraph/LeastVotesGraph";
import styles from "./MetricsTrendGraphs.module.scss";
import { TimeMetricsAnalysisGraph } from "./TimeMetricsGraph/TimeMetricsGraph";

interface Props {
  pullRequests: IFetchedCodeReviewPullRequest[];
  startDate: Date;
  endDate: Date;
}

export const MetricsTrendAnalysisGraphs = ({ pullRequests, startDate, endDate }: Props) => {
  return (
    <div className={styles.graphs}>
      <LeastVotesAnalysisGraph pullRequests={pullRequests} startDate={startDate} endDate={endDate} />

      <TimeMetricsAnalysisGraph pullRequests={pullRequests} startDate={startDate} endDate={endDate} />
    </div>
  );
};
