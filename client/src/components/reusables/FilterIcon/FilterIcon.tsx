import { ReactNode, useRef, useState } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import clsx from "clsx";

import { useOutsideClick } from "src/hooks/hooks";

import styles from "./FilterIcon.module.scss";

interface IFilterIconProps {
  children: ReactNode;
  isActive?: boolean;
  className?: string;
}

export const FilterIcon = ({ isActive, className, children }: IFilterIconProps) => {
  const filterRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useOutsideClick(filterRef, setIsVisible);

  return (
    <div className={styles.container} ref={filterRef}>
      <FilterListIcon
        onClick={() => setIsVisible(!isVisible)}
        className={clsx(styles.filterIcon, className, isActive && styles.isActive)}
      />

      {isVisible && <>{children}</>}
    </div>
  );
};
