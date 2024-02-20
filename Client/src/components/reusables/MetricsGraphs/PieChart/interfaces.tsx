export interface IPiePlot {
  label: string;
  value: number;
  color: string;
  hoverText: string;
}

export interface IPieChart {
  plots: IPiePlot[];
  totalValue: number;
  graphTitle?: string;
  graphWidth?: number;
  graphHeight?: number;
  fileNameForImage?: string;
  graphAnnotationText: string;
  annotationYPosition?: number;
}
