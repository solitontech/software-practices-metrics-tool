import { SECONDS_IN_ONE_HOUR, NOT_AVAILABLE } from "src/constants/constants";
import { IFetchedCodeReviewPullRequest } from "src/services/api/api";
import { getFormattedDateWithoutTime } from "src/utils/utils";

import { CHIPS } from "./codeReviewMetricsConstants";

export class CodeReviewMetricsUtil {
  static getMetricsAverageTimeInHours(
    pullRequests: IFetchedCodeReviewPullRequest[],
    key: keyof IFetchedCodeReviewPullRequest,
  ) {
    const metricsValues = pullRequests.map((pullRequest) => Number(pullRequest[key]) ?? 0);
    const totalPullRequests = metricsValues.filter((metrics) => metrics);

    if (!totalPullRequests.length) {
      return NOT_AVAILABLE;
    }

    const timeInSeconds = totalPullRequests.reduce((totalTime, metricsTime) => totalTime + metricsTime, 0);
    const timeInHours = timeInSeconds / SECONDS_IN_ONE_HOUR;

    return Number((timeInHours / totalPullRequests.length).toPrecision(2));
  }

  static filterPullRequests(pullRequests: IFetchedCodeReviewPullRequest[], chipKey: string, searchTerm: string) {
    if (!chipKey) {
      return this.#getSearchedPullRequests(pullRequests, searchTerm);
    }

    const chip = CHIPS.find((chip) => chip.key === chipKey);

    if (!chip) {
      return [];
    }

    return this.#getDeepSearchPullRequests(pullRequests, chip.pullRequestKey, searchTerm);
  }

  static #getSearchedPullRequests(pullRequests: IFetchedCodeReviewPullRequest[], searchTerm: string) {
    return pullRequests.filter(({ title, createdBy, creationDate, closedDate, status, tags, votesHistoryTimeline }) => {
      const reviewerInVotes = votesHistoryTimeline.some((vote) => vote.author.toLocaleLowerCase().includes(searchTerm));

      return (
        title.toLocaleLowerCase().includes(searchTerm) ||
        createdBy.toLocaleLowerCase().includes(searchTerm) ||
        getFormattedDateWithoutTime(creationDate).toLocaleLowerCase().includes(searchTerm) ||
        tags.some((tag) => tag.toLocaleLowerCase().includes(searchTerm)) ||
        getFormattedDateWithoutTime(closedDate).toLocaleLowerCase().includes(searchTerm) ||
        status.toLocaleLowerCase().includes(searchTerm) ||
        reviewerInVotes
      );
    });
  }

  static #getDeepSearchPullRequests(
    pullRequests: IFetchedCodeReviewPullRequest[],
    key: keyof IFetchedCodeReviewPullRequest,
    searchTerm: string,
  ) {
    const SEARCH_KEYS: Record<string, Partial<keyof IFetchedCodeReviewPullRequest>> = {
      TAGS: "tags",
      CREATION_DATE: "creationDate",
      CLOSED_DATE: "closedDate",
      VOTES_HISTORY_TIMELINE: "votesHistoryTimeline",
    };

    if (key === SEARCH_KEYS.TAGS) {
      return this.#filterByTags(pullRequests, searchTerm);
    }

    if (key === SEARCH_KEYS.VOTES_HISTORY_TIMELINE) {
      return this.#filterByVotesHistoryTimeline(pullRequests, searchTerm);
    }

    if (key === SEARCH_KEYS.CREATION_DATE || key === SEARCH_KEYS.CLOSED_DATE) {
      return this.#filterByDate(pullRequests, key, searchTerm);
    }

    return this.#filterByOtherKeys(pullRequests, key, searchTerm);
  }

  static #filterByTags(pullRequests: IFetchedCodeReviewPullRequest[], searchTerm: string) {
    return pullRequests.filter((row) => row.tags.some((tag) => tag.toLocaleLowerCase().includes(searchTerm)));
  }

  static #filterByVotesHistoryTimeline(pullRequests: IFetchedCodeReviewPullRequest[], searchTerm: string) {
    return pullRequests.filter((row) =>
      row.votesHistoryTimeline.some((vote) => vote.author.toLocaleLowerCase().includes(searchTerm)),
    );
  }

  static #filterByDate(
    pullRequests: IFetchedCodeReviewPullRequest[],
    mappedKey: keyof IFetchedCodeReviewPullRequest,
    searchTerm: string,
  ) {
    return pullRequests.filter((row) => {
      const formattedValue = getFormattedDateWithoutTime(row[mappedKey])?.toLocaleLowerCase();

      return formattedValue?.includes(searchTerm);
    });
  }

  static #filterByOtherKeys(
    pullRequests: IFetchedCodeReviewPullRequest[],
    mappedKey: keyof IFetchedCodeReviewPullRequest,
    searchTerm: string,
  ) {
    return pullRequests.filter((row) => {
      const rowValue = row[mappedKey];

      return typeof rowValue === "string" && rowValue.toLocaleLowerCase().includes(searchTerm);
    });
  }
}
