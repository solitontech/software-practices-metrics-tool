import { formatDateWithoutTime } from "./formatTimeUtils";
import { IFetchersCodeReviewPullRequest } from "../fetchers";

const SEARCH_KEYS = {
  TAGS: "tags",
  CREATION_DATE: "creationDate",
  CLOSED_DATE: "closedDate",
  VOTES_HISTORY_TIMELINE: "votesHistoryTimeline",
};

export const getDeepSearchPullRequests = (
  pullRequests: IFetchersCodeReviewPullRequest[],
  mappedKey: string,
  value: string,
): IFetchersCodeReviewPullRequest[] => {
  if (mappedKey === SEARCH_KEYS.TAGS) {
    return filterByTags(pullRequests, value);
  } else if (mappedKey === SEARCH_KEYS.VOTES_HISTORY_TIMELINE) {
    return filterByVotesHistoryTimeline(pullRequests, value);
  } else if (mappedKey === SEARCH_KEYS.CREATION_DATE || mappedKey === SEARCH_KEYS.CLOSED_DATE) {
    return filterByDate(pullRequests, mappedKey, value);
  } else {
    return filterByOtherKeys(pullRequests, mappedKey, value);
  }
};

const filterByTags = (
  pullRequests: IFetchersCodeReviewPullRequest[],
  value: string,
): IFetchersCodeReviewPullRequest[] => {
  return pullRequests.filter((row) => row.tags.some((tag: string) => tag.toLowerCase().includes(value)));
};

const filterByVotesHistoryTimeline = (
  pullRequests: IFetchersCodeReviewPullRequest[],
  value: string,
): IFetchersCodeReviewPullRequest[] => {
  return pullRequests.filter((row) =>
    row.votesHistoryTimeline.some((vote) => vote.author.toLowerCase().includes(value)),
  );
};

const filterByDate = (
  pullRequests: IFetchersCodeReviewPullRequest[],
  mappedKey: string,
  value: string,
): IFetchersCodeReviewPullRequest[] => {
  return pullRequests.filter((row) => {
    const formattedValue = formatDateWithoutTime(row[mappedKey as keyof IFetchersCodeReviewPullRequest] as string[]);
    const rowValue = formattedValue?.toLowerCase();
    return rowValue && rowValue.includes(value);
  });
};

const filterByOtherKeys = (
  pullRequests: IFetchersCodeReviewPullRequest[],
  mappedKey: string,
  value: string,
): IFetchersCodeReviewPullRequest[] => {
  return pullRequests.filter((row) => {
    const rowValue = (row[mappedKey as keyof IFetchersCodeReviewPullRequest] as string)?.toLowerCase();
    return rowValue && rowValue.includes(value);
  });
};
