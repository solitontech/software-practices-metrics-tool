import { useState } from "react";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { NavLink } from "react-router-dom";

import styles from "./TrunkBasedMetricsTiles.module.scss";
import dataInfoAlert from "../../../../assets/images/dataInfoAlert.svg";
import { NOT_AVAILABLE } from "../../../../constants/commonConstants";
import { useTrunkBasedMetricsActiveBranches } from "../../../../queries/useTrunkBasedMetricsActiveBranches";
import { useTrunkBasedMetricsTotalBranches } from "../../../../queries/useTrunkBasedMetricsTotalBranches";
import { DialogBox } from "../../../reusables/DialogBox/DialogBox";
import { InfoIconTooltip } from "../../../reusables/InfoIconTooltip/InfoIconTooltip";
import { Tile } from "../../../reusables/Tile/Tile";
import { TrunkBasedActiveBranchesTable } from "../TrunkBasedActiveBranchesTable/TrunkBasedActiveBranchesTable";
import { TrunkBasedNamingConventionTable } from "../TrunkBasedNamingConventionTable/TrunkBasedNamingConventionTable";

const TRUNK_BASED_METRICS_TILE_HEADERS = {
  TOTAL_BRANCHES: "Total no of branches",
  ACTIVE_BRANCHES: "Active PR's to trunk branch",
  BRANCHES_FOLLOWING_NAMING_STANDARD: "Branches following naming standard",
};

export const TrunkBasedMetricsTiles = () => {
  const [isActiveBranchDialogOpen, setIsActiveBranchDialogOpen] =
    useState(false);

  const [
    isBranchesNamingConventionDialogOpen,
    setIsBranchesNamingConventionDialogOpen,
  ] = useState(false);

  const {
    data: {
      branchesURL = "",
      totalNumberOfBranches = 0,
      percentageOfBranchesFollowingStandard = NOT_AVAILABLE,
      branchesFollowingNamingStandard: {
        count: branchesFollowingNamingStandardCount = 0,
      } = {},
      branchesNotFollowingNamingStandard: {
        count: branchesNotFollowingNamingStandardCount = 0,
        branches: branchesNotFollowingNamingStandardBranches = [],
      } = {},
    } = {},
  } = useTrunkBasedMetricsTotalBranches();

  const {
    data: { activeBranchesList },
  } = useTrunkBasedMetricsActiveBranches();

  return (
    <>
      <Tile title={TRUNK_BASED_METRICS_TILE_HEADERS.TOTAL_BRANCHES}>
        <div className={styles.tileContent}>
          <InfoIconTooltip
            content="Total number of branches in the repository"
            size="16px"
          />
          <div className={styles.tileInfo}>
            <div data-testid="total-branches">
              {totalNumberOfBranches ? totalNumberOfBranches : NOT_AVAILABLE}
            </div>
            <NavLink to={branchesURL} target="blank" className={styles.navLink}>
              <OpenInNewIcon className={styles.navIcon} />
            </NavLink>
          </div>
        </div>
      </Tile>
      <Tile title={TRUNK_BASED_METRICS_TILE_HEADERS.ACTIVE_BRANCHES}>
        <div className={styles.tileContent}>
          <InfoIconTooltip
            content="Active pull requests raised to the trunk
                branch ( Recommendation - Number of active PRs should not be more than  number of developers in the team )"
            size="16px"
          />
          <div className={styles.tileInfo}>
            <div data-testid="active-branches">
              {activeBranchesList.length
                ? activeBranchesList.length
                : NOT_AVAILABLE}
            </div>
            <div
              className={styles.icon}
              onClick={() => setIsActiveBranchDialogOpen(true)}
            >
              <img
                src={dataInfoAlert}
                className={styles.dialogIcon}
                alt="dataAlert"
              />
            </div>
          </div>
        </div>
      </Tile>
      <Tile
        title={
          TRUNK_BASED_METRICS_TILE_HEADERS.BRANCHES_FOLLOWING_NAMING_STANDARD
        }
      >
        <div className={styles.tileContent}>
          <InfoIconTooltip
            content={`${branchesFollowingNamingStandardCount} branches following naming standard ( Recommended naming standard is - users/firstname-lastname/task-name )`}
            size="16px"
          />
          <div className={styles.tileInfo}>
            <div data-testid="branches-following-naming-standard">
              {percentageOfBranchesFollowingStandard}
            </div>
            <div
              className={styles.icon}
              onClick={() => setIsBranchesNamingConventionDialogOpen(true)}
            >
              <img
                src={dataInfoAlert}
                className={styles.dialogIcon}
                alt="dataAlert"
              />
            </div>
          </div>
        </div>
      </Tile>

      <DialogBox
        open={isActiveBranchDialogOpen}
        onClose={() => setIsActiveBranchDialogOpen(false)}
        content={
          <TrunkBasedActiveBranchesTable activeBranches={activeBranchesList} />
        }
        minWidth="800px"
      >
        <div>Active PR&apos;s to trunk branch</div>
      </DialogBox>

      <DialogBox
        open={isBranchesNamingConventionDialogOpen}
        onClose={() => setIsBranchesNamingConventionDialogOpen(false)}
        content={
          <TrunkBasedNamingConventionTable
            branchesNotFollowingNamingStandard={
              branchesNotFollowingNamingStandardBranches
            }
          />
        }
        minWidth="550px"
      >
        <div className={styles.tileContent}>
          <div>Branches not following naming standard</div>
          <InfoIconTooltip
            content={`${branchesNotFollowingNamingStandardCount} branches not
              following naming standard ( Recommended naming standard is -
                users/firstname-lastname/task-name )`}
            size="16px"
          />
        </div>
      </DialogBox>
    </>
  );
};
