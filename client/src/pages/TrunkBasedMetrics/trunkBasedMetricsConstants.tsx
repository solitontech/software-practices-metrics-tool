import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import TableRowsIcon from "@mui/icons-material/TableRows";

import { ITrukBasedMetricsTabs } from "./trunkBasedMetricsTypes";

export const trunkBasedTabs: ITrukBasedMetricsTabs[] = [
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
];
