import { Tile, InfoIconTooltip } from "src/components";
import { IFetchedTrunkBranchPullRequest } from "src/fetchers";

import styles from "./TrunkBasedPullRequestsTiles.module.scss";
import { getMergedPullRequest } from "./trunkBasedPullRequestsTilesUtils";

interface ITrunkBasedPullRequestsTilesProps {
  pullRequests: IFetchedTrunkBranchPullRequest[];
}

export const TrunkBasedPullRequestsTiles = ({ pullRequests }: ITrunkBasedPullRequestsTilesProps) => {
  const mergedPullRequest = getMergedPullRequest(pullRequests);

  return (
    <div className={styles.container}>
      <Tile title="Total Pull Requests">
        <div className={styles.tileContent}>
          <InfoIconTooltip content="Total pull requests for the selected start date range" />
          <p data-testid="total-pull-requests">{pullRequests.length}</p>
        </div>
      </Tile>
      <Tile title="Percentage of branches merged">
        <div className={styles.tileContent}>
          <InfoIconTooltip content={mergedPullRequest.count} />
          <p data-testid="merged-branches-percentage">{mergedPullRequest.percentage}</p>
        </div>
      </Tile>
    </div>
  );
};
