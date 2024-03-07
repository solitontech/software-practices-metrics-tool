import { ChangeEvent, useId, useRef } from "react";

import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

import styles from "./SearchBox.module.scss";
import { InfoIconTooltip } from "../InfoIconTooltip/InfoIconTooltip";

interface Props {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  width?: number;
  placeHolder?: string;
  isDebounced?: boolean;
  delay?: number;
  onClick?: () => void;
}

interface ITimeRef {
  timerId: ReturnType<typeof setTimeout> | null;
}

export const SearchBox = ({
  onChange,
  label,
  width = 200,
  placeHolder = "",
  isDebounced = false,
  delay = 400,
  onClick,
}: Props) => {
  const inputLabelId = useId();
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
    <div className={styles.searchBox}>
      <FormControl sx={{ m: 1, backgroundColor: "white", margin: "8px 0px" }}>
        <InputLabel htmlFor={inputLabelId} className={styles.label}>
          {label}
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <InfoIconTooltip content={placeHolder} size="20px" />
            </InputAdornment>
          }
          label={label}
          onChange={handleInputChange}
          onClick={onClick}
          aria-labelledby={inputLabelId}
          style={{ width: width }}
          placeholder={placeHolder}
          autoComplete="off"
        />
      </FormControl>
    </div>
  );
};
