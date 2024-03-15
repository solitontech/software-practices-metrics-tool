interface IHistogramPlot {
  xValues: number[];
  startValue: number;
  endValue: number;
  binSize: number;
  binText: string[];
  markerColor: string[];
  hoverText: string[];
}

export interface IHistogramChart {
  plot: IHistogramPlot;
  xAxisName?: string;
  yAxisName?: string;
  graphTitle?: string;
  graphWidth?: number;
  graphHeight?: number;
  fileNameForImage?: string;
  graphAnnotationText: string;
}
