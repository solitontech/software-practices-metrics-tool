import { memo } from "react";

import { NOT_AVAILABLE } from "src/constants/constants";

import styles from "./CodeReviewDisplayHoursToDays.module.scss";
import { CodeReviewDisplayHoursToDaysUtil } from "./codeReviewDisplayHoursToDaysUtils";

interface ICodeReviewDisplayHoursToDaysProps {
  timeInSeconds: number | null;
}

export const CodeReviewDisplayHoursToDays = memo(({ timeInSeconds }: ICodeReviewDisplayHoursToDaysProps) => {
  if (timeInSeconds === null) {
    return <p>{NOT_AVAILABLE}</p>;
  }

  const time = CodeReviewDisplayHoursToDaysUtil.getTimeFromSeconds(timeInSeconds);
  const timeInDays = CodeReviewDisplayHoursToDaysUtil.getTimeInDays(timeInSeconds, time);

  return (
    <time className={styles.time} title={timeInDays}>
      {time}
    </time>
  );
});

CodeReviewDisplayHoursToDays.displayName = "CodeReviewDisplayHoursToDays";
