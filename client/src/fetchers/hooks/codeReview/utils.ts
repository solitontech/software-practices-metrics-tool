import { IFetchersCodeReviewPullRequest } from "./types";
import { IContextClientFilterSquad } from "../../../context";

interface Result {
  pullRequests: IFetchersCodeReviewPullRequest[];
  errorCount: number;
}

export class CodeReviewUtils {
  static #getSquadsUserIdsMap(squads: IContextClientFilterSquad[]) {
    const developersMap: Map<string, boolean> = new Map();
    const reviewersMap: Map<string, boolean> = new Map();

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

  static getClientFilteredPullRequests = (
    data: Result | undefined,
    filters: IContextClientFilterSquad[],
  ): Result | undefined => {
    if (!data || !filters.length) {
      return data;
    }

    const { developersMap, reviewersMap } = this.#getSquadsUserIdsMap(filters);

    const pullRequests = data.pullRequests.filter(({ authorId, votesHistoryTimeline }) => {
      const isAuthorMatch = developersMap.has(authorId);
      const isReviewerMatch = votesHistoryTimeline.some((vote) => reviewersMap.get(vote.id));

      return isAuthorMatch && isReviewerMatch;
    });

    return {
      pullRequests,
      errorCount: data.errorCount,
    };
  };
}
