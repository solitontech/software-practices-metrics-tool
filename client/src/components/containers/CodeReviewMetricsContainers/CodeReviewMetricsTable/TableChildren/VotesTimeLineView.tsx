import { useState } from "react";

import HistoryTwoToneIcon from "@mui/icons-material/HistoryTwoTone";

import { CustomVote, DialogBox } from "src/components/components";
import { IFetchedPullRequestVotesTimeline } from "src/services/api/api";

import approvedSvg from "../../../../../assets/images/approved.svg";
import approvedWithSuggestionsSvg from "../../../../../assets/images/approvedWithSuggestions.svg";
import noVoteSvg from "../../../../../assets/images/noVote.svg";
import rejectedSvg from "../../../../../assets/images/rejected.svg";
import waitForAuthorSvg from "../../../../../assets/images/waitForAuthor.svg";
import { CodeReviewTimeLineTable } from "../../CodeReviewTimeLineTable/CodeReviewTimeLineTable";
import styles from "../CodeReviewMetricsTable.module.scss";
import { ITimeLine } from "../interfaces";

interface Props {
  className: string;
  approved: number;
  approvedWithSuggestions: number;
  waitForAuthor: number;
  rejected: number;
  isNoVotesVisible?: boolean;
  noVote?: number;
  votesTimeLine: IFetchedPullRequestVotesTimeline[];
  title: string;
  url: string;
}

export const VotesTimeLineView = ({
  className,
  approved,
  approvedWithSuggestions,
  waitForAuthor,
  rejected,
  isNoVotesVisible,
  noVote,
  votesTimeLine,
  title,
  url,
}: Props) => {
  const [isVotesTimeLineOpen, setIsVotesTimeLineOpen] = useState(false);

  const [votesTimeline, setVotesTimeline] = useState<ITimeLine>({
    timeLine: [],
    title: "",
    url: "",
  });

  const displayTimeLine = () => {
    setVotesTimeline({
      timeLine: votesTimeLine,
      title: title,
      url: url,
    });

    setIsVotesTimeLineOpen(true);
  };

  return (
    <>
      <div className={className}>
        <CustomVote imgSrc={approvedSvg} tooltipText={`Approved - ${approved}`} count={approved} />
        <CustomVote
          imgSrc={approvedWithSuggestionsSvg}
          tooltipText={`Approved with Suggestions - ${approvedWithSuggestions}`}
          count={approvedWithSuggestions}
        />
        <CustomVote
          imgSrc={waitForAuthorSvg}
          tooltipText={`Wait for Author - ${waitForAuthor}`}
          count={waitForAuthor}
        />
        <CustomVote imgSrc={rejectedSvg} tooltipText={`Rejected - ${rejected}`} count={rejected} />
        {isNoVotesVisible ? <CustomVote imgSrc={noVoteSvg} tooltipText={`No Vote - ${noVote}`} count={noVote} /> : null}
        <div className={styles.historyIcon}>
          <span title="Click to view the votes timeline" onClick={displayTimeLine}>
            <HistoryTwoToneIcon className={styles.timelineIconColor} />
          </span>
        </div>
      </div>
      <DialogBox
        isOpen={isVotesTimeLineOpen}
        handleClose={() => setIsVotesTimeLineOpen(false)}
        title="Votes Timeline"
        className={styles.votesTimelineDialog}
      >
        <CodeReviewTimeLineTable timeLine={votesTimeline.timeLine} />
      </DialogBox>
    </>
  );
};
