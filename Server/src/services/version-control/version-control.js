import { AzureDevops } from './azure-devops/azure-devops.js';

import { logError } from '../../utils/index.js';
import { ServerConfiguration } from '../../configs/server.config.js';

const { versionControlSystem } = ServerConfiguration.environmentVariables;

export class VersionControl {
  static #currentVersionControl;

  static #versionControlMap = {
    AZURE_DEVOPS: AzureDevops,
  };

  static {
    this.#currentVersionControl = this.#versionControlMap[versionControlSystem];

    if (!this.#currentVersionControl) {
      logError(`Version control system not found. Valid values are ${Object.keys(this.#currentVersionControl)}`);

      process.exit(1);
    }
  }

  static async getCodeReviewMetrics(startDate, endDate, paginationCursor, paginationSize) {
    return this.#currentVersionControl.getCodeReviewMetrics(startDate, endDate, paginationCursor, paginationSize);
  }
  static async getBranchMetrics() {
    return this.#currentVersionControl.getBranchMetrics();
  }

  static async getActiveBranchMetrics(paginationCursor, paginationSize) {
    return this.#currentVersionControl.getActiveBranchMetrics(paginationCursor, paginationSize);
  }

  static async getPullRequestMetrics(startDate, endDate, paginationCursor, paginationSize) {
    return this.#currentVersionControl.getPullRequestMetrics(startDate, endDate, paginationCursor, paginationSize);
  }

  static async getTrunkBranchCommits(startDate, endDate, paginationCursor, paginationSize) {
    return this.#currentVersionControl.getTrunkBranchCommits(startDate, endDate, paginationCursor, paginationSize);
  }
}
