import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { Drawer } from "@mui/material";

import styles from "./NavBarCollapsed.module.scss";

interface INavBarCollapsedProps {
  routes: JSX.Element[];
  handleExpand: () => void;
}

export const NavBarCollapsed = ({ routes, handleExpand }: INavBarCollapsedProps) => {
  return (
    <nav>
      <Drawer
        variant="permanent"
        classes={{
          paper: styles.paper,
        }}
        anchor="left"
        style={{ height: "100%" }}
      >
        <div className={styles.toolbar}>
          <button onClick={handleExpand} className={styles.arrow}>
            <ArrowCircleRightOutlinedIcon className={styles.icon} />
          </button>

          <div className={styles.flexGrow}>{routes}</div>
        </div>
      </Drawer>
    </nav>
  );
};
