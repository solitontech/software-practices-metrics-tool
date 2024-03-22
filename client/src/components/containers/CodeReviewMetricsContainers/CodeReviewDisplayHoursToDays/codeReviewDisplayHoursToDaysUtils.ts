import durationFormat from "humanize-duration";

import {
  NOT_AVAILABLE,
  MINUTES_IN_ONE_HOUR,
  FRACTION_TO_FIND_TIME,
  SECONDS_IN_ONE_HOUR,
  HOURS_IN_A_DAY,
} from "src/constants/constants";
import { cacheWrapperForUnaryFunction, getHoursToDays } from "src/utils/utils";

export class CodeReviewDisplayHoursToDaysUtil {
  static getTimeFromSeconds = cacheWrapperForUnaryFunction((value: number | null) => {
    if (!value) {
      return NOT_AVAILABLE;
    }

    if (value < MINUTES_IN_ONE_HOUR) {
      return `${value} seconds`;
    }

    return durationFormat(value * FRACTION_TO_FIND_TIME, {
      units: ["h", "m"],
      round: true,
    });
  });

  static getTimeInDays(timeInSeconds: number, time: string) {
    const hours = timeInSeconds / SECONDS_IN_ONE_HOUR;

    if (hours > HOURS_IN_A_DAY) {
      return getHoursToDays(hours);
    }

    return time;
  }
}
