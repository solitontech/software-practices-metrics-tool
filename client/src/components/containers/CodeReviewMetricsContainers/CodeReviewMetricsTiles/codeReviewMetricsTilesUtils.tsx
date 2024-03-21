import humanizeDuration from "humanize-duration";

import { FRACTION_TO_FIND_TIME, HOURS_IN_A_DAY, MINUTES_IN_ONE_HOUR } from "src/constants/constants";
import { cacheWrapperForUnaryFunction } from "src/utils/utils";

import { MIN_THRESHOLD_CLASS, MAX_THRESHOLD_CLASS, INSIDE_THRESHOLD_CLASS } from "./codeReviewMetricsTilesConstants";

export class CodeReviewMetricsTilesUtil {
  static getTileClass(minThreshold: number, maxThreshold: number, value: number | string) {
    if (typeof value == "string") {
      return "";
    }

    if (value < minThreshold) {
      return MIN_THRESHOLD_CLASS;
    }

    if (value > maxThreshold) {
      return MAX_THRESHOLD_CLASS;
    }

    return INSIDE_THRESHOLD_CLASS;
  }

  static getDisplayHours(hours: number | string) {
    if (typeof hours === "string") {
      return hours;
    }

    return `${hours} hours`;
  }

  static getToolTipText(time: number | string, recommendation: string) {
    if (typeof time === "string") {
      return `( ${recommendation} )`;
    }

    return `${this.#formatHoursToDays(time)} ( ${recommendation} )`;
  }

  static #formatHoursToDays = cacheWrapperForUnaryFunction((hours: number) => {
    if (hours >= HOURS_IN_A_DAY) {
      const durationInMilliseconds = hours * MINUTES_IN_ONE_HOUR * MINUTES_IN_ONE_HOUR * FRACTION_TO_FIND_TIME;

      return humanizeDuration(durationInMilliseconds, {
        units: ["d", "h"],
        round: true,
      });
    }

    return `${hours} hours`;
  });
}
