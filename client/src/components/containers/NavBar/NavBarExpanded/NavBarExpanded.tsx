import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { Drawer } from "@mui/material";

import logo from "src/assets/images/solitonWhiteLogo.svg";
import techForceLogo from "src/assets/images/techForceLogo.png";

import styles from "./NavBarExpanded.module.scss";

interface INavBarExpandedProps {
  routes: JSX.Element[];
  handleCollapse: () => void;
}

export const NavBarExpanded = ({ routes, handleCollapse }: INavBarExpandedProps) => {
  return (
    <nav className={styles.navBar}>
      <Drawer
        anchor="left"
        style={{ height: "100%" }}
        variant="permanent"
        classes={{
          paper: styles.paper,
        }}
      >
        <div className={styles.toolbar}>
          <img src={logo} alt="Soliton"></img>
          <button className={styles.arrow} onClick={handleCollapse}>
            <ArrowCircleLeftOutlinedIcon className={styles.icon} />
          </button>
        </div>
        <div className={styles.flexGrow}>{routes}</div>
        <div className={styles.techForce}>
          <img src={techForceLogo} alt="tech-force-logo" />
        </div>
        <p className={styles.logoText}>Powered by TechOps</p>
      </Drawer>
    </nav>
  );
};
