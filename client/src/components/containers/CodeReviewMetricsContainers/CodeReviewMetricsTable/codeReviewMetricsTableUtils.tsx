import durationFormat from "humanize-duration";

import { sortMap } from "./codeReviewMetricsTableConstants";
import { FilterColumn, Filters, IPullRequestList, IReviewerComments, Vote } from "./interfaces";
import { NOT_AVAILABLE } from "../../../../constants/commonConstants";
import {
  HOURS_IN_A_DAY,
  SECONDS_IN_ONE_HOUR,
  MINUTES_IN_ONE_HOUR,
  FRACTION_TO_FIND_TIME,
} from "../../../../constants/timeConstants";
import { cacheWrapperForUnaryFunction } from "../../../../utils/cache";
import { formatHoursToDays } from "../CodeReviewMetricsTiles/codeReviewMetricsTilesUtils";

export const getTimeFromSeconds = cacheWrapperForUnaryFunction((value: number | null) => {
  if (!value) {
    return NOT_AVAILABLE;
  }

  if (value < MINUTES_IN_ONE_HOUR) {
    return `${value} seconds`;
  }

  return durationFormat(value * FRACTION_TO_FIND_TIME, {
    units: ["h", "m"],
    round: true,
  });
});

export function sortPullRequests(pullRequests: IPullRequestList[], sort: Record<string, string>) {
  return pullRequests.sort((firstPullRequest: IPullRequestList, secondPullRequest: IPullRequestList) => {
    for (const key in sort) {
      if (sort[key] === sortMap.noSort) continue;

      let firstValue = firstPullRequest[key as keyof IPullRequestList];
      let secondValue = secondPullRequest[key as keyof IPullRequestList];

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

      if (sort[key] === sortMap.asc) {
        if (firstValue < secondValue) {
          return 1;
        }

        if (firstValue > secondValue) {
          return -1;
        }
      } else if (sort[key] === sortMap.desc) {
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
  });
}

export const convertTimeToDays = (timeInSeconds: number, formattedTime: string): string => {
  const hours = timeInSeconds / SECONDS_IN_ONE_HOUR;

  if (hours > HOURS_IN_A_DAY) {
    return formatHoursToDays(hours);
  }

  return formattedTime;
};

export const getFilteredPullRequests = (pullRequests: IPullRequestList[], filters: Filters): IPullRequestList[] => {
  const columnNameToFilter = Object.keys(filters).find((filterKey: string) => {
    const filter = filters[filterKey as FilterColumn];

    return Object.keys(filter).some((vote: string) => filter[vote as Vote]);
  }) as FilterColumn | null;

  if (!columnNameToFilter) {
    return pullRequests;
  }

  const filter = filters[columnNameToFilter];
  const votesToFilter = Object.keys(filter).filter((vote) => filter[vote as Vote]);

  if (!votesToFilter.length) {
    return pullRequests;
  }

  return pullRequests.filter((pullRequest) => {
    const votes = pullRequest[columnNameToFilter];

    if (!votes) {
      return false;
    }

    const selectedVotes = votesToFilter.filter((vote) => {
      return votes[vote as Vote] > 0;
    });

    return selectedVotes.length > 0;
  });
};

export const getTotalComments = (pullRequests: IPullRequestList[]): number => {
  return pullRequests.reduce((totalComments, pullRequest) => {
    return totalComments + pullRequest.comments.totalComments;
  }, 0);
};

export const getFormattedReviewerComments = (comments: IReviewerComments[]) => {
  return comments.reduce((accumulated, currentValue) => {
    return `${accumulated} ${currentValue.reviewer} - ${currentValue.comments} |`;
  }, "");
};
