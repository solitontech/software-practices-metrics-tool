import { DateTime } from "luxon";

import { NOT_AVAILABLE } from "src/constants/constants";

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
