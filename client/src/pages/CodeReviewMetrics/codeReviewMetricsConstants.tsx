import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import TableRowsIcon from "@mui/icons-material/TableRows";

import { IFetchedCodeReviewPullRequest } from "src/services/api/api";

export const CODE_REVIEW_METRICS: Record<string, keyof IFetchedCodeReviewPullRequest> = {
  FIRST_REVIEW_RESPONSE: "firstReviewResponseTimeInSeconds",
  APPROVAL_TIME: "approvalTimeInSeconds",
  MERGE_TIME: "mergeTimeInSeconds",
};

export const CODE_REVIEW_METRICS_TABS = [
  {
    label: "TABLE VIEW",
    value: "table",
    icon: <TableRowsIcon />,
  },
  {
    label: "GRAPHICAL VIEW",
    value: "graph",
    icon: <BarChartOutlinedIcon />,
  },
  {
    label: "TREND ANALYSIS",
    value: "trendGraph",
    icon: <InsightsOutlinedIcon />,
  },
];
