import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";

import { Route } from "./NavBar";
import trunkBased from "../../../assets/images/trunkBased.svg";
import { pathToCodeReviewMetrics, pathToTrunkBasedMetrics } from "../../../constants/routeConstants";

export const routes: Route[] = [
  {
    name: "Code review Metrics",
    label: "Code review",
    link: pathToCodeReviewMetrics,
    iconPath: <CodeOutlinedIcon />,
  },
  {
    name: "Trunk Based Metrics",
    label: "Trunk Based",
    link: pathToTrunkBasedMetrics,
    iconPath: <img src={trunkBased} />,
  },
];
