export class CommentMetrics {
  static commentClassification = {
    nit: 'nit',
    major: 'major',
  };

  static getPullRequestComments(threads) {
    const INCREMENT = 1;
    const INITIAL_VALUE = 0;

    const getTotalComments = (threads) => {
      return threads.reduce((totalComments, { comments }) => {
        return totalComments + comments.length;
      }, INITIAL_VALUE);
    };

    const getKeyWordComments = (threads, keyword) => {
      return threads.reduce((totalComments, { comments }) => {
        return totalComments + getCommentsForThread(comments, keyword);
      }, INITIAL_VALUE);
    };

    const getCommentsForThread = (comments, keyword) => {
      return comments.reduce((totalComments, { content }) => {
        return totalComments + (isCommentStartsWith(content, keyword) ? INCREMENT : INITIAL_VALUE);
      }, INITIAL_VALUE);
    };

    const isCommentStartsWith = (content, keyword) => {
      content = content.toLowerCase();
      keyword = keyword.toLowerCase();

      return content.startsWith(keyword);
    };

    return {
      totalComments: getTotalComments(threads),
      numberOfNitComments: getKeyWordComments(threads, this.commentClassification.nit),
      numberOfMajorComments: getKeyWordComments(threads, this.commentClassification.major),
    };
  }

  static getPullRequestReviewerComments(threads) {
    const reviewerComments = {};

    threads.forEach((thread) => {
      thread.comments.forEach((comment) => {
        const isReviewer = reviewerComments[comment.authorId];

        if (!isReviewer) {
          reviewerComments[comment.authorId] = { reviewer: comment.authorName, comments: 1 };
        } else {
          reviewerComments[comment.authorId].comments++;
        }
      });
    });

    return Object.values(reviewerComments);
  }
}
