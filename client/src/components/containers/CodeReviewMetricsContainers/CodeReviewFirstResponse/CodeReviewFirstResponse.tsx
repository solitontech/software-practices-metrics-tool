import React, { useState } from "react";

import dataInfoAlert from "src/assets/images/dataInfoAlert.svg";
import { CodeReviewDisplayHoursToDays } from "src/components/containers/CodeReviewMetricsContainers/CodeReviewDisplayHoursToDays/CodeReviewDisplayHoursToDays";
import { DialogBox } from "src/components/reusables/DialogBox/DialogBox";
import { IFetchedPullRequestVotesTimeline } from "src/services/api/api";

import styles from "./CodeReviewFirstResponse.module.scss";
import { CodeReviewFirstResponseReviewersTable } from "./CodeReviewFirstResponseReviewersTable/CodeReviewFirstResponseReviewersTable";

interface ICodeReviewFirstResponse {
  firstReviewResponseTimeInSeconds: number | null;
  votesHistoryTimeline: IFetchedPullRequestVotesTimeline[];
}

export const CodeReviewFirstResponse = ({
  firstReviewResponseTimeInSeconds,
  votesHistoryTimeline,
}: ICodeReviewFirstResponse) => {
  const [isVotesTimeLineOpen, setIsVotesTimeLineOpen] = useState(false);

  return (
    <React.Fragment>
      <div className={styles.firstReviewResponseTimeContainer}>
        <div className={styles.firstReviewResponseTime}>
          <CodeReviewDisplayHoursToDays timeInSeconds={firstReviewResponseTimeInSeconds} />
        </div>

        <img src={dataInfoAlert} className={styles.timelineIconColor} onClick={() => setIsVotesTimeLineOpen(true)} />
      </div>

      <DialogBox
        title="Reviewers First Review Response Time"
        className={styles.votesTimelineDialog}
        isOpen={isVotesTimeLineOpen}
        handleClose={() => setIsVotesTimeLineOpen(false)}
      >
        <CodeReviewFirstResponseReviewersTable votesHistoryTimeline={votesHistoryTimeline} />
      </DialogBox>
    </React.Fragment>
  );
};
