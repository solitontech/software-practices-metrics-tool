import { Tile, InfoIconTooltip } from "src/components/components";

import styles from "./TrunkBasedPullRequestsTiles.module.scss";

interface ITrunkBasedPullRequestsTilesProps {
  pullRequestCount: number;
  mergeCount: number;
}

export const TrunkBasedPullRequestsTiles = ({ pullRequestCount, mergeCount }: ITrunkBasedPullRequestsTilesProps) => {
  const mergePercentage = mergeCount ? `${((mergeCount / pullRequestCount) * 100).toFixed()}%` : "0%";

  return (
    <div className={styles.container}>
      <Tile title="Total Pull Requests">
        <div className={styles.tileContainer}>
          <InfoIconTooltip content="Total pull requests for the selected start date range" />
          <p data-testid="total-pull-requests" className={styles.tileContent}>
            {pullRequestCount}
          </p>
        </div>
      </Tile>
      <Tile title="Percentage of branches merged">
        <div className={styles.tileContainer}>
          <InfoIconTooltip content={`${mergeCount} branches is merged out of ${pullRequestCount} branches`} />
          <p data-testid="merged-branches-percentage" className={styles.tileContent}>
            {mergePercentage}
          </p>
        </div>
      </Tile>
    </div>
  );
};
