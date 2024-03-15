import { Config, Data, Layout } from "plotly.js";
import Plot from "react-plotly.js";

import { IPieChart } from "./pieChartTypes";
import { ANNOTATIONS, GRAPH } from "../metricsGraphConstants";

interface IPieChartProps {
  graph: IPieChart;
}

//TODO: remove enum and use constants to avoid typescript "as" conversion
export const PieChart = ({
  graph: {
    plots,
    totalValue,
    graphTitle = "",
    graphHeight = GRAPH.HEIGHT as number,
    graphWidth = GRAPH.WIDTH as number,
    fileNameForImage = "pie-chart",
    graphAnnotationText,
    annotationYPosition = ANNOTATIONS.Y_POSITION,
  },
}: IPieChartProps) => {
  const values: number[] = [];
  const labels: string[] = [];
  const colors: string[] = [];
  const hoverTexts: string[] = [];
  const traceValues: string[] = [];

  plots.forEach(({ value, label, color, hoverText }) => {
    values.push(value);
    labels.push(label);
    colors.push(color);
    hoverTexts.push(hoverText);

    const percentage = +((value / totalValue) * 100).toFixed(1);

    traceValues.push(value ? `${value} (${percentage}%)` : "");
  });

  const data: Data[] = [
    {
      type: "pie",
      values,
      labels,
      marker: {
        colors,
      },
      texttemplate: traceValues,
      hovertext: hoverTexts,
      hoverinfo: GRAPH.HOVER_INFO,
      hoverlabel: {
        align: GRAPH.HOVER_ALIGN,
        bgcolor: GRAPH.TOOL_TIP_BACKGROUND_COLOR as string,
      },
    },
  ];

  const layout: Partial<Layout> = {
    title: {
      text: graphTitle,
      xref: ANNOTATIONS.AXIS_REFERENCE,
      yref: ANNOTATIONS.AXIS_REFERENCE,
      x: ANNOTATIONS.X_POSITION as number,
      y: ANNOTATIONS.Y_POSITION as number,
    },
    width: graphWidth,
    height: graphHeight,
    font: {
      family: GRAPH.FONT_FAMILY as string,
    },
    annotations: [
      {
        x: ANNOTATIONS.X_POSITION,
        y: annotationYPosition,
        xref: ANNOTATIONS.AXIS_REFERENCE,
        yref: ANNOTATIONS.AXIS_REFERENCE,
        text: graphAnnotationText,
        showarrow: false,
        bordercolor: ANNOTATIONS.BORDER_COLOR as string,
        borderwidth: ANNOTATIONS.BORDER_WIDTH as number,
        borderpad: ANNOTATIONS.BORDER_PAD as number,
        font: {
          size: ANNOTATIONS.FONT_SIZE as number,
        },
      },
    ],
  };

  const config: Partial<Config> = {
    displaylogo: false,
    toImageButtonOptions: {
      filename: fileNameForImage,
    },
  };

  return <Plot data={data} layout={layout} config={config} />;
};
