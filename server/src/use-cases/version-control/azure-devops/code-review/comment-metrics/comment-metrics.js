export class CommentMetrics {
  static #INITIAL_VALUE = 0;

  static getPullRequestReviewerComments(threads) {
    const reviewerComments = {};

    threads.forEach(({ comments }) => {
      comments.forEach(({ authorId, authorName, isDeleted }) => {
        if (isDeleted) return;

        const isReviewer = reviewerComments[authorId];

        if (!isReviewer) {
          reviewerComments[authorId] = { reviewer: authorName, comments: this.#INITIAL_VALUE };
        }

        reviewerComments[authorId].comments++;
      });
    });

    return Object.values(reviewerComments);
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

  static #getTotalComments(threads) {
    return threads.reduce((total, { comments }) => {
      const totalComments = comments.reduce((total, { isDeleted }) => {
        return isDeleted ? total : total + 1;
      }, this.#INITIAL_VALUE);

      return total + totalComments;
    }, this.#INITIAL_VALUE);
  }

  static #getKeyWordComments(threads, keyword) {
    return threads.reduce((total, { comments }) => {
      return total + this.#getCommentsForThread(comments, keyword);
    }, this.#INITIAL_VALUE);
  }

  static #getCommentsForThread(comments, keyword) {
    const INCREMENT = 1;

    return comments.reduce((total, { content, isDeleted }) => {
      const isMatch = this.#isCommentStartsWith(content, keyword);

      return isMatch && !isDeleted ? total + INCREMENT : total;
    }, this.#INITIAL_VALUE);
  }

  static #isCommentStartsWith(content, keyword) {
    return content.toLowerCase().startsWith(keyword.toLowerCase());
  }
}
