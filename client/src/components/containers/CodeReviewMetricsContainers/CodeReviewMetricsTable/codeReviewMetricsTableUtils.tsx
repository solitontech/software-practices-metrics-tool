import { SORT_MAP } from "src/constants/constants";
import { IFetchedCodeReviewPullRequest, IFetchedPullRequestVotes } from "src/services/api/api";

import { ICodeReviewTableVotesFilterColumn } from "./codeReviewMetricsTableTypes";

export class CodeReviewMetricsTableUtil {
  //TODO: refactor this function
  static sortPullRequests(pullRequests: IFetchedCodeReviewPullRequest[], sort: Record<string, string>) {
    return pullRequests.sort(
      (firstPullRequest: IFetchedCodeReviewPullRequest, secondPullRequest: IFetchedCodeReviewPullRequest) => {
        for (const key in sort) {
          if (sort[key] === SORT_MAP.NO_SORT) continue;

          let firstValue = firstPullRequest[key as keyof IFetchedCodeReviewPullRequest];
          let secondValue = secondPullRequest[key as keyof IFetchedCodeReviewPullRequest];

          // If they are, return 0, indicating that both values are considered equal.
          if (!firstValue && !secondValue) {
            return 0;
          }

          /*If the above condition is not met, check if firstValue is falsy.
        If it is, return 1, indicating that firstValue is considered greater than secondValue.
        This sorts it to the end or "right" side in ascending order.*/
          if (!firstValue) {
            return 1;
          }

          /*If none of the previous conditions are met, check if secondValue is falsy.
        If it is, return -1, indicating that secondValue is considered greater than firstValue.
        This sorts it to the end or "right" side in descending order.*/
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

            //1 means that the first element should be sorted before the second element.
            if (firstValue > secondValue) {
              return 1;
            }

            //-1 means that the second element should be sorted before the first element.
            if (firstValue < secondValue) {
              return -1;
            }
          }
        }

        //0 means that the relative order of first and second element should remain unchanged.
        return 0;
      },
    );
  }

  //TODO: refactor this function
  static getFilteredPullRequests = (
    pullRequests: IFetchedCodeReviewPullRequest[],
    filters: Record<ICodeReviewTableVotesFilterColumn, Record<keyof IFetchedPullRequestVotes, boolean>>,
  ) => {
    const columnNameToFilter = Object.keys(filters).find((filterKey: string) => {
      const filter = filters[filterKey as ICodeReviewTableVotesFilterColumn];

      return Object.keys(filter).some((vote: string) => filter[vote as keyof IFetchedPullRequestVotes]);
    }) as ICodeReviewTableVotesFilterColumn | null;

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

      if (!votes) {
        return false;
      }

      const selectedVotes = votesToFilter.filter((vote) => {
        return votes[vote as keyof IFetchedPullRequestVotes] > 0;
      });

      return selectedVotes.length > 0;
    });
  };

  static getTotalComments(pullRequests: IFetchedCodeReviewPullRequest[]) {
    return pullRequests.reduce((total, { comments }) => {
      return total + comments.totalComments;
    }, 0);
  }
}
