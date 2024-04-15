import { memo } from "react";

import { NOT_AVAILABLE } from "src/constants/constants";
import { getHoursMinutesFromSeconds, getDaysFromSeconds } from "src/utils/utils";

import styles from "./CodeReviewDisplayHoursToDays.module.scss";

interface ICodeReviewDisplayHoursToDaysProps {
  timeInSeconds: number | null;
}

export const CodeReviewDisplayHoursToDays = memo(({ timeInSeconds }: ICodeReviewDisplayHoursToDaysProps) => {
  if (timeInSeconds === null) {
    return <p>{NOT_AVAILABLE}</p>;
  }

  const time = getHoursMinutesFromSeconds(timeInSeconds);
  const timeInDays = getDaysFromSeconds(timeInSeconds, time);

  return (
    <time className={styles.time} title={timeInDays}>
      {time}
    </time>
  );
});

CodeReviewDisplayHoursToDays.displayName = "CodeReviewDisplayHoursToDays";
