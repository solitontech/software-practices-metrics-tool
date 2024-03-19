import { IFetchedTrunkBranchCommit } from "src/services/api/api";
import { formatDate, getFormattedDateText } from "src/utils/utils";

interface ITrunkGraphCommitsForDate {
  [date: string]: number;
}

export class TrunkBasedMetricsGraphsUtils {
  static #normalizeDateRange(startDate: Date, endDate: Date) {
    const normalizedStartDate = new Date(startDate);
    const normalizedEndDate = new Date(endDate);

    normalizedStartDate.setHours(0, 0, 0, 0);
    normalizedEndDate.setHours(23, 59, 59, 999);

    return { normalizedStartDate, normalizedEndDate };
  }

  static #generateDatesInRange(startDate: Date, endDate: Date) {
    const datesInRange: Date[] = [];

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      datesInRange.push(new Date(date));
    }

    return datesInRange;
  }

  static #removeWeekendsWithNoCommits(dateCounts: ITrunkGraphCommitsForDate) {
    const saturday = 6;
    const sunday = 0;

    Object.keys(dateCounts).forEach((date: string) => {
      const dayOfWeek: number = new Date(date).getDay();

      if ((dayOfWeek === saturday || dayOfWeek === sunday) && !dateCounts[date]) {
        delete dateCounts[date];
      }
    });

    return dateCounts;
  }

  static #countCommitsForDates(dateCounts: ITrunkGraphCommitsForDate, commits: IFetchedTrunkBranchCommit[]) {
    commits.forEach((item) => {
      const date = getFormattedDateText(new Date(formatDate(item.author.date)), "2-digit");

      dateCounts[date]++;
    });

    return dateCounts;
  }

  static #getDateWithCommitsToPlot(dates: Date[], commits: IFetchedTrunkBranchCommit[]) {
    const dateCounts: ITrunkGraphCommitsForDate = {};

    dates.forEach((date: Date) => {
      const formattedDate = getFormattedDateText(date, "2-digit");

      dateCounts[formattedDate] = 0;
    });

    const commitCountsForDate = this.#countCommitsForDates(dateCounts, commits);

    return this.#removeWeekendsWithNoCommits(commitCountsForDate);
  }

  static getCommitsToPlot(startDate: Date, endDate: Date, commits: IFetchedTrunkBranchCommit[]) {
    const { normalizedStartDate, normalizedEndDate } = this.#normalizeDateRange(startDate, endDate);

    const datesInRange = this.#generateDatesInRange(normalizedStartDate, normalizedEndDate);

    return this.#getDateWithCommitsToPlot(datesInRange, commits);
  }
}
