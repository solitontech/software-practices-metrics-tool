export const PAGINATION_SIZE_MUST_BE_NUMBER = "'paginationSize' must be a number";
export const PAGINATION_CURSOR_SIZE_MUST_BE_NUMBER =
  "'paginationCursor' must be a number | 'paginationSize' must be a number";
export const PAGINATION_CURSOR_MUST_BE_NUMBER = "'paginationCursor' must be a number";

export const PAGINATION_CURSOR_REQUIRED = "'paginationCursor' is required";
export const PAGINATION_SIZE_REQUIRED = "'paginationSize' is required";
export const PAGINATION_CURSOR_SIZE_REQUIRED = "'paginationCursor' is required | 'paginationSize' is required";

export const PAGINATION_SIZE_MUST_BE_GREATER_THAN_ZERO = "'paginationSize' must be greater than or equal to 1";
export const PAGINATION_CURSOR_SIZE_MUST_BE_GREATER_THAN_ZERO =
  "'paginationCursor' must be greater than or equal to 1 | 'paginationSize' must be greater than or equal to 1";
export const PAGINATION_CURSOR_MUST_BE_GREATER_THAN_ZERO = "'paginationCursor' must be greater than or equal to 1";

export const INVALID_START_DATE_FORMAT = "'startDate' must be in YYYY-MM-DD format";
export const INVALID_END_DATE_FORMAT =
  "'endDate' must be in YYYY-MM-DD format | 'startDate' date references 'ref:endDate' which must have a valid date format";
export const INVALID_START_END_DATE_FORMAT =
  "'endDate' must be in YYYY-MM-DD format | 'startDate' must be in YYYY-MM-DD format";

export const START_DATE_REQUIRED = "'startDate' is required";
export const END_DATE_REQUIRED =
  "'endDate' is required | 'startDate' date references 'ref:endDate' which must have a valid date format";
export const START_END_DATE_REQUIRED = "'endDate' is required | 'startDate' is required";

export const START_DATE_LESS_THAN_END_DATE = "'startDate' must be less than or equal to 'ref:endDate'";
