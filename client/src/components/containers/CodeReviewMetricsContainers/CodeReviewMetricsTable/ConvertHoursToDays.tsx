import { memo } from "react";

import styles from "./CodeReviewMetricsTable.module.scss";
import { convertTimeToDays, getTimeFromSeconds } from "./codeReviewMetricsTableUtils";

interface Props {
  timeInSeconds: number | null;
}

export const ConvertHoursToDays = memo(({ timeInSeconds }: Props) => {
  const isInvalid = timeInSeconds === null;

  if (isInvalid) {
    return <div>-</div>;
  }

  return (
    <time className={styles.time} title={convertTimeToDays(timeInSeconds, getTimeFromSeconds(timeInSeconds))}>
      {getTimeFromSeconds(timeInSeconds)}
    </time>
  );
});

ConvertHoursToDays.displayName = "ConvertHoursToDays";
