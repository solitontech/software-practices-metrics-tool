import {
  ALL_CHIPS,
  CHIP,
} from "src/components/containers/CodeReviewMetricsContainers/CodeReviewChips/codeReviewSearchChipsConstants";
import { IFetchedCodeReviewPullRequest } from "src/fetchers";
import { formatDateWithoutTime } from "src/utils";

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

export const filterPullRequests = (
  pullRequests: IFetchedCodeReviewPullRequest[],
  userSearchKey: string,
  userSearchTerm: string,
): IFetchedCodeReviewPullRequest[] => {
  if (userSearchKey === ALL_CHIPS) {
    return getSearchedPullRequests(pullRequests, userSearchTerm);
  } else {
    const chip = CHIP.find((chip) => chip.chipKey === userSearchKey);

    if (!chip) {
      return [];
    }

    const mappedKey = chip.pullRequestKey;

    return getDeepSearchPullRequests(pullRequests, mappedKey, userSearchTerm);
  }
};

const getSearchedPullRequests = (
  pullRequests: IFetchedCodeReviewPullRequest[],
  searchTerm: string,
): IFetchedCodeReviewPullRequest[] => {
  return pullRequests.filter((row) => {
    const { title, createdBy, creationDate, closedDate, status, tags, votesHistoryTimeline } = row;
    const formattedCreationDate = formatDateWithoutTime(creationDate);
    const formattedClosedDate = formatDateWithoutTime(closedDate);
    const reviewerInVotes = votesHistoryTimeline.some((vote) => vote.author.toLowerCase().includes(searchTerm));

    return (
      title.toLowerCase().includes(searchTerm) ||
      createdBy.toLowerCase().includes(searchTerm) ||
      formattedCreationDate.toLowerCase().includes(searchTerm) ||
      tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      formattedClosedDate.toLowerCase().includes(searchTerm) ||
      status.toLowerCase().includes(searchTerm) ||
      reviewerInVotes
    );
  });
};
