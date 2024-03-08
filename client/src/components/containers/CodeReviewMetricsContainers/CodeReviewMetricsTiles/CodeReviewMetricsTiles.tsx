import styles from "./CodeReviewMetricsTiles.module.scss";
import { appendHoursToNumber, getTileColor, getToolTipText } from "./codeReviewMetricsTilesUtils";
import { InfoIconTooltip } from "../../../reusables/InfoIconTooltip/InfoIconTooltip";
import { Tile } from "../../../reusables/Tile/Tile";

interface Props {
  averageFirstReviewResponseTime: number | string;
  averageApprovalTime: number | string;
  averageMergeTime: number | string;
}

const CODE_REVIEW_METRICS_TILE_HEADERS = {
  FIRST_REVIEW_RESPONSE: "Avg first review response time",
  APPROVAL_TIME: "Avg approval time",
  MERGE_TIME: "Avg merge time",
};

const PR_THRESHOLDS = {
  FIRST_REVIEW_RESPONSE_TIME: { MIN: 24, MAX: 48 },
  APPROVAL_TIME: { MIN: 48, MAX: 72 },
  MERGE_TIME: { MIN: 72, MAX: 96 },
};

const recommendedTimeForMetrics = {
  firstReviewResponseTime: (value: number) =>
    `Recommended time for first review response should be less than ${value} hours`,
  approvalTime: (value: number) => `Recommended time for approval should be less than ${value} hours`,
  mergeTime: (value: number) => `Recommended time for merge should be less than ${value} hours`,
};

export const CodeReviewMetricsTiles = ({
  averageFirstReviewResponseTime,
  averageApprovalTime,
  averageMergeTime,
}: Props) => {
  const firstReviewResponseTimeTextColor = getTileColor(
    PR_THRESHOLDS.FIRST_REVIEW_RESPONSE_TIME.MIN,
    PR_THRESHOLDS.FIRST_REVIEW_RESPONSE_TIME.MAX,
    averageFirstReviewResponseTime,
  );

  const approvalTimeTextColor = getTileColor(
    PR_THRESHOLDS.APPROVAL_TIME.MIN,
    PR_THRESHOLDS.APPROVAL_TIME.MAX,
    averageApprovalTime,
  );

  const mergeTimeTextColor = getTileColor(PR_THRESHOLDS.MERGE_TIME.MIN, PR_THRESHOLDS.MERGE_TIME.MAX, averageMergeTime);

  return (
    <>
      <Tile title={CODE_REVIEW_METRICS_TILE_HEADERS.FIRST_REVIEW_RESPONSE}>
        {typeof averageFirstReviewResponseTime !== "string" ? (
          <div className={styles.tileContent}>
            <InfoIconTooltip
              content={getToolTipText(
                averageFirstReviewResponseTime,
                recommendedTimeForMetrics.firstReviewResponseTime(PR_THRESHOLDS.FIRST_REVIEW_RESPONSE_TIME.MIN),
              )}
              size="16px"
            />
            <div>
              <span data-testid="first-review-response-time" className={styles[firstReviewResponseTimeTextColor]}>
                {appendHoursToNumber(averageFirstReviewResponseTime)}
              </span>
            </div>
          </div>
        ) : (
          <span>{averageFirstReviewResponseTime}</span>
        )}
      </Tile>
      <Tile title={CODE_REVIEW_METRICS_TILE_HEADERS.APPROVAL_TIME}>
        {typeof averageApprovalTime !== "string" ? (
          <div className={styles.tileContent}>
            <InfoIconTooltip
              content={getToolTipText(
                averageApprovalTime,
                recommendedTimeForMetrics.approvalTime(PR_THRESHOLDS.APPROVAL_TIME.MIN),
              )}
              size="16px"
            />
            <div>
              <span data-testid="approval-time" className={styles[approvalTimeTextColor]}>
                {appendHoursToNumber(averageApprovalTime)}
              </span>
            </div>
          </div>
        ) : (
          <span>{averageApprovalTime}</span>
        )}
      </Tile>
      <Tile title={CODE_REVIEW_METRICS_TILE_HEADERS.MERGE_TIME}>
        {typeof averageMergeTime !== "string" ? (
          <div className={styles.tileContent}>
            <InfoIconTooltip
              content={getToolTipText(
                averageMergeTime,
                recommendedTimeForMetrics.mergeTime(PR_THRESHOLDS.MERGE_TIME.MIN),
              )}
              size="16px"
            />
            <div>
              <span data-testid="merge-time" className={`${styles[mergeTimeTextColor]} mergeTime`}>
                {appendHoursToNumber(averageMergeTime)}
              </span>
            </div>
          </div>
        ) : (
          <span>{averageMergeTime}</span>
        )}
      </Tile>
    </>
  );
};
