import durationFormat from "humanize-duration";
import { DateTime } from "luxon";

import {
  NOT_AVAILABLE,
  HOURS_IN_A_DAY,
  SECONDS_IN_ONE_HOUR,
  FRACTION_TO_FIND_TIME,
  MINUTES_IN_ONE_HOUR,
} from "src/constants/constants";

import { cacheWrapperForUnaryFunction } from "./cacheUtil";

type TDay = "2-digit" | undefined;
type TYear = "numeric" | undefined;

export const getFormattedDateWithTime = cacheWrapperForUnaryFunction((date: string | null) => {
  if (!date) {
    return NOT_AVAILABLE;
  }

  return DateTime.fromISO(date).toFormat("dd LLL yy, hh:mm a");
});

export const getFormattedDateWithoutTime = cacheWrapperForUnaryFunction((date: string | null) => {
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

export const getTimeInSeconds = (endDate: string, startDate: string) => {
  const differenceInMilliseconds = new Date(endDate).getTime() - new Date(startDate).getTime();
  const milliSecondsInSecond = 1000;

  const timeInSeconds = differenceInMilliseconds / milliSecondsInSecond;

  return Math.round(timeInSeconds);
};

export const getTimeFromSeconds = cacheWrapperForUnaryFunction((value: number | null) => {
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

export const getTimeInDays = (timeInSeconds: number, time: string) => {
  const hours = timeInSeconds / SECONDS_IN_ONE_HOUR;

  if (hours > HOURS_IN_A_DAY) {
    return getHoursToDays(hours);
  }

  return time;
};
