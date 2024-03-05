import { ServerConfiguration } from '../../../../configs/server.config.js';

export const getFilteredPullRequests = (pullRequests) => {
  const developerIds = getSquadsDevelopersIds();

  if (!developerIds.length) {
    return pullRequests;
  }

  const filteredPullRequests = pullRequests.filter((pullRequest) => {
    return developerIds.includes(pullRequest.createdBy.id);
  });

  return filteredPullRequests;
};

const getSquadsDevelopersIds = () => {
  const squads = ServerConfiguration.clientFilters.squads;

  return squads.reduce((ids, squad) => {
    const developerIds = Object.keys(squad.developers);

    return ids.concat(developerIds);
  }, []);
};
