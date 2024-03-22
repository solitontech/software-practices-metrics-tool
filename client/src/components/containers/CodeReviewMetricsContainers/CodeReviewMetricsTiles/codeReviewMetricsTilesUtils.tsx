import { getHoursToDays } from "src/utils/utils";

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
      return `(${recommendation})`;
    }

    return `${getHoursToDays(time)} (${recommendation})`;
  }
}
