import axios from "axios";
import { DateTime } from "luxon";

import {
  IPullRequestsInfoMergedToMain,
  IPullRequestsMergedToMain,
} from "../components/containers/TrunkBasedMetricsContainers/TrunkBasedPullRequestsTable/interfaces";

const dateFormat = "yyyy-MM-dd";

const PAGINATION_LIMIT = 300;
const FIRST_PAGE = 1;
interface PaginationData<T> {
  data: T[];
  count: number;
  errorCount?: number;
  filteredCount?: number;
}

export const getBaseURL = () => {
  return import.meta.env.MODE === "development" ? "http://localhost:3000" : window.location.origin;
};

export const trunkBasedMetricsAPI = `${getBaseURL()}/api/v1/metrics/trunk-based-development`;

export const formatDate = (date: Date) => {
  return DateTime.fromJSDate(date).toFormat(dateFormat);
};

export async function continueFetching<T>(
  fetchData: (api: URL, paginationCursor: number) => Promise<PaginationData<T>>,
  api: URL,
): Promise<{ list: T[]; errorCount: number }> {
  let paginationCursor = FIRST_PAGE;
  let continueFetching = true;
  const allData: T[] = [];
  let paginationErrorCount = 0;

  while (continueFetching) {
    try {
      const { data, count, errorCount = 0, filteredCount = 0 } = await fetchData(api, paginationCursor);

      allData.push(...data);

      if (count + errorCount + filteredCount === PAGINATION_LIMIT) {
        paginationErrorCount += errorCount;
        paginationCursor++;
      } else {
        continueFetching = false;
      }
    } catch (e) {
      continueFetching = false;

      if (paginationCursor === FIRST_PAGE) {
        throw e;
      }
    }
  }

  return { list: allData, errorCount: paginationErrorCount };
}

export async function fetchDataForPullRequestsMergedToMain(
  api: URL,
  paginationCursor: number,
): Promise<PaginationData<IPullRequestsMergedToMain>> {
  api.searchParams.set("paginationCursor", paginationCursor.toString());
  const { data } = await axios.get<IPullRequestsInfoMergedToMain>(api.href);

  return { data: data.pullRequests, count: data.count };
}
