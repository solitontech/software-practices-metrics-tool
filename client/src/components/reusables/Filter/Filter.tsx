import { ReactNode, useRef, useState } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import clsx from "clsx";

import styles from "./Filter.module.scss";
import { useHandleClickOutside } from "src/hooks/hooks";

interface IFilterIconProps {
  children: ReactNode;
  isActive?: boolean;
  style?: string;
}

export const FilterIcon = ({ isActive, style, children }: IFilterIconProps) => {
  const filterRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useHandleClickOutside(filterRef, setIsVisible);

  return (
    <div className={styles.container} ref={filterRef}>
      <FilterListIcon
        onClick={() => setIsVisible(!isVisible)}
        className={clsx(styles.filterIcon, style, isActive && styles.isActive)}
      />

      {isVisible && <div>{children}</div>}
    </div>
  );
};
