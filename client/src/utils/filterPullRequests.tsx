import { formatDateWithoutTime } from "./formatTimeUtils";
import { getDeepSearchPullRequests } from "./getDeepSearchPullRequests";
import {
  ALL_CHIPS,
  CHIP,
} from "../components/containers/CodeReviewMetricsContainers/CodeReviewChips/codeReviewSearchChipsConstants";
import { IFetchedCodeReviewPullRequest } from "../fetchers";

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
