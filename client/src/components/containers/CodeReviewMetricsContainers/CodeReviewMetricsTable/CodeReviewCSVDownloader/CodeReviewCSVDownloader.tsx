import { useCSVDownloader } from "react-papaparse";

import { SENTENCE_JOINER } from "src/constants/constants";
import { IFetchedCodeReviewPullRequest } from "src/services/api/api";
import { getFormattedDateWithTime, getHoursMinutesFromSeconds } from "src/utils/utils";

import styles from "./CodeReviewCSVDownloader.module.scss";
import { CodeReviewCSVDownloaderUtils } from "./CodeReviewCSVDownloaderUtils";

interface ICodeReviewMetricsTableProps {
  pullRequests: IFetchedCodeReviewPullRequest[];
}

export const CSVDownloader = ({ pullRequests }: ICodeReviewMetricsTableProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { CSVDownloader } = useCSVDownloader();

  const buttonType = "button";
  const fileName = "code-review-metrics";
  const delimiter = ",";

  const csvData = pullRequests.map((pullRequest) => {
    return {
      "Start Date": getFormattedDateWithTime(pullRequest.creationDate),
      "End Date": getFormattedDateWithTime(pullRequest.closedDate),
      Title: pullRequest.title,
      Url: pullRequest.url,
      Tags: pullRequest.tags.join(SENTENCE_JOINER),
      Author: pullRequest.createdBy,
      "Total Comments": pullRequest.comments.totalComments,
      "General Comments": CodeReviewCSVDownloaderUtils.getGeneralComments(pullRequest.comments),
      "Major Comments": pullRequest.comments.numberOfMajorComments,
      "Nit Comments": pullRequest.comments.numberOfNitComments,
      "Reviewer Comments": CodeReviewCSVDownloaderUtils.getFormattedReviewerComments(pullRequest.reviewerComments),
      "Votes History Timeline": CodeReviewCSVDownloaderUtils.getFormattedVotesTimeline(
        pullRequest.votesHistoryTimeline,
      ),
      "Votes Timeline": CodeReviewCSVDownloaderUtils.getFormattedVotesTimeline(pullRequest.votesTimeline),
      "First Review Response Time": getHoursMinutesFromSeconds(pullRequest.firstReviewResponseTimeInSeconds),
      "Approval Time": getHoursMinutesFromSeconds(pullRequest.approvalTimeInSeconds),
      "Merge Time": getHoursMinutesFromSeconds(pullRequest.mergeTimeInSeconds),
      Status: pullRequest.status,
    };
  });

  return (
    <CSVDownloader
      type={buttonType}
      filename={fileName}
      bom={true}
      className={styles.downloadButton}
      config={{
        delimiter,
      }}
      data={csvData}
    >
      Export CSV
    </CSVDownloader>
  );
};
