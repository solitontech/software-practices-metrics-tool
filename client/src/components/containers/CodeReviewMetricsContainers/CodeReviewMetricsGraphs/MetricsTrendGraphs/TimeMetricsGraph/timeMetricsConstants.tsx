import { Monthly } from "./monthlyGraphUtils";
import { TimeMetrics } from "./timeMetricsGraphInterface";
import { Weekly } from "./weeklyGraphUtils";

export const GRAPH_TOOLTIP_HEADER: Record<TimeMetrics, string> = {
  firstReviewResponse: "Average first review response time for a Pull Request is",
  approval: "Average approval time for a Pull Request is",
  merge: "Average merge time for a Pull Request is",
};

export const GRAPH_COLOR: Record<TimeMetrics, string> = {
  firstReviewResponse: "#0f52a0",
  approval: "#cbe6cb",
  merge: "#008000",
};

export const GRAPH_PLOT_NAME: Record<TimeMetrics, string> = {
  firstReviewResponse: "First review response time",
  approval: "Approval time",
  merge: "Merge time",
};

export const TREND_VIEW_CLASS = {
  Monthly: Monthly,
  Weekly: Weekly,
};
