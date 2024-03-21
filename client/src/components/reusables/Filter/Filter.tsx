import { ReactNode, useRef, useState } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import clsx from "clsx";

import { useOutsideClick } from "src/hooks/hooks";

import styles from "./Filter.module.scss";

interface IFilterIconProps {
  children: ReactNode;
  isActive?: boolean;
  style?: string;
}

export const FilterIcon = ({ isActive, style, children }: IFilterIconProps) => {
  const filterRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useOutsideClick(filterRef, setIsVisible);

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
