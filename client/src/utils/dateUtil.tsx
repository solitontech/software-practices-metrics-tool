import durationFormat from "humanize-duration";
import { DateTime } from "luxon";

import { NOT_AVAILABLE, HOURS_IN_A_DAY, SECONDS_IN_ONE_HOUR, FRACTION_TO_FIND_TIME } from "src/constants/constants";

import { cacheWrapperForUnaryFunction } from "./cacheUtil";

type TDay = "2-digit" | undefined;
type TYear = "numeric" | undefined;

export const getFormattedDateWithTime = cacheWrapperForUnaryFunction((date: string) => {
  if (!date) {
    return NOT_AVAILABLE;
  }

  return DateTime.fromISO(date).toFormat("dd LLL yy, hh:mm a");
});

export const getFormattedDateWithoutTime = cacheWrapperForUnaryFunction((date: string) => {
  if (!date) {
    return NOT_AVAILABLE;
  }

  return DateTime.fromISO(date).toFormat("dd LLL yy");
});

export function getFormattedDateText(date: Date, day?: TDay, year?: TYear) {
  return date.toLocaleDateString("en-US", {
    day,
    month: "short",
    year,
  });
}

export const getHoursToDays = cacheWrapperForUnaryFunction((hours: number) => {
  if (hours >= HOURS_IN_A_DAY) {
    const milliSeconds = hours * SECONDS_IN_ONE_HOUR * FRACTION_TO_FIND_TIME;

    return durationFormat(milliSeconds, {
      units: ["d", "h"],
      round: true,
    });
  }

  return `${hours} hours`;
});
