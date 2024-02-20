export interface IHistogram {
  xValues: number[];
  startValue: number;
  endValue: number;
  binSize: number;
  binText: string[];
  markerColor: string[];
  hoverText: string[];
}

export interface IHistogramChart {
  plot: IHistogram;
  xAxisName?: string;
  yAxisName?: string;
  graphTitle?: string;
  graphWidth?: number;
  graphHeight?: number;
  fileNameForImage?: string;
  graphAnnotationText: string;
}
