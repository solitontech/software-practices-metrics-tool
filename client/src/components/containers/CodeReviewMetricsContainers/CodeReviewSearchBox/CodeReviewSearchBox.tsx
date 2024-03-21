import { ChangeEvent, useEffect, useState, useRef } from "react";

import { Chip } from "@mui/material";
import clsx from "clsx";

import { ClientFilters, SearchBox } from "src/components/components";

import styles from "./CodeReviewSearchBox.module.scss";
import { CHIPS } from "./codeReviewSearchBoxConstants";

interface ICodeReviewSearchBoxProps {
  selectedChip: string;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleChipChange: (chip: string) => void;
}

const PLACEHOLDER = "Search for date, title, tags, author, reviewer & status";

export const CodeReviewSearchBox = ({
  selectedChip,
  handleSearchChange,
  handleChipChange,
}: ICodeReviewSearchBoxProps) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [searchPlaceHolder, setSearchPlaceHolder] = useState(PLACEHOLDER);

  //TODO: extract as reusable hook
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target instanceof Node && searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChipClick = (currentChip: string) => {
    const chip = CHIPS.find((chip) => chip.key === currentChip);

    if (!chip) {
      return;
    }

    if (selectedChip.includes(chip.key)) {
      setSearchPlaceHolder(PLACEHOLDER);
      handleChipChange("");

      return;
    }

    handleChipChange(chip.key);
    setSearchPlaceHolder(chip.placeholder);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBox} ref={searchRef}>
        <SearchBox
          label="Search Pull Requests"
          placeHolder={searchPlaceHolder}
          onChange={handleSearchChange}
          onClick={() => setIsSearchDropdownOpen(true)}
          isDebounced={true}
          className={styles.searchBoxInput}
        ></SearchBox>
        {isSearchDropdownOpen && (
          <div className={styles.chipContainer}>
            {CHIPS.map(({ key, label }) => {
              const selectedClass = clsx(selectedChip.includes(key) && styles.selectedChip);

              return (
                <Chip
                  key={key}
                  label={label}
                  className={`${styles.chipBox} ${selectedClass}`}
                  onClick={() => handleChipClick(key)}
                />
              );
            })}
          </div>
        )}
      </div>
      <ClientFilters />
    </div>
  );
};
