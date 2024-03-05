import { AzureDevops } from './azure-devops/azure-devops.js';

import { logError } from '../../utils/index.js';
import { ServerConfiguration } from '../../configs/server.config.js';

const { versionControlSystem } = ServerConfiguration.environmentVariables;

export class VersionControl {
  static #versionControl;

  static #versionControlMap = {
    AZURE_DEVOPS: AzureDevops,
  };

  static {
    this.#versionControl = this.#versionControlMap[versionControlSystem];

    if (!this.#versionControl) {
      logError(`Version control system not found. Valid values are ${Object.keys(this.#versionControl)}`);

      process.exit(1);
    }
  }

  static async getCodeReviewMetrics(startDate, endDate, paginationCursor, paginationSize) {
    return this.#versionControl.getCodeReviewMetrics(startDate, endDate, paginationCursor, paginationSize);
  }
  static async getBranchMetrics() {
    return this.#versionControl.getBranchMetrics();
  }

  static async getActiveBranchMetrics(paginationCursor, paginationSize) {
    return this.#versionControl.getActiveBranchMetrics(paginationCursor, paginationSize);
  }

  static async getPullRequestMetrics(startDate, endDate, paginationCursor, paginationSize) {
    return this.#versionControl.getPullRequestMetrics(startDate, endDate, paginationCursor, paginationSize);
  }

  static async getTrunkBranchCommits(startDate, endDate, paginationCursor, paginationSize) {
    return this.#versionControl.getTrunkBranchCommits(startDate, endDate, paginationCursor, paginationSize);
  }
}
