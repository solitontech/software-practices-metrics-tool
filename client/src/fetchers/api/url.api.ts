import { DateTime } from "luxon";

import { PAGINATION_LIMIT, START_PAGINATION_CURSOR } from "./constant.api";

export class ApiEndPoint {
  static get #baseURL() {
    const localServerUrl = "http://localhost:3000";

    return import.meta.env.MODE === "development" ? localServerUrl : window.location.origin;
  }

  static #getISOFormateDate(date: Date) {
    const dateFormat = "yyyy-MM-dd";

    return DateTime.fromJSDate(date).toFormat(dateFormat);
  }

  static clientFilters() {
    const url = new URL(`${this.#baseURL}/api/v1/metrics/client-filters`);

    return url.href;
  }

  static codeReviewMetrics(startDate: Date, endDate: Date) {
    const url = new URL(`${this.#baseURL}/api/v1/metrics/code-review`);

    url.searchParams.append("startDate", this.#getISOFormateDate(startDate));
    url.searchParams.append("endDate", this.#getISOFormateDate(endDate));
    url.searchParams.append("paginationCursor", String(START_PAGINATION_CURSOR));
    url.searchParams.append("paginationSize", String(PAGINATION_LIMIT));

    return url;
  }

  static trunkBasedActiveBranches() {
    const url = new URL(`${this.#baseURL}/api/v1/metrics/trunk-based-development/activeBranches`);

    url.searchParams.append("paginationCursor", String(START_PAGINATION_CURSOR));
    url.searchParams.append("paginationSize", String(PAGINATION_LIMIT));

    return url;
  }
}
