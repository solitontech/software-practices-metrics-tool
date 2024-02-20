import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Tooltip } from "@mui/material";

import styles from "./CodeReviewMetricsTable.module.scss";
import { sortMap } from "./codeReviewMetricsTableConstants";

export interface CustomSortingIconProps {
  handleSort: (order: string) => void;
}

export const CustomSortingIcon = ({ handleSort }: CustomSortingIconProps) => {
  return (
    <div className={styles.sortingIcon}>
      <Tooltip title="Highest to Lowest" placement="top" arrow>
        <ExpandLessIcon
          className={styles.buttonColor}
          onClick={() => {
            handleSort(sortMap.asc);
          }}
        />
      </Tooltip>
      <Tooltip title="Lowest to Highest" placement="bottom" arrow>
        <ExpandMoreIcon
          className={styles.buttonColor}
          onClick={() => {
            handleSort(sortMap.desc);
          }}
        />
      </Tooltip>
    </div>
  );
};
