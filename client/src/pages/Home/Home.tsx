import BugReportIcon from "@mui/icons-material/BugReport";
import { Tooltip } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

import styles from "./Home.module.scss";
import { NavBar } from "../../components/containers/NavBar/NavBar.tsx";

export const Home = () => {
  return (
    <div className={styles.home}>
      <NavBar />
      <Outlet />
      <NavLink
        to="https://dev.azure.com/Soliton/SolitonCentral/_workitems/edit/31686"
        target="_blank"
      >
        <Tooltip title="Report Bug" arrow>
          <div className={styles.bugReport}>
            <BugReportIcon className={styles.icon} />
          </div>
        </Tooltip>
      </NavLink>
    </div>
  );
};
