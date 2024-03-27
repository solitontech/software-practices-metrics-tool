import BugReportIcon from "@mui/icons-material/BugReport";
import { Tooltip } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

import { NavBar } from "src/components/containers/NavBar/NavBar";
import { ErrorBoundary } from "src/components/reusables/ErrorBoundary/ErrorBoundary";
import { BUG_REPORT_LINK } from "src/constants/constants";

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
