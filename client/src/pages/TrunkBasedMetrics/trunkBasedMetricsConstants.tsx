import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import TableRowsIcon from "@mui/icons-material/TableRows";

export const TRUNK_BASED_METRICS_TAB_VALUE = {
  TABLE: "table",
  GRAPH: "graph",
};

export const TRUNK_BASED_METRICS_TABS = [
  {
    label: "TABLE VIEW",
    value: TRUNK_BASED_METRICS_TAB_VALUE.TABLE,
    icon: <TableRowsIcon />,
  },
  {
    label: "GRAPHICAL VIEW",
    value: TRUNK_BASED_METRICS_TAB_VALUE.GRAPH,
    icon: <BarChartOutlinedIcon />,
  },
];
