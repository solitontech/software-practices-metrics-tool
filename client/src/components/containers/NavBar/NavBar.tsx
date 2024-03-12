import { useState } from "react";

import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { Drawer } from "@mui/material";
import { NavLink } from "react-router-dom";

import styles from "./NavBar.module.scss";
import { routes } from "./navBarConstants.tsx";
import logo from "../../../assets/images/solitonWhiteLogo.svg";
import techForceLogo from "../../../assets/images/techForceLogo.png";
import { pathToMetrics } from "../../../constants/route.constant.ts";

export interface Route {
  name: string;
  label: string;
  link: string;
  iconPath: React.ReactNode;
}

export const NavBar = () => {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  const getListItems = (routes: Route[], isLabelNeeded: boolean) => {
    return routes.map((route) => (
      <NavLink
        className={(navData) =>
          `${isLabelNeeded ? styles.link : styles.smallLink}  ${navData.isActive ? styles.selectedPage : ""} `
        }
        to={route.link}
        key={route.label}
        title={isLabelNeeded ? "" : route.label}
      >
        <div className={isLabelNeeded ? styles.pageIconCtr : styles.smallPageIconCtr}>
          <span>{route.iconPath}</span>
        </div>
        {isLabelNeeded ? <p>{route.label}</p> : ""}
      </NavLink>
    ));
  };

  return (
    <>
      {isNavBarOpen ? (
        <div className={styles.navBar}>
          <Drawer
            variant="permanent"
            classes={{
              paper: styles.drawerPaper,
            }}
            anchor="left"
            style={{ height: "100%" }}
          >
            <div className={styles.drawerToolbar}>
              <NavLink to={pathToMetrics}>
                <img src={logo} alt="Soliton"></img>
              </NavLink>
              <div className={styles.cursorPointer} onClick={() => setIsNavBarOpen(!isNavBarOpen)}>
                <ArrowCircleLeftOutlinedIcon className={styles.icon} />
              </div>
            </div>
            <div className={` ${styles.utilizeAvailableSpace}`}>{getListItems(routes, true)}</div>
            <div className={styles.techForce}>
              <div>
                <img src={techForceLogo} alt="logo" />
              </div>
            </div>
            <p className={styles.logoText}>Powered by TechOps</p>
          </Drawer>
        </div>
      ) : (
        <div>
          <Drawer
            variant="permanent"
            classes={{
              paper: styles.smallDrawerPaper,
            }}
            anchor="left"
            style={{ height: "100%" }}
          >
            <div className={styles.smallDrawerContent}>
              <div onClick={() => setIsNavBarOpen(!isNavBarOpen)} className={styles.cursorPointer}>
                <ArrowCircleRightOutlinedIcon className={styles.icon} />
              </div>
              <div>
                <div className={` ${styles.utilizeAvailableSpace}`}>{getListItems(routes, false)}</div>
              </div>
            </div>
          </Drawer>
        </div>
      )}
    </>
  );
};
