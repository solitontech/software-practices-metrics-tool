import { Tile, InfoIconTooltip } from "src/components";
import { IFetchedTrunkBranchPullRequest } from "src/fetchers";

import styles from "./TrunkBasedPullRequestsTiles.module.scss";
import { getMergedPullRequest } from "./utils";

interface ITrunkBasedPullRequestsTilesProps {
  pullRequests: IFetchedTrunkBranchPullRequest[];
}

export const TrunkBasedPullRequestsTiles = ({ pullRequests }: ITrunkBasedPullRequestsTilesProps) => {
  const mergedPullRequest = getMergedPullRequest(pullRequests);

  return (
    <div className={styles.tiles}>
      <Tile title="Total Pull Requests">
        <div className={styles.tileContent}>
          <InfoIconTooltip content="Total pull requests for the selected start date range" size="16px" />
          <div>
            <span data-testid="total-pull-requests">{pullRequests.length}</span>
          </div>
        </div>
      </Tile>
      <Tile title="Percentage of branches merged">
        <div className={styles.tileContent}>
          <InfoIconTooltip content={mergedPullRequest.count} size="16px" />
          <div>
            <span data-testid="merged-branches-percentage">{mergedPullRequest.percentage}</span>
          </div>
        </div>
      </Tile>
    </div>
  );
};
