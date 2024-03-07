import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import TableRowsIcon from "@mui/icons-material/TableRows";

export const TRUNK_BASED_METRICS_TAB_VALUE = {
  TABLE: "table",
  GRAPH: "graph",
};

export const TRUNK_BASED_METRICS_TABS = [
  {
    value: TRUNK_BASED_METRICS_TAB_VALUE.TABLE,
    displayName: "TABLE VIEW",
    icon: <TableRowsIcon />,
  },
  {
    value: TRUNK_BASED_METRICS_TAB_VALUE.GRAPH,
    displayName: "GRAPHICAL VIEW",
    icon: <BarChartOutlinedIcon />,
  },
];
