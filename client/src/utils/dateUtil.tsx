import durationFormat from "humanize-duration";
import { DateTime, Interval } from "luxon";

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

export const getWorkingDaysTimeDifference = (endDate: string | null, startDate: string | null) => {
  if (!endDate || !startDate) {
    return null;
  }

  const start = DateTime.fromISO(startDate);
  const end = DateTime.fromISO(endDate);

  const differenceInSeconds = getTimeDifferenceInSeconds(start, end);
  const nonWorkingDays = getNumberOfNonWorkingDaysBetween(start, end);

  const workingDaysTimeDifference = differenceInSeconds - nonWorkingDays * SECONDS_IN_ONE_HOUR * HOURS_IN_A_DAY;

  return Math.round(workingDaysTimeDifference);
};

const getTimeDifferenceInSeconds = (start: DateTime, end: DateTime) => {
  return Interval.fromDateTimes(start, end).length("seconds");
};

const getNumberOfNonWorkingDaysBetween = (start: DateTime, end: DateTime) => {
  let count = 0;

  for (let i = start.plus({ days: 1 }); i < end; i = i.plus({ days: 1 })) {
    if (!isBusinessDay(i)) {
      count++;
    }
  }
  return count;
};

const isBusinessDay = (date: DateTime) => {
  const saturday = 6;
  const sunday = 7;

  const day = date.weekday;

  return day !== saturday && day !== sunday;
};

export const getHoursMinutesFromSeconds = cacheWrapperForUnaryFunction((value: number | null) => {
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

export const getDaysFromSeconds = (timeInSeconds: number | null, time: string) => {
  if (!timeInSeconds) {
    return NOT_AVAILABLE;
  }

  const hours = timeInSeconds / SECONDS_IN_ONE_HOUR;

  if (hours > HOURS_IN_A_DAY) {
    return getHoursToDays(hours);
  }

  return time;
};
