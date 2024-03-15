export interface IBarPlot {
  xLabels: string[];
  yValues: number[];
  color: string;
  hoverText: string[];
  plotName: string;
}

export type IBarChartMode = "stack" | "group";

export type IBarChartTrendView = "monthly" | "weekly";

export interface IBarChart {
  plots: IBarPlot[];
  xAxisName: string;
  yAxisName: string;
  graphTitle?: string;
  graphWidth?: number;
  graphHeight?: number;
  fileNameForImage?: string;
  graphAnnotationText: string;
  annotationYPosition?: number;
  barMode?: IBarChartMode;
  yAxisTickSuffix?: string;
}
