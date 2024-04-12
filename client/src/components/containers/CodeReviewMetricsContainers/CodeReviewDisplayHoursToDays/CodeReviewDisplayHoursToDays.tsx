import { memo } from "react";

import { NOT_AVAILABLE } from "src/constants/constants";
import { getTimeFromSeconds, getTimeInDays } from "src/utils/utils";

import styles from "./CodeReviewDisplayHoursToDays.module.scss";

interface ICodeReviewDisplayHoursToDaysProps {
  timeInSeconds: number | null;
}

export const CodeReviewDisplayHoursToDays = memo(({ timeInSeconds }: ICodeReviewDisplayHoursToDaysProps) => {
  if (timeInSeconds === null) {
    return <p>{NOT_AVAILABLE}</p>;
  }

  const time = getTimeFromSeconds(timeInSeconds);
  const timeInDays = getTimeInDays(timeInSeconds, time);

  return (
    <time className={styles.time} title={timeInDays}>
      {time}
    </time>
  );
});

CodeReviewDisplayHoursToDays.displayName = "CodeReviewDisplayHoursToDays";
