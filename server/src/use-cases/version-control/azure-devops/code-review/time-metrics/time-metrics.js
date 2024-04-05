import { PULL_REQUEST_STATUS } from '../constants/constants.js';

export class TimeMetrics {
  static getPullRequestMergeTime({ status, creationDate, closedDate }) {
    if (status !== PULL_REQUEST_STATUS.COMPLETED) {
      return null;
    }

    return this.#getTimeInSeconds(closedDate, creationDate);
  }

  static #getTimeInSeconds(endDate, startDate) {
    const differenceInMilliseconds = new Date(endDate) - new Date(startDate);
    const milliSecondsInSecond = 1000;

    const timeInSeconds = differenceInMilliseconds / milliSecondsInSecond;

    return Math.round(timeInSeconds);
  }
}
