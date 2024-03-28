import { useState } from "react";

import clsx from "clsx";
import { NavLink } from "react-router-dom";

import styles from "./NavBar.module.scss";
import { NavBarCollapsed } from "./NavBarCollapsed/NavBarCollapsed.tsx";
import { routes } from "./navBarConstants.tsx";
import { NavBarExpanded } from "./NavBarExpanded/NavBarExpanded.tsx";

export const NavBar = () => {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  const linkClass = isNavBarOpen ? styles.expandedLink : styles.collapsedLink;
  const iconClass = isNavBarOpen ? styles.expandedIcon : styles.collapsedIcon;

  const navRoutes = routes.map((route) => (
    <NavLink
      className={({ isActive }) => `${linkClass} ${clsx(isActive && styles.activePage)}`}
      to={route.link}
      key={route.label}
      title={route.label}
    >
      <div className={iconClass}>{route.icon}</div>
      {isNavBarOpen && <p>{route.label}</p>}
    </NavLink>
  ));

  const toggleNavBar = () => {
    setIsNavBarOpen(!isNavBarOpen);
  };

  if (isNavBarOpen) {
    return <NavBarExpanded routes={navRoutes} handleCollapse={toggleNavBar} />;
  }

  return <NavBarCollapsed routes={navRoutes} handleExpand={toggleNavBar} />;
};
