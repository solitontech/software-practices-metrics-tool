export class VotesCommentsMetrics {
  static commentType = {
    nit: 'nit',
    major: 'major',
  };

  static addOne = 1;
  static addZero = 0;

  static getPullRequestVotes(reviewers) {
    const reviewerVotesResults = {
      approved: 0,
      approvedWithSuggestions: 0,
      noVote: 0,
      waitForAuthor: 0,
      rejected: 0,
    };

    reviewers.forEach((reviewer) => {
      reviewerVotesResults[reviewer.vote]++;
    });

    return reviewerVotesResults;
  }

  static getPullRequestVotesTimeline(reviewers, votesHistoryTimeline) {
    const getTimeOfVote = (reviewerId) => {
      const reversedTimeLineHistory = votesHistoryTimeline.slice().reverse();

      const reviewer = reversedTimeLineHistory.find((reviewer) => {
        return reviewer.id === reviewerId;
      });

      return reviewer ? reviewer.timeOfVote : null;
    };

    return Object.keys(reviewers).map((reviewerId) => {
      return {
        id: reviewerId,
        author: reviewers[reviewerId].author,
        timeOfVote: getTimeOfVote(reviewerId),
        vote: reviewers[reviewerId].vote,
      };
    });
  }

  static getPullRequestVotesHistory(votesCycle) {
    const result = {
      approved: 0,
      approvedWithSuggestions: 0,
      waitForAuthor: 0,
      rejected: 0,
    };

    votesCycle.forEach((reviewer) => {
      result[reviewer.vote]++;
    });

    return result;
  }

  static getPullRequestComments(threads) {
    const getTotalComments = (threads) => {
      return threads.reduce((totalComments, { comments }) => {
        return totalComments + comments.length;
      }, 0);
    };

    const getKeyWordComments = (threads, keyword) => {
      return threads.reduce((totalComments, { comments }) => {
        return totalComments + getCommentsForThread(comments, keyword);
      }, 0);
    };

    const getCommentsForThread = (comments, keyword) => {
      return comments.reduce((totalComments, { content }) => {
        return totalComments + (isCommentStartsWith(content, keyword) ? this.addOne : this.addZero);
      }, 0);
    };

    const isCommentStartsWith = (content, keyword) => {
      content = content.toLowerCase();
      keyword = keyword.toLowerCase();

      return content.startsWith(keyword);
    };

    return {
      totalComments: getTotalComments(threads),
      numberOfNitComments: getKeyWordComments(threads, this.commentType.nit),
      numberOfMajorComments: getKeyWordComments(threads, this.commentType.major),
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
