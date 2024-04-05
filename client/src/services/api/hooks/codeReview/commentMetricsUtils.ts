import {
  IFetchedPullRequestReviewerComments,
  IFetchedRawPullRequestComments,
  IFetchedRawPullRequestThreads,
} from "./codeReviewTypes";

export class CommentMetrics {
  static #INITIAL_VALUE = 0;

  static getPullRequestReviewerComments(threads: IFetchedRawPullRequestThreads[]) {
    const reviewerComments: Record<string, IFetchedPullRequestReviewerComments> = {};

    threads.forEach(({ comments }) => {
      comments.forEach(({ authorId, authorName }) => {
        const isReviewer = reviewerComments[authorId];

        if (!isReviewer) {
          reviewerComments[authorId] = { reviewer: authorName, comments: this.#INITIAL_VALUE };
        }

        reviewerComments[authorId].comments++;
      });
    });

    return Object.values(reviewerComments);
  }

  static getPullRequestComments(threads: IFetchedRawPullRequestThreads[]) {
    const commentType = {
      nit: "nit",
      major: "major",
    };

    return {
      totalComments: this.#getTotalComments(threads),
      numberOfNitComments: this.#getKeyWordComments(threads, commentType.nit),
      numberOfMajorComments: this.#getKeyWordComments(threads, commentType.major),
    };
  }

  static #getTotalComments(threads: IFetchedRawPullRequestThreads[]) {
    return threads.reduce((total, { comments }) => {
      return total + comments.length;
    }, this.#INITIAL_VALUE);
  }

  static #getKeyWordComments(threads: IFetchedRawPullRequestThreads[], keyword: string) {
    return threads.reduce((total, { comments }) => {
      return total + this.#getCommentsForThread(comments, keyword);
    }, this.#INITIAL_VALUE);
  }

  static #getCommentsForThread(comments: IFetchedRawPullRequestComments[], keyword: string) {
    const INCREMENT = 1;

    return comments.reduce((total, { content }) => {
      const isMatch = this.#isCommentStartsWith(content, keyword);

      return isMatch ? total + INCREMENT : total;
    }, this.#INITIAL_VALUE);
  }

  static #isCommentStartsWith(content: string, keyword: string) {
    return content.toLowerCase().startsWith(keyword.toLowerCase());
  }
}
