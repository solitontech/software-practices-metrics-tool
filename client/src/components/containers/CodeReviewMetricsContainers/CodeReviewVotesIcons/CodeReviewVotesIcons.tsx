import React, { useState } from "react";

import HistoryTwoToneIcon from "@mui/icons-material/HistoryTwoTone";

import approvedSvg from "src/assets/images/approved.svg";
import approvedWithSuggestionsSvg from "src/assets/images/approvedWithSuggestions.svg";
import noVoteSvg from "src/assets/images/noVote.svg";
import rejectedSvg from "src/assets/images/rejected.svg";
import waitForAuthorSvg from "src/assets/images/waitForAuthor.svg";
import { CodeReviewTimeLineTable } from "src/components/containers/CodeReviewMetricsContainers/CodeReviewTimeLineTable/CodeReviewTimeLineTable";
import { CustomVote } from "src/components/reusables/CustomVote/CustomVote";
import { DialogBox } from "src/components/reusables/DialogBox/DialogBox";
import { IFetchedPullRequestVotesTimeline } from "src/services/api/api";

import styles from "./CodeReviewVotesIcons.module.scss";

interface ICodeReviewVotesIconsProps {
  className: string;
  approved: number;
  approvedWithSuggestions: number;
  waitForAuthor: number;
  rejected: number;
  isNoVotesVisible?: boolean;
  noVote?: number;
  votesTimeLine: IFetchedPullRequestVotesTimeline[];
}

export const CodeReviewVotesIcons = ({
  className,
  approved,
  approvedWithSuggestions,
  waitForAuthor,
  rejected,
  isNoVotesVisible,
  noVote,
  votesTimeLine,
}: ICodeReviewVotesIconsProps) => {
  const [isVotesTimeLineOpen, setIsVotesTimeLineOpen] = useState(false);
  const [votesTimeline, setVotesTimeline] = useState<IFetchedPullRequestVotesTimeline[]>([]);

  const showTimeLineTable = () => {
    setVotesTimeline(votesTimeLine);
    setIsVotesTimeLineOpen(true);
  };

  return (
    <React.Fragment>
      <div className={className}>
        <CustomVote imgSrc={approvedSvg} count={approved} tooltipText={`Approved - ${approved}`} />
        <CustomVote
          imgSrc={approvedWithSuggestionsSvg}
          count={approvedWithSuggestions}
          tooltipText={`Approved with Suggestions - ${approvedWithSuggestions}`}
        />
        <CustomVote
          imgSrc={waitForAuthorSvg}
          count={waitForAuthor}
          tooltipText={`Wait for Author - ${waitForAuthor}`}
        />
        <CustomVote imgSrc={rejectedSvg} count={rejected} tooltipText={`Rejected - ${rejected}`} />
        {isNoVotesVisible ? <CustomVote imgSrc={noVoteSvg} count={noVote} tooltipText={`No Vote - ${noVote}`} /> : null}
        <div className={styles.historyIcon}>
          <span title="Click to view the votes timeline" onClick={showTimeLineTable}>
            <HistoryTwoToneIcon className={styles.timelineIconColor} />
          </span>
        </div>
      </div>
      <DialogBox
        title="Votes Timeline"
        className={styles.votesTimelineDialog}
        isOpen={isVotesTimeLineOpen}
        handleClose={() => setIsVotesTimeLineOpen(false)}
      >
        <CodeReviewTimeLineTable timeLine={votesTimeline} />
      </DialogBox>
    </React.Fragment>
  );
};
