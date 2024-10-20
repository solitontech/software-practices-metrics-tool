import { DateTime } from "luxon";

export const NOT_AVAILABLE = "-";
export const BUG_REPORT_LINK = "https://github.com/solitontech/software-practices-metrics-tool/issues/new";

export const HOURS_IN_A_DAY = 24;
export const SECONDS_IN_ONE_HOUR = 3600;
export const MINUTES_IN_ONE_HOUR = 60;
export const ONE_HOUR = 1;
export const FRACTION_TO_FIND_TIME = 1000;

export const dateRange = {
  today: DateTime.local().toJSDate(),
  sevenDaysAgoFromToday: DateTime.local().minus({ days: 7 }).toJSDate(),
  sixMonthsAgoFromToday: DateTime.local().minus({ days: 190 }).toJSDate(),
  sixMonthsAgoFrom: (date: Date) => DateTime.fromJSDate(date).minus({ days: 190 }).toJSDate(),
};
