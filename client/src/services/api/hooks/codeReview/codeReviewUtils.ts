import { VOTES } from "src/constants/constants";
import { IContextClientFilterSquad } from "src/context/context";

import {
  IFetchedRawCodeReviewResponse,
  IFetchedPullRequestVotesTimeline,
  IFetchedCodeReviewResponse,
} from "./codeReviewTypes";

export class CodeReviewMetricsUtils {
  static #getSquadsUserIdsMap(squads: IContextClientFilterSquad[]) {
    const developersMap = new Map();
    const reviewersMap = new Map<string, boolean>();

    squads.forEach(({ developers, reviewers }) => {
      developers.forEach(({ id, isSelected }) => {
        if (isSelected) {
          developersMap.set(id, isSelected);
        }
      });

      reviewers.forEach(({ id, isSelected }) => {
        if (isSelected) {
          reviewersMap.set(id, isSelected);
        }
      });
    });

    return { developersMap, reviewersMap };
  }

  static getFilteredPullRequests(
    data: Omit<IFetchedRawCodeReviewResponse, "filteredCount" | "count"> | undefined,
    filters: IContextClientFilterSquad[],
  ) {
    if (!data || !filters.length) {
      return data;
    }

    const { developersMap, reviewersMap } = this.#getSquadsUserIdsMap(filters);

    const pullRequests = data.pullRequests.filter(({ authorId, votesHistoryTimeline }) => {
      const isAuthorMatch = developersMap.has(authorId);
      const isReviewerMatch = votesHistoryTimeline.some(({ id }) => reviewersMap.has(id));

      return reviewersMap.size ? isAuthorMatch && isReviewerMatch : isAuthorMatch;
    });

    return {
      pullRequests,
      errorCount: data.errorCount,
    };
  }

  static getFilteredPullRequestsByReviewers(
    data: Omit<IFetchedRawCodeReviewResponse, "count" | "filteredCount"> | undefined,
    filters: IContextClientFilterSquad[],
  ): IFetchedCodeReviewResponse | undefined {
    if (!data) {
      return;
    }

    const { reviewersMap } = this.#getSquadsUserIdsMap(filters);

    const pullRequests = data.pullRequests.map((pullRequest) => {
      const filteredVotesTimeline = this.#filterVotesTimelineByReviewers(pullRequest.votesTimeline, reviewersMap);
      const votes = this.#getPullRequestVotes(filteredVotesTimeline);

      const filteredVotesHistoryTimeline = this.#filterVotesTimelineByReviewers(
        pullRequest.votesHistoryTimeline,
        reviewersMap,
      );
      const votesHistory = this.#getPullRequestVotesHistory(filteredVotesHistoryTimeline);

      return {
        ...pullRequest,
        votes,
        votesHistory,
        votesTimeline: filteredVotesTimeline,
        votesHistoryTimeline: filteredVotesHistoryTimeline,
      };
    });

    return {
      pullRequests,
      errorCount: data.errorCount,
    };
  }

  static #filterVotesTimelineByReviewers(
    votesTimeline: IFetchedPullRequestVotesTimeline[],
    reviewersMap: Map<string, boolean>,
  ) {
    if (!reviewersMap.size) {
      return votesTimeline;
    }

    return votesTimeline.filter(({ id }) => reviewersMap.has(id));
  }

  static #getPullRequestVotes(votesCycle: IFetchedPullRequestVotesTimeline[]) {
    const votesResults = {
      [VOTES.APPROVED]: 0,
      [VOTES.APPROVED_WITH_SUGGESTIONS]: 0,
      [VOTES.WAIT_FOR_AUTHOR]: 0,
      [VOTES.REJECTED]: 0,
      [VOTES.NO_VOTE]: 0,
    };

    votesCycle.forEach(({ vote }) => {
      votesResults[vote]++;
    });

    return votesResults;
  }

  static #getPullRequestVotesHistory(votesCycle: IFetchedPullRequestVotesTimeline[]) {
    const votesResults = {
      [VOTES.APPROVED]: 0,
      [VOTES.APPROVED_WITH_SUGGESTIONS]: 0,
      [VOTES.WAIT_FOR_AUTHOR]: 0,
      [VOTES.REJECTED]: 0,
      [VOTES.NO_VOTE]: 0,
    };

    votesCycle.forEach(({ vote }) => {
      votesResults[vote]++;
    });

    return votesResults;
  }
}
