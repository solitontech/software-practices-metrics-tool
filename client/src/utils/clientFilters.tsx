import { IPullRequestSuccessInfo } from "../components/containers/CodeReviewMetricsContainers/CodeReviewMetricsTable/interfaces";
import { IContextClientFiltersSquad } from "../context";

export const getClientFilteredPullRequests = (
  data: IPullRequestSuccessInfo | undefined,
  filters: IContextClientFiltersSquad[],
): IPullRequestSuccessInfo | undefined => {
  const isValid = data && filters.length !== 0;

  if (!isValid) {
    return data;
  }

  const filteredData: IPullRequestSuccessInfo = { ...data };

  const { developerIdsMap, reviewerIdsMap } = getSquadsUserIdsMap(filters);

  filteredData.pullRequestList = data.pullRequestList.filter((pullRequest) => {
    const isValidDeveloper = developerIdsMap.has(pullRequest.authorId);
    const hasValidReviewer =
      !reviewerIdsMap.size || pullRequest.votesHistoryTimeline.some((vote) => reviewerIdsMap.get(vote.id));

    return isValidDeveloper && hasValidReviewer;
  });

  return filteredData;
};

const getSquadsUserIdsMap = (squads: IContextClientFiltersSquad[]) => {
  const developerIdsMap: Map<string, boolean> = new Map();
  const reviewerIdsMap: Map<string, boolean> = new Map();

  squads.forEach((squad) => {
    for (const reviewer in squad.reviewers) {
      const isSelected = squad.reviewers[reviewer].isSelected;

      if (isSelected) {
        reviewerIdsMap.set(reviewer, isSelected);
      }
    }

    for (const developer in squad.developers) {
      const isSelected = squad.developers[developer].isSelected;

      if (isSelected) {
        developerIdsMap.set(developer, isSelected);
      }
    }
  });

  return { developerIdsMap, reviewerIdsMap };
};
