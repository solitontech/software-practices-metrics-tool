import { ICommit, ICommitsForDate, NormalizedDateRange } from "./interfaces";
import {
  Day,
  formatDate,
  getFormattedDateText,
} from "../../../../utils/formatTimeUtils";
import { DAY } from "../../CodeReviewMetricsContainers/CodeReviewMetricsGraphs/MetricsTrendGraphs/metricsTrendGraphConstants";

const saturday = 6;
const sunday = 0;

export function getCodeFreezeMetricToPlot(
  startDate: Date,
  endDate: Date,
  commits: ICommit[],
): ICommitsForDate {
  const { normalizedStartDate, normalizedEndDate } = normalizeDateRange(
    startDate,
    endDate,
  );

  const datesInRange: Date[] = generateDatesInRange(
    normalizedStartDate,
    normalizedEndDate,
  );

  const dateCounts: ICommitsForDate = getDateWithCommitsToPlot(
    datesInRange,
    commits,
  );

  return dateCounts;
}

function normalizeDateRange(
  startDate: Date,
  endDate: Date,
): NormalizedDateRange {
  const normalizedStartDate = new Date(startDate);
  const normalizedEndDate = new Date(endDate);

  normalizedStartDate.setHours(0, 0, 0, 0);
  normalizedEndDate.setHours(23, 59, 59, 999);

  return { normalizedStartDate, normalizedEndDate };
}

function generateDatesInRange(startDate: Date, endDate: Date): Date[] {
  const datesInRange: Date[] = [];

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    datesInRange.push(new Date(date));
  }

  return datesInRange;
}

function getDateWithCommitsToPlot(
  dates: Date[],
  commits: ICommit[],
): ICommitsForDate {
  const dateCounts: ICommitsForDate = {};

  dates.forEach((date: Date) => {
    const formattedDate: string = getFormattedDateText(
      date,
      DAY.TWO_DIGIT as Day,
    );

    dateCounts[formattedDate] = 0;
  });

  const commitCountsPerDate = countCommitsForDates(dateCounts, commits);
  const commitCountsForPlot = removeWeekendsWithNoCommits(commitCountsPerDate);

  return commitCountsForPlot;
}

function countCommitsForDates(
  dateCounts: ICommitsForDate,
  commits: ICommit[],
): ICommitsForDate {
  commits.forEach((item: ICommit) => {
    const date: string = getFormattedDateText(
      new Date(formatDate(item.author.date)),
      DAY.TWO_DIGIT as Day,
    );

    dateCounts[date]++;
  });

  return dateCounts;
}

function removeWeekendsWithNoCommits(dateCounts: ICommitsForDate) {
  Object.keys(dateCounts).forEach((date: string) => {
    const dayOfWeek: number = new Date(date).getDay();

    if ((dayOfWeek === saturday || dayOfWeek === sunday) && !dateCounts[date]) {
      delete dateCounts[date];
    }
  });

  return dateCounts;
}
