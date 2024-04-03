import { VOTE } from '../constants/constants.js';

export class VoteMetrics {
  static getPullRequestVotesHistory(votesCycle) {
    const votesResults = {
      [VOTE.APPROVED]: 0,
      [VOTE.APPROVED_WITH_SUGGESTIONS]: 0,
      [VOTE.WAIT_FOR_AUTHOR]: 0,
      [VOTE.REJECTED]: 0,
    };

    votesCycle.forEach(({ vote }) => {
      votesResults[vote]++;
    });

    return votesResults;
  }

  static getPullRequestVotesTimeline(reviewers, votesTimeline) {
    return Object.keys(reviewers).map((id) => {
      const { author, vote } = reviewers[id];
      const timeOfVote = this.#getLastTimeOfVote(id, votesTimeline);

      return {
        id,
        author,
        vote,
        timeOfVote,
      };
    });
  }

  static #getLastTimeOfVote(reviewerId, votesTimeline) {
    const reversedTimeLine = votesTimeline.slice().reverse();
    const reviewer = reversedTimeLine.find(({ id }) => id === reviewerId);

    return reviewer?.timeOfVote ?? null;
  }
}
