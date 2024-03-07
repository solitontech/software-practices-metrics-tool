import { Config, Data, Layout, ModeBarDefaultButtons } from "plotly.js";
import Plot from "react-plotly.js";

import { EMPTY_STRING, TAB_SPACE } from "./barChartConstants";
import { IBarChart } from "./interfaces";
import {
  ANNOTATIONS,
  GRAPH,
  GRAPH_MODE_BAR_BUTTONS_TO_REMOVE,
} from "../metricsConstants";

interface Props {
  graphObject: IBarChart;
}

const GRAPH_TYPE = "bar";

export const BarChart = ({
  graphObject: {
    plots,
    graphTitle = "",
    xAxisName = "",
    yAxisName = "",
    graphHeight = GRAPH.HEIGHT as number,
    graphWidth = GRAPH.WIDTH as number,
    fileNameForImage = "bar-chart",
    graphAnnotationText,
    barMode = "group",
    annotationYPosition = ANNOTATIONS.Y_POSITION,
    yAxisTickSuffix,
  },
}: Props) => {
  const data: Data[] = plots.map((plot) => {
    return {
      type: GRAPH_TYPE,
      x: plot.xLabels,
      y: plot.yValues,
      marker: {
        color: plot.color,
      },
      text: plot.yValues.map(String),
      hovertext: plot.hoverText,
      hoverinfo: GRAPH.HOVER_INFO,
      hoverlabel: {
        align: GRAPH.HOVER_ALIGN,
        bgcolor: GRAPH.TOOL_TIP_BACKGROUND_COLOR as string,
      },
      name: plot.plotName,
    };
  });

  const layout: Partial<Layout> = {
    title: {
      text: graphTitle,
      xref: ANNOTATIONS.AXIS_REFERENCE,
      yref: ANNOTATIONS.AXIS_REFERENCE,
      x: ANNOTATIONS.X_POSITION as number,
      y: ANNOTATIONS.Y_POSITION as number,
    },
    xaxis: {
      title: xAxisName,
      rangemode: GRAPH.AXIS_RANGE_MODE,
    },
    yaxis: {
      title: yAxisName,
      rangemode: GRAPH.AXIS_RANGE_MODE,
      ticksuffix: yAxisTickSuffix,
      // This is a workaround to add space between the tick and the axis label as Plotly doesn't support it.
      tickprefix: yAxisTickSuffix ? TAB_SPACE : EMPTY_STRING,
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
    barmode: barMode,
    dragmode: GRAPH.DRAG_MODE,
  };

  const config: Partial<Config> = {
    displaylogo: false,
    toImageButtonOptions: {
      filename: fileNameForImage,
    },
    modeBarButtonsToRemove:
      GRAPH_MODE_BAR_BUTTONS_TO_REMOVE as ModeBarDefaultButtons[],
    scrollZoom: true,
  };

  return <Plot data={data} layout={layout} config={config} />;
};
