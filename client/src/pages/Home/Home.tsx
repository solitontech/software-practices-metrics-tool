import BugReportIcon from "@mui/icons-material/BugReport";
import { Tooltip } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

import { NavBar, ErrorBoundary } from "src/components";
import { BUG_REPORT_LINK } from "src/constants";

import styles from "./Home.module.scss";

export const Home = () => {
  return (
    <ErrorBoundary key="home">
      <section className={styles.home}>
        <NavBar />
        <Outlet />
        <NavLink to={BUG_REPORT_LINK} target="_blank">
          <Tooltip title="Report Bug" arrow>
            <button className={styles.bugReport}>
              <BugReportIcon className={styles.icon} />
            </button>
          </Tooltip>
        </NavLink>
      </section>
    </ErrorBoundary>
  );
};
