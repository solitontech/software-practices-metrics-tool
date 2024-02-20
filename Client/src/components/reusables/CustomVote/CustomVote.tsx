import { memo } from "react";

import styles from "./CustomVote.module.scss";

interface Props {
  imgSrc: string;
  tooltipText: string;
  count?: number;
}

export const CustomVote = memo(({ imgSrc, tooltipText, count }: Props) => {
  return (
    <div className={styles.vote} title={tooltipText}>
      <img className={styles.image} src={imgSrc} alt={tooltipText} />
      {count}
    </div>
  );
});

CustomVote.displayName = "CustomVote";
