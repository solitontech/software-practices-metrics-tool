import { ChangeEvent, useId, useRef } from "react";

import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import clsx from "clsx";

import styles from "./SearchBox.module.scss";
import { InfoIconTooltip } from "../InfoIconTooltip/InfoIconTooltip";

interface ISearchBoxProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  className?: string;
  placeHolder?: string;
  isDebounced?: boolean;
  delay?: number;
  onClick?: () => void;
}

interface ITimeRef {
  timerId: ReturnType<typeof setTimeout> | null;
}

export const SearchBox = ({
  label,
  placeHolder = "",
  className,
  onChange,
  isDebounced = false,
  delay = 400,
  onClick,
}: ISearchBoxProps) => {
  const id = useId();
  const timeoutRef = useRef<ITimeRef>({
    timerId: null,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isDebounced) {
      return onChange(event);
    }

    if (timeoutRef.current.timerId) {
      clearTimeout(timeoutRef.current.timerId);
    }

    timeoutRef.current.timerId = setTimeout(() => {
      onChange(event);
    }, delay);
  };

  return (
    <div className={styles.container}>
      <FormControl className={styles.searchBox}>
        <InputLabel htmlFor={id} className={styles.label}>
          {label}
        </InputLabel>
        <OutlinedInput
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <InfoIconTooltip content={placeHolder} className={styles.searchIcon} />
            </InputAdornment>
          }
          label={label}
          onChange={handleInputChange}
          onClick={onClick}
          aria-labelledby={id}
          className={clsx(className ?? styles.searchBoxInput)}
          placeholder={placeHolder}
          autoComplete="off"
        />
      </FormControl>
    </div>
  );
};
