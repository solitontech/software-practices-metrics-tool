import { formatDateWithoutTime } from "./formatTimeUtils";
import { IFetchedCodeReviewPullRequest } from "../fetchers";

const SEARCH_KEYS = {
  TAGS: "tags",
  CREATION_DATE: "creationDate",
  CLOSED_DATE: "closedDate",
  VOTES_HISTORY_TIMELINE: "votesHistoryTimeline",
};

export const getDeepSearchPullRequests = (
  pullRequests: IFetchedCodeReviewPullRequest[],
  mappedKey: string,
  value: string,
): IFetchedCodeReviewPullRequest[] => {
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
  pullRequests: IFetchedCodeReviewPullRequest[],
  value: string,
): IFetchedCodeReviewPullRequest[] => {
  return pullRequests.filter((row) => row.tags.some((tag: string) => tag.toLowerCase().includes(value)));
};

const filterByVotesHistoryTimeline = (
  pullRequests: IFetchedCodeReviewPullRequest[],
  value: string,
): IFetchedCodeReviewPullRequest[] => {
  return pullRequests.filter((row) =>
    row.votesHistoryTimeline.some((vote) => vote.author.toLowerCase().includes(value)),
  );
};

const filterByDate = (
  pullRequests: IFetchedCodeReviewPullRequest[],
  mappedKey: string,
  value: string,
): IFetchedCodeReviewPullRequest[] => {
  return pullRequests.filter((row) => {
    const formattedValue = formatDateWithoutTime(row[mappedKey as keyof IFetchedCodeReviewPullRequest] as string[]);
    const rowValue = formattedValue?.toLowerCase();
    return rowValue && rowValue.includes(value);
  });
};

const filterByOtherKeys = (
  pullRequests: IFetchedCodeReviewPullRequest[],
  mappedKey: string,
  value: string,
): IFetchedCodeReviewPullRequest[] => {
  return pullRequests.filter((row) => {
    const rowValue = (row[mappedKey as keyof IFetchedCodeReviewPullRequest] as string)?.toLowerCase();
    return rowValue && rowValue.includes(value);
  });
};
