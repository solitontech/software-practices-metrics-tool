import React, { useState } from "react";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { NavLink } from "react-router-dom";

import dataInfoAlert from "src/assets/images/dataInfoAlert.svg";
import {
  DialogBox,
  InfoIconTooltip,
  Tile,
  TrunkBasedActiveBranchesTable,
  TrunkBasedNamingConventionTable,
} from "src/components";
import { NOT_AVAILABLE } from "src/constants";
import { useTrunkBasedMetricsActiveBranches, useTrunkBasedMetricsTotalBranches } from "src/fetchers";

import styles from "./TrunkBasedMetricsTiles.module.scss";
import { TILE, DIALOG } from "./trunkBasedMetricsTilesConstants";

export const TrunkBasedMetricsTiles = () => {
  const [isActiveBranchesDialogOpen, setIsActiveBranchesDialogOpen] = useState(false);
  const [isBranchesNamingDialogOpen, setIsBranchesNamingDialogOpen] = useState(false);

  const {
    data: { activeBranches },
  } = useTrunkBasedMetricsActiveBranches();

  const {
    data: {
      branchesURL,
      totalNumberOfBranches,
      percentageOfBranchesFollowingStandard,
      branchesFollowingNamingStandard,
      branchesNotFollowingNamingStandard,
    },
  } = useTrunkBasedMetricsTotalBranches();

  const toggleActiveBranchesDialog = () => {
    setIsActiveBranchesDialogOpen(!isActiveBranchesDialogOpen);
  };

  const toggleBranchesNamingDialog = () => {
    setIsBranchesNamingDialogOpen(!isBranchesNamingDialogOpen);
  };

  return (
    <React.Fragment>
      <Tile title={TILE.totalBranches.title}>
        <div className={styles.tileContent}>
          <InfoIconTooltip content={TILE.totalBranches.toolTip} />
          <p data-testid="total-branches">{totalNumberOfBranches || NOT_AVAILABLE}</p>
          <NavLink to={branchesURL} target="blank" className={styles.navLink}>
            <OpenInNewIcon className={styles.navIcon} />
          </NavLink>
        </div>
      </Tile>

      <Tile title={TILE.activePR.title}>
        <div className={styles.tileContent}>
          <InfoIconTooltip content={TILE.activePR.toolTip} />
          <p data-testid="active-branches">{activeBranches.length || NOT_AVAILABLE}</p>
          <img
            data-testid="active-branches-button"
            src={dataInfoAlert}
            className={styles.dialogIcon}
            alt="dataAlert"
            onClick={toggleActiveBranchesDialog}
          />
        </div>
      </Tile>

      <Tile title={TILE.namingConvention.title}>
        <div className={styles.tileContent}>
          <InfoIconTooltip content={`${branchesFollowingNamingStandard.count} ${TILE.namingConvention.toolTip}`} />
          <p data-testid="branches-following-naming-standard">
            {percentageOfBranchesFollowingStandard || NOT_AVAILABLE}
          </p>
          <img
            data-testid="branches-naming-convention-button"
            src={dataInfoAlert}
            className={styles.dialogIcon}
            alt="dataAlert"
            onClick={toggleBranchesNamingDialog}
          />
        </div>
      </Tile>

      <DialogBox
        isOpen={isActiveBranchesDialogOpen}
        handleClose={toggleActiveBranchesDialog}
        title={DIALOG.activePR.title}
        width={DIALOG.activePR.width}
      >
        <TrunkBasedActiveBranchesTable activeBranches={activeBranches} />
      </DialogBox>

      <DialogBox
        isOpen={isBranchesNamingDialogOpen}
        handleClose={toggleBranchesNamingDialog}
        title={DIALOG.namingConvention.title}
        width={DIALOG.namingConvention.width}
      >
        <TrunkBasedNamingConventionTable
          branchesNotFollowingNamingStandard={branchesNotFollowingNamingStandard.branches}
        />
      </DialogBox>
    </React.Fragment>
  );
};
