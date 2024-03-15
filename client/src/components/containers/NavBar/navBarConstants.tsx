import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";

import trunkBased from "src/assets/images/trunkBased.svg";
import { routePaths } from "src/constants";

export const routes = [
  {
    name: "Code review Metrics",
    label: "Code review",
    link: routePaths.codeReviewMetrics,
    icon: <CodeOutlinedIcon />,
  },
  {
    name: "Trunk Based Metrics",
    label: "Trunk Based",
    link: routePaths.trunkBasedMetrics,
    icon: <img src={trunkBased} />,
  },
];
