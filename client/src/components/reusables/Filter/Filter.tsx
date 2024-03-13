import { ReactNode, useRef, useEffect, useState } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import clsx from "clsx";

import styles from "./Filter.module.scss";

interface IFilterIconProps {
  children: ReactNode;
  isActive?: boolean;
  style?: string;
}

export const FilterIcon = ({ isActive, style, children }: IFilterIconProps) => {
  const filterRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  //TODO: extract as reusable hook
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
