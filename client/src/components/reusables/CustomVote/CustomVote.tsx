import { memo } from "react";

import styles from "./CustomVote.module.scss";

interface ICustomVoteProps {
  imgSrc: string;
  tooltipText: string;
  count?: number;
}

export const CustomVote = memo(({ imgSrc, tooltipText, count }: ICustomVoteProps) => {
  return (
    <div className={styles.vote} title={tooltipText}>
      <img className={styles.image} src={imgSrc} alt={tooltipText} />
      {count}
    </div>
  );
});

CustomVote.displayName = "CustomVote";
