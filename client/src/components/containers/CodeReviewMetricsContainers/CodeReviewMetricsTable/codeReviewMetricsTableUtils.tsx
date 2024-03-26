import { SORT_MAP } from "src/constants/constants";
import { IFetchedCodeReviewPullRequest, IFetchedPullRequestVotes } from "src/services/api/api";

import { ICodeReviewTableVotesFilterColumn } from "./codeReviewMetricsTableTypes";

export class CodeReviewMetricsTableUtil {
  static getTotalComments(pullRequests: IFetchedCodeReviewPullRequest[]) {
    return pullRequests.reduce((total, { comments }) => {
      return total + comments.totalComments;
    }, 0);
  }

  static sortPullRequests(pullRequests: IFetchedCodeReviewPullRequest[], sort: Record<string, string>) {
    return pullRequests.sort((firstPullRequest, secondPullRequest) => {
      for (const key in sort) {
        if (sort[key] === SORT_MAP.NO_SORT) continue;

        let firstValue = firstPullRequest[key as keyof IFetchedCodeReviewPullRequest];
        let secondValue = secondPullRequest[key as keyof IFetchedCodeReviewPullRequest];

        // 0 - indicates that both values are considered equal.
        if (!firstValue && !secondValue) {
          return 0;
        }

        // 1 - indicates that firstValue is considered greater than secondValue.
        // This sorts it to the end or "right" side in ascending order.
        if (!firstValue) {
          return 1;
        }

        // -1, indicates that secondValue is considered greater than firstValue.
        // This sorts it to the end or "right" side in descending order.
        if (!secondValue) {
          return -1;
        }

        if (key === "comments") {
          firstValue = firstPullRequest.comments.totalComments;
          secondValue = secondPullRequest.comments.totalComments;
        }

        if (sort[key] === SORT_MAP.ASCENDING) {
          if (firstValue < secondValue) {
            return 1;
          }

          if (firstValue > secondValue) {
            return -1;
          }
        }

        if (sort[key] === SORT_MAP.DESCENDING) {
          if (firstValue === null) {
            return 1;
          }

          if (firstValue > secondValue) {
            return 1;
          }

          if (firstValue < secondValue) {
            return -1;
          }
        }
      }

      return 0;
    });
  }

  static #getColumnNameToFilter(
    filters: Record<ICodeReviewTableVotesFilterColumn, Record<keyof IFetchedPullRequestVotes, boolean>>,
  ) {
    return Object.keys(filters).find((key) => {
      const filter = filters[key as ICodeReviewTableVotesFilterColumn];

      return Object.keys(filter).some((vote) => filter[vote as keyof IFetchedPullRequestVotes]);
    }) as ICodeReviewTableVotesFilterColumn | null;
  }

  static #hasSelectedVotes(votes: IFetchedPullRequestVotes, votesToFilter: (keyof IFetchedPullRequestVotes)[]) {
    const selectedVotes = votesToFilter.filter((vote) => votes[vote] > 0);

    return selectedVotes.length > 0;
  }

  static getFilteredPullRequests(
    pullRequests: IFetchedCodeReviewPullRequest[],
    filters: Record<ICodeReviewTableVotesFilterColumn, Record<keyof IFetchedPullRequestVotes, boolean>>,
  ) {
    const columnNameToFilter = this.#getColumnNameToFilter(filters);

    if (!columnNameToFilter) {
      return pullRequests;
    }

    const filter = filters[columnNameToFilter];
    const votesToFilter = Object.keys(filter).filter((vote) => filter[vote as keyof IFetchedPullRequestVotes]);

    if (!votesToFilter.length) {
      return pullRequests;
    }

    return pullRequests.filter((pullRequest) => {
      const votes = pullRequest[columnNameToFilter];

      return votes && this.#hasSelectedVotes(votes, votesToFilter as Array<keyof IFetchedPullRequestVotes>);
    });
  }
}
