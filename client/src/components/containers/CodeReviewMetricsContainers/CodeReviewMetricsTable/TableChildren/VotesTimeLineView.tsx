import { useState } from "react";

import HistoryTwoToneIcon from "@mui/icons-material/HistoryTwoTone";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";

import { CustomVote, DialogBox } from "src/components";

import approvedSvg from "../../../../../assets/images/approved.svg";
import approvedWithSuggestionsSvg from "../../../../../assets/images/approvedWithSuggestions.svg";
import noVoteSvg from "../../../../../assets/images/noVote.svg";
import rejectedSvg from "../../../../../assets/images/rejected.svg";
import waitForAuthorSvg from "../../../../../assets/images/waitForAuthor.svg";
import { CodeReviewTimeLineTable } from "../../CodeReviewTimeLineTable/CodeReviewTimeLineTable";
import styles from "../CodeReviewMetricsTable.module.scss";
import { ITimeLine, IVotesTimeline } from "../interfaces";

interface Props {
  className: string;
  approved: number;
  approvedWithSuggestions: number;
  waitForAuthor: number;
  rejected: number;
  isNoVotesVisible?: boolean;
  noVote?: number;
  votesTimeLine: IVotesTimeline[];
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
        open={isVotesTimeLineOpen}
        onClose={() => setIsVotesTimeLineOpen(false)}
        content={<CodeReviewTimeLineTable timeLine={votesTimeline.timeLine} />}
        minWidth="600px"
      >
        <div className={styles.dialogHeader}>Votes Timeline -</div>
        <div className={styles.prDetails}>
          <Tooltip title={votesTimeline.title} placement="bottom-start">
            <NavLink to={votesTimeline.url} target="_blank" className={styles.pullRequestURL}>
              <div className={styles.navLink}>{votesTimeline.title}</div>
              <div className={styles.dialogIcon}>
                <OpenInNewIcon className={styles.linkIcon} />
              </div>
            </NavLink>
          </Tooltip>
        </div>
      </DialogBox>
    </>
  );
};
