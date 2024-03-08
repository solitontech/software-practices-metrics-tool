import humanizeDuration from "humanize-duration";

import {
  FRACTION_TO_FIND_TIME,
  HOURS_IN_A_DAY,
  MINUTES_IN_ONE_HOUR,
  ONE_HOUR,
} from "../../../../constants/timeConstants";
import { cacheWrapperForUnaryFunction } from "../../../../utils/cache";

export const GREEN_COLOR = "green";
export const RED_COLOR = "red";
export const YELLOW_COLOR = "yellow";

export function getToolTipText(value: number, recommendedTime: string): string {
  return formatHoursToDays(value) + " ( " + recommendedTime + " )";
}

export function getTileColor(minThreshold: number, maxThreshold: number, value: number | string): string {
  if (typeof value == "string") return "";

  if (value < minThreshold) return GREEN_COLOR;
  if (value > maxThreshold) return RED_COLOR;
  else return YELLOW_COLOR;
}

export function appendHoursToNumber(hours: number): string {
  if (hours <= ONE_HOUR) {
    return `${hours} hour`;
  }
  return `${hours} hours`;
}

export const formatHoursToDays = cacheWrapperForUnaryFunction((hours: number): string => {
  if (hours >= HOURS_IN_A_DAY) {
    const durationInMilliseconds = hours * MINUTES_IN_ONE_HOUR * MINUTES_IN_ONE_HOUR * FRACTION_TO_FIND_TIME;

    return humanizeDuration(durationInMilliseconds, {
      units: ["d", "h"],
      round: true,
    });
  }

  return appendHoursToNumber(hours);
});
