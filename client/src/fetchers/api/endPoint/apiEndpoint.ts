import { DateTime } from "luxon";

import { PAGINATION_LIMIT, START_PAGINATION_CURSOR } from "src/fetchers/fetchers";

export class ApiEndPoint {
  static get #baseDomain() {
    const localServerUrl = import.meta.env.VITE_DEVELOPMENT_SERVER_URL;

    return import.meta.env.MODE === "development" ? localServerUrl : window.location.origin;
  }

  static get #baseURL() {
    return `${this.#baseDomain}/api/v1/metrics`;
  }

  static get #trunkBasedDevelopmentURL() {
    return `${this.#baseURL}/trunk-based-development`;
  }

  static #getISOFormateDate(date: Date) {
    const dateFormat = "yyyy-MM-dd";

    return DateTime.fromJSDate(date).toFormat(dateFormat);
  }

  static clientFilters() {
    const url = new URL(`${this.#baseURL}/client-filters`);

    return url;
  }

  static codeReviewMetrics(startDate: Date, endDate: Date) {
    const url = new URL(`${this.#baseURL}/code-review`);

    url.searchParams.append("startDate", this.#getISOFormateDate(startDate));
    url.searchParams.append("endDate", this.#getISOFormateDate(endDate));
    url.searchParams.append("paginationCursor", String(START_PAGINATION_CURSOR));
    url.searchParams.append("paginationSize", String(PAGINATION_LIMIT));

    return url;
  }

  static trunkBasedActiveBranches() {
    const url = new URL(`${this.#trunkBasedDevelopmentURL}/activeBranches`);

    url.searchParams.append("paginationCursor", String(START_PAGINATION_CURSOR));
    url.searchParams.append("paginationSize", String(PAGINATION_LIMIT));

    return url;
  }

  static trunkBranchCommits(startDate: Date, endDate: Date) {
    const url = new URL(`${this.#trunkBasedDevelopmentURL}/commits`);

    url.searchParams.append("startDate", this.#getISOFormateDate(startDate));
    url.searchParams.append("endDate", this.#getISOFormateDate(endDate));
    url.searchParams.append("paginationCursor", String(START_PAGINATION_CURSOR));
    url.searchParams.append("paginationSize", String(PAGINATION_LIMIT));

    return url;
  }

  static trunkBasedTotalBranches() {
    const url = new URL(`${this.#trunkBasedDevelopmentURL}/branches`);

    return url;
  }

  static pullRequestsMergedToTrunkBranch(startDate: Date, endDate: Date) {
    const url = new URL(`${this.#trunkBasedDevelopmentURL}/pullRequests`);

    url.searchParams.append("startDate", this.#getISOFormateDate(startDate));
    url.searchParams.append("endDate", this.#getISOFormateDate(endDate));
    url.searchParams.append("paginationCursor", String(START_PAGINATION_CURSOR));
    url.searchParams.append("paginationSize", String(PAGINATION_LIMIT));

    return url;
  }
}
