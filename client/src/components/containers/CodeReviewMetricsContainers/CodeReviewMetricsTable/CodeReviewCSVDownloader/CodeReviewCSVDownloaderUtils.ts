import { NOT_AVAILABLE } from "src/constants/common.constants";
import {
  IFetchedPullRequestComments,
  IFetchedPullRequestVotesTimeline,
  IFetchedPullRequestReviewerComments,
} from "src/services/api/api";
import { getFormattedDateWithTime } from "src/utils/dateUtil";

export class CodeReviewCSVDownloaderUtils {
  static getGeneralComments(comments: IFetchedPullRequestComments) {
    return comments.totalComments - comments.numberOfMajorComments - comments.numberOfNitComments;
  }

  static getFormattedVotesTimeline(votesTimeline: IFetchedPullRequestVotesTimeline[]) {
    if (!votesTimeline) {
      return NOT_AVAILABLE;
    }

    return votesTimeline
      .map((vote) => {
        return `${vote.author} (${vote.vote} - ${getFormattedDateWithTime(vote.timeOfVote)})`;
      })
      .join(", ");
  }

  static getFormattedReviewerComments(reviewerComments: IFetchedPullRequestReviewerComments[]) {
    if (!reviewerComments) {
      return NOT_AVAILABLE;
    }

    return reviewerComments.map((comment) => `${comment.reviewer}: ${comment.comments}`).join(", ");
  }
}
