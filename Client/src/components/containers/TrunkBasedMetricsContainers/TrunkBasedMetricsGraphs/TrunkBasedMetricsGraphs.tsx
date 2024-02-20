import { ICommitsForDate } from "./interfaces";
import styles from "./TrunkBasedMetricsGraphs.module.scss";
import { getCodeFreezeMetricToPlot } from "./trunkBasedMetricsGraphsUtils";
import { useTrunkBasedMetricsCodeFreeze } from "../../../../queries/useTrunkBasedMetricsCodeFreeze";
import { BarChart } from "../../../reusables/MetricsGraphs/BarChart/BarChart";
import { IBarPlot } from "../../../reusables/MetricsGraphs/BarChart/interfaces";

interface Props {
  startDate: Date;
  endDate: Date;
}

const GRAPH_TITLE = "Commit frequency in trunk branch";
const Y_AXIS_NAME = "Number of commits in trunk branch";
const X_AXIS_NAME = "Days";
const GRAPH_COLOR = styles.GRAPH_COLOR;

export const TrunkBasedMetricsGraphs = ({ startDate, endDate }: Props) => {
  const {
    data: { commitList },
  } = useTrunkBasedMetricsCodeFreeze(startDate, endDate);

  const codeFreezeMetrics: ICommitsForDate = getCodeFreezeMetricToPlot(
    startDate,
    endDate,
    commitList,
  );

  const codeFreezeKeys = Object.keys(codeFreezeMetrics);

  const plot: IBarPlot = {
    xLabels: codeFreezeKeys,
    yValues: Object.values(codeFreezeMetrics),
    color: GRAPH_COLOR,
    hoverText: codeFreezeKeys,
    plotName: GRAPH_TITLE,
  };

  return (
    <div className={styles.graph}>
      <BarChart
        graphObject={{
          plots: [plot],
          xAxisName: X_AXIS_NAME,
          yAxisName: Y_AXIS_NAME,
          graphAnnotationText: `Total Commits in trunk branch : ${commitList.length}`,
          graphTitle: GRAPH_TITLE,
        }}
      />
    </div>
  );
};
