import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";

import trunkBased from "src/assets/images/trunkBased.svg";
import { routePaths } from "src/constants";

import { Route } from "./NavBar";

export const routes: Route[] = [
  {
    name: "Code review Metrics",
    label: "Code review",
    link: routePaths.codeReviewMetrics,
    iconPath: <CodeOutlinedIcon />,
  },
  {
    name: "Trunk Based Metrics",
    label: "Trunk Based",
    link: routePaths.trunkBasedMetrics,
    iconPath: <img src={trunkBased} />,
  },
];
