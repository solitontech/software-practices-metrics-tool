import { Config, Data, Layout, ModeBarDefaultButtons } from "plotly.js";
import Plot from "react-plotly.js";

import { IHistogramChart } from "./histogramTypes";
import { ANNOTATIONS, GRAPH, GRAPH_MODE_BAR_BUTTONS_TO_REMOVE } from "../metricsGraphConstants";

interface IHistogramChartProps {
  graph: IHistogramChart;
}

export const HistogramChart = ({
  graph: {
    plot: { xValues, startValue, endValue, binSize, binText, markerColor, hoverText },
    xAxisName = "",
    yAxisName = "",
    graphTitle = "",
    graphWidth = GRAPH.WIDTH as number,
    graphHeight = GRAPH.HEIGHT as number,
    graphAnnotationText,
    fileNameForImage = "histogram-chart",
  },
}: IHistogramChartProps) => {
  const data: Data[] = [
    {
      type: "histogram",
      x: xValues,
      xbins: {
        start: startValue,
        end: endValue,
        size: binSize,
      },
      text: binText,
      marker: {
        color: markerColor,
      },
      hovertext: hoverText,
      hoverinfo: GRAPH.HOVER_INFO,
      hoverlabel: {
        align: GRAPH.HOVER_ALIGN,
        bgcolor: GRAPH.TOOL_TIP_BACKGROUND_COLOR as string,
      },
    },
  ];

  const layout: Partial<Layout> = {
    title: graphTitle,
    xaxis: {
      title: xAxisName,
      rangemode: GRAPH.AXIS_RANGE_MODE,
    },
    yaxis: {
      title: yAxisName,
      rangemode: GRAPH.AXIS_RANGE_MODE,
    },
    annotations: [
      {
        x: ANNOTATIONS.X_POSITION,
        y: ANNOTATIONS.Y_POSITION,
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
    width: graphWidth,
    height: graphHeight,
    font: {
      family: GRAPH.FONT_FAMILY as string,
    },
    dragmode: GRAPH.DRAG_MODE,
  };

  const config: Partial<Config> = {
    displaylogo: false,
    toImageButtonOptions: {
      filename: fileNameForImage,
    },
    editable: false,
    modeBarButtonsToRemove: GRAPH_MODE_BAR_BUTTONS_TO_REMOVE as ModeBarDefaultButtons[],
    scrollZoom: true,
  };

  return <Plot data={data} layout={layout} config={config} />;
};
