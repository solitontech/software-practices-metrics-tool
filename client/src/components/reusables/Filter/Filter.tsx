import { ReactNode, useRef, useEffect, useState } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";

import styles from "./Filter.module.scss";

interface Props {
  children: ReactNode;
  isFilterSelected?: boolean;
  style?: string;
}

export const FilterIcon = ({ children, isFilterSelected, style }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const toggleFilterVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.filterIconContainer}>
      <FilterListIcon
        onClick={toggleFilterVisibility}
        className={`${styles.filterIcon} ${isFilterSelected ? styles.filterIconSelected : ""} ${style}`}
      />

      {isVisible && <div ref={filterRef}>{children}</div>}
    </div>
  );
};
