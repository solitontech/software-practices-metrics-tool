import { IFetchedPullRequestReviewerComments } from "src/services/api/api";

export class CodeReviewTabRowUtil {
  static getReviewerComments(comments: IFetchedPullRequestReviewerComments[]) {
    return comments.reduce((acc, { reviewer, comments }) => {
      return `${acc} ${reviewer} - ${comments} |`;
    }, "");
  }
}
