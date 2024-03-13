import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import TableRowsIcon from "@mui/icons-material/TableRows";

import { IFetchedCodeReviewPullRequest } from "../../fetchers";

export const CODE_REVIEW_METRICS = {
  FIRST_REVIEW_RESPONSE: "firstReviewResponseTimeInSeconds" as keyof IFetchedCodeReviewPullRequest,
  APPROVAL_TIME: "approvalTimeInSeconds" as keyof IFetchedCodeReviewPullRequest,
  MERGE_TIME: "mergeTimeInSeconds" as keyof IFetchedCodeReviewPullRequest,
};

export const CODE_REVIEW_METRICS_TAB_VALUE = {
  TABLE: "table",
  GRAPH: "graph",
  TREND_GRAPH: "trend-graph",
};

export const CODE_REVIEW_METRICS_TABS = [
  {
    label: "TABLE VIEW",
    value: CODE_REVIEW_METRICS_TAB_VALUE.TABLE,
    icon: <TableRowsIcon />,
  },
  {
    label: "GRAPHICAL VIEW",
    value: CODE_REVIEW_METRICS_TAB_VALUE.GRAPH,
    icon: <BarChartOutlinedIcon />,
  },
  {
    label: "TREND ANALYSIS",
    value: CODE_REVIEW_METRICS_TAB_VALUE.TREND_GRAPH,
    icon: <InsightsOutlinedIcon />,
  },
];
