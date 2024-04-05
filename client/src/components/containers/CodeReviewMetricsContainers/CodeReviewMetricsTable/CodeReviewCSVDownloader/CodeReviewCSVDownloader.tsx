import { useCSVDownloader } from "react-papaparse";

import { IFetchedCodeReviewPullRequest } from "src/services/api/api";
import { getFormattedDateWithTime } from "src/utils/utils";

import styles from "./CodeReviewCSVDownloader.module.scss";
import { CodeReviewDisplayHoursToDaysUtil } from "../../CodeReviewDisplayHoursToDays/codeReviewDisplayHoursToDaysUtils";
interface ICodeReviewMetricsTableProps {
  pullRequests: IFetchedCodeReviewPullRequest[];
}

export const CSVDownloader = ({ pullRequests }: ICodeReviewMetricsTableProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { CSVDownloader, Type } = useCSVDownloader();

  const csvData = pullRequests.map((pullRequest) => {
    return {
      "Start Date": getFormattedDateWithTime(pullRequest.creationDate),
      "End Date": getFormattedDateWithTime(pullRequest.closedDate),
      Title: pullRequest.title,
      Tags: pullRequest.tags.join(", "),
      Author: pullRequest.createdBy,
      "Total Comments": pullRequest.comments.totalComments,
      "General Comments":
        pullRequest.comments.totalComments -
        pullRequest.comments.numberOfMajorComments -
        pullRequest.comments.numberOfNitComments,
      "Major Comments": pullRequest.comments.numberOfMajorComments,
      "Nit Comments": pullRequest.comments.numberOfNitComments,
      "Reviewer Comments": pullRequest.reviewerComments
        .map((comment) => comment.reviewer + ": " + comment.comments)
        .join(", "),
      "Votes History Timeline": pullRequest.votesHistoryTimeline
        .map((vote) => {
          return `${vote.author} (${vote.vote} - ${getFormattedDateWithTime(vote.timeOfVote)})`;
        })
        .join(", "),
      "Votes Timeline": pullRequest.votesTimeline
        .map((vote) => {
          return `${vote.author} (${vote.vote} ${getFormattedDateWithTime(vote.timeOfVote)})`;
        })
        .join(", "),
      "First Review Response Time": CodeReviewDisplayHoursToDaysUtil.getTimeFromSeconds(
        pullRequest.firstReviewResponseTimeInSeconds,
      ),
      "Approval Time": CodeReviewDisplayHoursToDaysUtil.getTimeFromSeconds(pullRequest.approvalTimeInSeconds),
      "Merge Time": CodeReviewDisplayHoursToDaysUtil.getTimeFromSeconds(pullRequest.mergeTimeInSeconds),
      Status: pullRequest.status,
    };
  });

  return (
    <CSVDownloader
      type={Type.Button}
      filename={"code-review-metrics"}
      bom={true}
      className={styles.downloadButton}
      config={{
        delimiter: ",",
      }}
      data={csvData}
    >
      Download
    </CSVDownloader>
  );
};
