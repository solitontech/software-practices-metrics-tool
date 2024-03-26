export type ITrunkBasedMetricsTabValue = "table" | "graph";

export interface ITrukBasedMetricsTabs {
  label: string;
  value: ITrunkBasedMetricsTabValue;
  icon: JSX.Element;
}
