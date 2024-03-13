import { IContextClientFilterSquad } from "src/context";

import { IFetchedCodeReviewResponse } from "./types";

export class CodeReviewMetricsUtils {
  static #getSquadsUserIdsMap(squads: IContextClientFilterSquad[]) {
    const developersMap = new Map();
    const reviewersMap = new Map();

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

  static getFilteredPullRequests = (
    data: Omit<IFetchedCodeReviewResponse, "filteredCount" | "count"> | undefined,
    filters: IContextClientFilterSquad[],
  ) => {
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
  };
}
