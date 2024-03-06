export class CommentMetrics {
  static #INITIAL_VALUE = 0;

  static #getTotalComments(threads) {
    return threads.reduce((total, { comments }) => {
      return total + comments.length;
    }, this.#INITIAL_VALUE);
  }

  static #isCommentStartsWith(content, keyword) {
    return content.toLowerCase().startsWith(keyword.toLowerCase());
  }

  static #getCommentsForThread(comments, keyword) {
    const INCREMENT = 1;

    return comments.reduce((total, { content }) => {
      const isMatch = this.#isCommentStartsWith(content, keyword);

      return isMatch ? total + INCREMENT : total;
    }, this.#INITIAL_VALUE);
  }

  static #getKeyWordComments(threads, keyword) {
    return threads.reduce((total, { comments }) => {
      return total + this.#getCommentsForThread(comments, keyword);
    }, this.#INITIAL_VALUE);
  }

  static getPullRequestComments(threads) {
    const commentType = {
      nit: 'nit',
      major: 'major',
    };

    return {
      totalComments: this.#getTotalComments(threads),
      numberOfNitComments: this.#getKeyWordComments(threads, commentType.nit),
      numberOfMajorComments: this.#getKeyWordComments(threads, commentType.major),
    };
  }

  static getPullRequestReviewerComments(threads) {
    const reviewerComments = {};

    threads.forEach(({ comments }) => {
      comments.forEach(({ authorId, authorName }) => {
        const isReviewer = reviewerComments[authorId];

        if (!isReviewer) {
          reviewerComments[authorId] = { reviewer: authorName, comments: 0 };
        }

        reviewerComments[authorId].comments++;
      });
    });

    return Object.values(reviewerComments);
  }
}
