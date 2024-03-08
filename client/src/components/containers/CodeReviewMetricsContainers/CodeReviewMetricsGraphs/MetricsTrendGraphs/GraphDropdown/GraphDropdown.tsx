import { Select, MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";

import styles from "./GraphDropdown.module.scss";
import {
  TREND_VIEW,
  TREND_VIEW_DISPLAY_TEXT,
  GRAPH_TYPE,
  GRAPH_TYPE_DISPLAY_TEXT,
} from "../../../../../reusables/MetricsGraphs/BarChart/barChartConstants";
import { BarMode, TrendView } from "../../../../../reusables/MetricsGraphs/BarChart/interfaces";

interface GraphOptions {
  trendView: TrendView;
  barMode?: BarMode;
  isMonthlyDisabled: boolean;
}

interface Props {
  graphOptions: GraphOptions;
  setTrendView: (value: TrendView) => void;
  setBarMode?: (value: BarMode) => void;
}

export const GraphDropdown = ({
  graphOptions: { trendView, barMode, isMonthlyDisabled },
  setTrendView,
  setBarMode,
}: Props) => {
  return (
    <div className={styles.dropdownContainers}>
      <div className={styles.dropdownContainer}>
        <div className={styles.selectHeading}>Trend view</div>

        <FormControl variant="standard" fullWidth>
          <Select
            className={styles.selectBox}
            value={trendView}
            onChange={(event) => {
              setTrendView(event.target.value as TrendView);
            }}
          >
            <MenuItem className={styles.menuItem} value={TREND_VIEW.WEEKLY}>
              {TREND_VIEW_DISPLAY_TEXT.WEEKLY}
            </MenuItem>

            <MenuItem disabled={isMonthlyDisabled} className={styles.menuItem} value={TREND_VIEW.MONTHLY}>
              {TREND_VIEW_DISPLAY_TEXT.MONTHLY}
            </MenuItem>
          </Select>
        </FormControl>
      </div>

      {barMode && setBarMode && (
        <div className={styles.dropdownContainer}>
          <div className={styles.selectHeading}>Graph type</div>

          <FormControl variant="standard" fullWidth>
            <Select
              className={styles.selectBox}
              value={barMode}
              onChange={(event) => {
                setBarMode(event.target.value as BarMode);
              }}
            >
              <MenuItem className={styles.menuItem} value={GRAPH_TYPE.GROUP}>
                {GRAPH_TYPE_DISPLAY_TEXT.GROUP}
              </MenuItem>

              <MenuItem className={styles.menuItem} value={GRAPH_TYPE.STACK}>
                {GRAPH_TYPE_DISPLAY_TEXT.STACK}
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      )}
    </div>
  );
};
