import { BarChart } from "src/components";
import { useTrunkBranchCommits } from "src/fetchers";

import styles from "./TrunkBasedMetricsGraphs.module.scss";
import { TrunkBasedMetricsGraphsUtils } from "./trunkBasedMetricsGraphsUtils";

interface ITrunkBasedMetricsGraphsProps {
  startDate: Date;
  endDate: Date;
}

export const TrunkBasedMetricsGraphs = ({ startDate, endDate }: ITrunkBasedMetricsGraphsProps) => {
  const { data } = useTrunkBranchCommits(startDate, endDate);

  const commitsToPlot = TrunkBasedMetricsGraphsUtils.getCommitsToPlot(startDate, endDate, data.commits);

  const commitsToPlotKeys = Object.keys(commitsToPlot);

  const plot = {
    xLabels: commitsToPlotKeys,
    yValues: Object.values(commitsToPlot),
    color: styles.GRAPH_COLOR,
    hoverText: commitsToPlotKeys,
    plotName: "",
  };

  //TODO: Improvement add dynamic width & height for graph based on available space

  return (
    <div className={styles.graphContainer}>
      <BarChart
        graph={{
          plots: [plot],
          xAxisName: "Days",
          yAxisName: "Number of commits",
          graphAnnotationText: `Total Commits in trunk branch : ${data.commits.length}`,
          graphTitle: "Commit frequency in trunk branch",
        }}
      />
    </div>
  );
};
