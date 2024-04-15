export class VoteMetrics {
  static getPullRequestVotesTimeline(reviewers, votesTimeline) {
    return Object.keys(reviewers).map((id) => {
      const { author, vote, isRequired, reviewerAddedTime } = reviewers[id];
      const timeOfVote = this.#getLastTimeOfVote(id, votesTimeline);

      return {
        id,
        author,
        vote,
        timeOfVote,
        isRequired,
        reviewerAddedTime,
      };
    });
  }

  static #getLastTimeOfVote(reviewerId, votesTimeline) {
    const reversedTimeLine = votesTimeline.slice().reverse();
    const reviewer = reversedTimeLine.find(({ id }) => id === reviewerId);

    return reviewer?.timeOfVote ?? null;
  }
}
