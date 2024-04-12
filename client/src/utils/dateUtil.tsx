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

export const getTimeInSeconds = (endDate: string | null, startDate: string | null) => {
  if (!endDate || !startDate) {
    return null;
  }

  const oneSecondInMilliseconds = 1000;

  let start = DateTime.fromISO(startDate);
  let end = DateTime.fromISO(endDate);
  let differenceInMilliseconds = getStartEndDateFloorDifference(start, end);

  // reset start date to the next day and end date to the previous day
  start = start.plus({ days: 1 }).startOf("day");
  end = end.minus({ days: 1 }).endOf("day");

  differenceInMilliseconds += getDifferenceFromStartToEndDate(start, end);

  const timeInSeconds = differenceInMilliseconds / oneSecondInMilliseconds;

  return Math.round(timeInSeconds);
};

const getStartEndDateFloorDifference = (start: DateTime, end: DateTime) => {
  let differenceInMilliseconds = 0;

  if (start.hasSame(end, "day")) {
    differenceInMilliseconds += Interval.fromDateTimes(start, end).length("milliseconds");
  } else {
    differenceInMilliseconds += Interval.fromDateTimes(start, start.endOf("day")).length("milliseconds");
    differenceInMilliseconds += Interval.fromDateTimes(end.startOf("day"), end).length("milliseconds");
  }

  return differenceInMilliseconds;
};

const getDifferenceFromStartToEndDate = (start: DateTime, end: DateTime) => {
  let differenceInMilliseconds = 0;

  while (start < end) {
    if (isBusinessDay(start)) {
      differenceInMilliseconds += Interval.fromDateTimes(start, start.endOf("day")).length("milliseconds");
    }
    start = start.plus({ days: 1 }).startOf("day");
  }

  return differenceInMilliseconds;
};

const isBusinessDay = (date: DateTime) => {
  const saturday = 6;
  const sunday = 7;

  const day = date.weekday;

  return day !== saturday && day !== sunday;
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

export const getTimeInDays = (timeInSeconds: number | null, time: string) => {
  if (!timeInSeconds) {
    return NOT_AVAILABLE;
  }

  const hours = timeInSeconds / SECONDS_IN_ONE_HOUR;

  if (hours > HOURS_IN_A_DAY) {
    return getHoursToDays(hours);
  }

  return time;
};
