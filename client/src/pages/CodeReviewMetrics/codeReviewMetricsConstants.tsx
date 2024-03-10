import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import TableRowsIcon from "@mui/icons-material/TableRows";

import { IFetchersCodeReviewPullRequest } from "../../fetchers";

export const CODE_REVIEW_METRICS = {
  FIRST_REVIEW_RESPONSE: "firstReviewResponseTimeInSeconds" as keyof IFetchersCodeReviewPullRequest,
  APPROVAL_TIME: "approvalTimeInSeconds" as keyof IFetchersCodeReviewPullRequest,
  MERGE_TIME: "mergeTimeInSeconds" as keyof IFetchersCodeReviewPullRequest,
};

export const CODE_REVIEW_METRICS_TAB_VALUE = {
  TABLE: "table",
  GRAPH: "graph",
  TREND_GRAPH: "trend-graph",
};

export const CODE_REVIEW_METRICS_TABS = [
  {
    value: CODE_REVIEW_METRICS_TAB_VALUE.TABLE,
    displayName: "TABLE VIEW",
    icon: <TableRowsIcon />,
  },
  {
    value: CODE_REVIEW_METRICS_TAB_VALUE.GRAPH,
    displayName: "GRAPHICAL VIEW",
    icon: <BarChartOutlinedIcon />,
  },
  {
    value: CODE_REVIEW_METRICS_TAB_VALUE.TREND_GRAPH,
    displayName: "TREND ANALYSIS",
    icon: <InsightsOutlinedIcon />,
  },
];
