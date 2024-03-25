import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Tooltip } from "@mui/material";

import { sortMap } from "src/constants/constants";

import styles from "./CodeReviewSortingIcon.module.scss";

export interface ICodeReviewSortingIconProps {
  handleSort: (order: string) => void;
}

export const CodeReviewSortingIcon = ({ handleSort }: ICodeReviewSortingIconProps) => {
  return (
    <div className={styles.sortingIcon}>
      <Tooltip title="Highest to Lowest" placement="top" arrow>
        <ExpandLessIcon
          className={styles.sortButton}
          onClick={() => {
            handleSort(sortMap.asc);
          }}
        />
      </Tooltip>
      <Tooltip title="Lowest to Highest" placement="bottom" arrow>
        <ExpandMoreIcon
          className={styles.sortButton}
          onClick={() => {
            handleSort(sortMap.desc);
          }}
        />
      </Tooltip>
    </div>
  );
};
