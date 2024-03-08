export class API {
  static get #baseURL() {
    const localServerUrl = "http://localhost:3000";

    return import.meta.env.MODE === "development" ? localServerUrl : window.location.origin;
  }

  static clientFilters() {
    const url = new URL(`${this.#baseURL}/api/v1/metrics/client-filters`);

    return url.href;
  }
}
