import { LeastVotesAnalysisGraph } from "./LeastVotesGraph/LeastVotesGraph";
import styles from "./MetricsTrendGraphs.module.scss";
import { TimeMetricsAnalysisGraph } from "./TimeMetricsGraph/TimeMetricsGraph";
import { IFetchersCodeReviewPullRequest } from "../../../../../fetchers";

interface Props {
  pullRequests: IFetchersCodeReviewPullRequest[];
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
