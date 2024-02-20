import { Chip as MuiChip } from "@mui/material";

import styles from "./CodeReviewSearchChips.module.scss";

interface Props {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export const CodeReviewSearchChips = ({ label, selected, onClick }: Props) => {
  return (
    <MuiChip
      label={label}
      onClick={onClick}
      className={`${selected ? styles.selectedChip : ""} ${styles.chipKey}`}
    />
  );
};
