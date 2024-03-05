import { ACTIVE_VERSION_CONTROL_SERVICE } from './service-map.js';

export class VersionControlSystem {
  static #service = ACTIVE_VERSION_CONTROL_SERVICE;

  static async getCodeReviewMetrics(startDate, endDate, paginationCursor, paginationSize) {
    return this.#service.getCodeReviewMetrics(startDate, endDate, paginationCursor, paginationSize);
  }
  static async getBranchMetrics() {
    return this.#service.getBranchMetrics();
  }

  static async getActiveBranchMetrics(paginationCursor, paginationSize) {
    return this.#service.getActiveBranchMetrics(paginationCursor, paginationSize);
  }

  static async getPullRequestMetrics(startDate, endDate, paginationCursor, paginationSize) {
    return this.#service.getPullRequestMetrics(startDate, endDate, paginationCursor, paginationSize);
  }

  static async getTrunkBranchCommits(startDate, endDate, paginationCursor, paginationSize) {
    return this.#service.getTrunkBranchCommits(startDate, endDate, paginationCursor, paginationSize);
  }
}
