import { useRef, useState } from "react";

import { BarChart } from "src/components/components";
import { useDimensions } from "src/hooks/hooks";
import { useTrunkBranchCommits } from "src/services/api/api";

import styles from "./TrunkBasedMetricsGraphs.module.scss";
import { TrunkBasedMetricsGraphsUtils } from "./trunkBasedMetricsGraphsUtils";

interface ITrunkBasedMetricsGraphsProps {
  startDate: Date;
  endDate: Date;
}

export const TrunkBasedMetricsGraphs = ({ startDate, endDate }: ITrunkBasedMetricsGraphsProps) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useDimensions(containerRef, setDimensions);

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

  return (
    <div ref={containerRef} className={styles.graphContainer}>
      <BarChart
        graph={{
          graphWidth: dimensions.width,
          graphHeight: dimensions.height,
          plots: [plot],
          xAxisName: "Days",
          yAxisName: "Number of commits",
          graphAnnotationText: `Total Commits in trunk branch : ${data.commits.length}`,
          graphTitle: "Commit frequency in trunk branch",
          annotationYPosition: TrunkBasedMetricsGraphsUtils.getAnnotationYPosition(dimensions.height),
        }}
      />
    </div>
  );
};
