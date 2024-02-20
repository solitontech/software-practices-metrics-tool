import { ACTIVE_VERSION_CONTROL_SERVICE } from './service-map.js';

export class VersionControlSystem {
  static service = ACTIVE_VERSION_CONTROL_SERVICE;

  static async getCodeReviewMetrics(startDate, endDate, paginationCursor, paginationSize) {
    return VersionControlSystem.service.getCodeReviewMetrics(startDate, endDate, paginationCursor, paginationSize);
  }
  static async getTrunkBasedMetricsForBranches() {
    return VersionControlSystem.service.getBranchMetrics();
  }

  static async getTrunkBasedMetricsForActiveBranches(paginationCursor, paginationSize) {
    return VersionControlSystem.service.getActiveBranchMetrics(paginationCursor, paginationSize);
  }

  static async getTrunkBasedMetricsForPullRequests(startDate, endDate, paginationCursor, paginationSize) {
    return VersionControlSystem.service.getPullRequestMetrics(startDate, endDate, paginationCursor, paginationSize);
  }

  static async getTrunkBasedMetricsForCodeFreeze(startDate, endDate, paginationCursor, paginationSize) {
    return VersionControlSystem.service.getCodeFreezePeriodMetrics(
      startDate,
      endDate,
      paginationCursor,
      paginationSize
    );
  }
}
