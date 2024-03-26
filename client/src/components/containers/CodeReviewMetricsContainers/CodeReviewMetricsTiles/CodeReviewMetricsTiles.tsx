import React from "react";

import { InfoIconTooltip, Tile } from "src/components/components";

import styles from "./CodeReviewMetricsTiles.module.scss";
import { HEADERS, THRESHOLDS, recommendedTime } from "./codeReviewMetricsTilesConstants";
import { CodeReviewMetricsTilesUtil } from "./codeReviewMetricsTilesUtils";

interface ICodeReviewMetricsTilesProps {
  firstReviewResponseTime: number | string;
  approvalTime: number | string;
  mergeTime: number | string;
}

export const CodeReviewMetricsTiles = ({
  firstReviewResponseTime,
  approvalTime,
  mergeTime,
}: ICodeReviewMetricsTilesProps) => {
  const firstReviewResponseTimeClass = CodeReviewMetricsTilesUtil.getTileClass(
    THRESHOLDS.FIRST_REVIEW.MIN,
    THRESHOLDS.FIRST_REVIEW.MAX,
    firstReviewResponseTime,
  );

  const approvalTimeClass = CodeReviewMetricsTilesUtil.getTileClass(
    THRESHOLDS.APPROVAL.MIN,
    THRESHOLDS.APPROVAL.MAX,
    approvalTime,
  );

  const mergeTimeClass = CodeReviewMetricsTilesUtil.getTileClass(THRESHOLDS.MERGE.MIN, THRESHOLDS.MERGE.MAX, mergeTime);

  return (
    <React.Fragment>
      <Tile title={HEADERS.FIRST_REVIEW}>
        <div className={styles.tileContent}>
          <InfoIconTooltip
            content={CodeReviewMetricsTilesUtil.getToolTipText(
              firstReviewResponseTime,
              recommendedTime.firstReviewResponseTime,
            )}
          />
          <p data-testid="first-review-response-time" className={styles[firstReviewResponseTimeClass]}>
            {CodeReviewMetricsTilesUtil.getDisplayHours(firstReviewResponseTime)}
          </p>
        </div>
      </Tile>

      <Tile title={HEADERS.APPROVAL}>
        <div className={styles.tileContent}>
          <InfoIconTooltip
            content={CodeReviewMetricsTilesUtil.getToolTipText(approvalTime, recommendedTime.approvalTime)}
          />
          <p data-testid="approval-time" className={styles[approvalTimeClass]}>
            {CodeReviewMetricsTilesUtil.getDisplayHours(approvalTime)}
          </p>
        </div>
      </Tile>

      <Tile title={HEADERS.MERGE}>
        <div className={styles.tileContent}>
          <InfoIconTooltip content={CodeReviewMetricsTilesUtil.getToolTipText(mergeTime, recommendedTime.mergeTime)} />
          <p data-testid="merge-time" className={styles[mergeTimeClass]}>
            {CodeReviewMetricsTilesUtil.getDisplayHours(mergeTime)}
          </p>
        </div>
      </Tile>
    </React.Fragment>
  );
};
