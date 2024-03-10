import { START_PAGINATION_CURSOR, PAGINATION_LIMIT } from "./constant.api";

interface IFetchedCollectedData<T> {
  data: T[];
  count: number;
  errorCount?: number;
  filteredCount?: number;
}

type IFetchData = (api: URL, paginationCursor: number) => Promise<IFetchedCollectedData<T>>;

export class ApiUtils {
  static async continuedFetching<T>(fetchData: IFetchData, apiURL: URL) {
    const allData: T[] = [];

    let paginationCursor = START_PAGINATION_CURSOR;
    let continueFetching = true;
    let paginationErrorCount = 0;

    while (continueFetching) {
      try {
        const { data, count, errorCount = 0, filteredCount = 0 } = await fetchData(apiURL, paginationCursor);

        allData.push(...data);

        if (count + errorCount + filteredCount === PAGINATION_LIMIT) {
          paginationErrorCount += errorCount;
          paginationCursor++;
        } else {
          continueFetching = false;
        }
      } catch (e) {
        continueFetching = false;

        if (paginationCursor === START_PAGINATION_CURSOR) {
          throw e;
        }
      }
    }

    return { data: allData, errorCount: paginationErrorCount };
  }
}
