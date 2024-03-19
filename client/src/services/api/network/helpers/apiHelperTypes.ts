interface IFetchAllDataResponse<T> {
  data: T[];
  count: number;
  errorCount?: number;
  filteredCount?: number;
}

export type IFetchAllData<T> = (api: URL, paginationCursor: number) => Promise<IFetchAllDataResponse<T>>;
