import { IFetchAllData } from "./types";
import { START_PAGINATION_CURSOR, PAGINATION_LIMIT } from "../constants/constants.api";

export class ApiHelpers {
  static async continuedFetching<T>(fetchData: IFetchAllData<T>, apiURL: URL) {
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
      } catch (error) {
        continueFetching = false;

        if (paginationCursor === START_PAGINATION_CURSOR) {
          throw error;
        }
      }
    }

    return { data: allData, errorCount: paginationErrorCount };
  }
}
