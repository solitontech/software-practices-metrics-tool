import { DateTime } from "luxon";

import { NOT_AVAILABLE } from "src/constants";

import { cacheWrapperForUnaryFunction } from "./cacheUtil";

type TDay = "2-digit" | undefined;
type TYear = "numeric" | undefined;

// TODO: change name to getFormattedDateWithTime & getFormattedDateWithoutTime
export const formatDate = cacheWrapperForUnaryFunction((date: string) => {
  if (!date) {
    return NOT_AVAILABLE;
  }

  return DateTime.fromISO(date).toFormat("dd LLL yy, hh:mm a");
});

export const formatDateWithoutTime = cacheWrapperForUnaryFunction((date: string) => {
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
