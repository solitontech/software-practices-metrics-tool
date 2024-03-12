import { DateTime } from "luxon";

import { cacheWrapperForUnaryFunction } from "./cache";
import { NOT_AVAILABLE } from "../constants/common.constants";

export type Day = "2-digit" | undefined;

export type Year = "numeric" | undefined;

export const formatDate = cacheWrapperForUnaryFunction((date: string): string => {
  if (!date) {
    return NOT_AVAILABLE;
  }

  return DateTime.fromISO(date).toFormat("dd LLL yy, hh:mm a");
});

export const formatDateWithoutTime = cacheWrapperForUnaryFunction((date: string): string => {
  if (!date) {
    return NOT_AVAILABLE;
  }

  return DateTime.fromISO(date).toFormat("dd LLL yy");
});

export function getFormattedDateText(date: Date, day?: Day, year?: Year): string {
  return date.toLocaleDateString("en-US", {
    day,
    month: "short",
    year,
  });
}
