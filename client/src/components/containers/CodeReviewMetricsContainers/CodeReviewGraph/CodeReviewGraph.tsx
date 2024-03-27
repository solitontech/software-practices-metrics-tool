import { IFetchedCodeReviewPullRequest } from "src/services/api/api";

import styles from "./CodeReviewGraph.module.scss";
import { GRAPH_KEY_LABEL } from "./codeReviewGraphConstants";
import { CodeReviewGraphLeastVotes } from "./CodeReviewGraphLeastVotes/CodeReviewGraphLeastVotes";
import { CodeReviewGraphTimeMetrics } from "./CodeReviewGraphTimeMetrics/CodeReviewGraphTimeMetrics";
import { CodeReviewGraphUtils } from "./codeReviewGraphUtils";

interface ICodeReviewGraphProps {
  pullRequests: IFetchedCodeReviewPullRequest[];
  firstReviewResponseTime: number | string;
  approvalTime: number | string;
  mergeTime: number | string;
}

export const CodeReviewGraph = ({
  pullRequests,
  firstReviewResponseTime,
  approvalTime,
  mergeTime,
}: ICodeReviewGraphProps) => {
  return (
    <div className={styles.graphContainer}>
      <CodeReviewGraphTimeMetrics
        averageTime={firstReviewResponseTime}
        graphObject={CodeReviewGraphUtils.getGraphObject(
          pullRequests,
          GRAPH_KEY_LABEL.FIRST_REVIEW_RESPONSE.KEY,
          GRAPH_KEY_LABEL.FIRST_REVIEW_RESPONSE.LABEL,
        )}
      />

      <CodeReviewGraphTimeMetrics
        averageTime={approvalTime}
        graphObject={CodeReviewGraphUtils.getGraphObject(
          pullRequests,
          GRAPH_KEY_LABEL.APPROVAL_TIME.KEY,
          GRAPH_KEY_LABEL.APPROVAL_TIME.LABEL,
        )}
      />

      <CodeReviewGraphTimeMetrics
        averageTime={mergeTime}
        graphObject={CodeReviewGraphUtils.getGraphObject(
          pullRequests,
          GRAPH_KEY_LABEL.MERGE_TIME.KEY,
          GRAPH_KEY_LABEL.MERGE_TIME.LABEL,
        )}
      />

      {pullRequests.length && <CodeReviewGraphLeastVotes pullRequests={pullRequests} />}
    </div>
  );
};
