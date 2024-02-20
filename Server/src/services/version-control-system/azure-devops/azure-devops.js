import { AzureDevopsApi } from './apis/azure-devops.js';
import { CodeReview } from './code-review/code-review.js';
import { TrunkBasedDevelopment } from './trunk-based-development/trunk-based-development.js';

import { getNextDateWithGMT, getGMTDate } from './utils/utils.js';

export class AzureDevops {
  static async getBranchMetrics() {
    const allBranches = await AzureDevopsApi.fetchAllBranches();

    const branchData = TrunkBasedDevelopment.getBranchMetrics(allBranches);

    return { data: branchData };
  }

  static async getActiveBranchMetrics(paginationCursor, paginationSize) {
    const activePullRequests = await AzureDevopsApi.fetchActivePullRequests(paginationCursor, paginationSize);

    const activeBranches = TrunkBasedDevelopment.getActiveBranchMetrics(activePullRequests);

    return { data: activeBranches };
  }

  static async getPullRequestMetrics(startDate, endDate, paginationCursor, paginationSize) {
    const pullRequestsForARange = await AzureDevopsApi.fetchPullRequestsList(
      getGMTDate(startDate),
      getNextDateWithGMT(endDate),
      paginationCursor,
      paginationSize
    );

    const pullRequestsPercentage = TrunkBasedDevelopment.getPullRequestMetrics(pullRequestsForARange);

    return { data: pullRequestsPercentage };
  }

  static async getCodeReviewMetrics(startDate, endDate, paginationCursor, paginationSize) {
    const pullRequests = await AzureDevopsApi.fetchPullRequests(
      getGMTDate(startDate),
      getNextDateWithGMT(endDate),
      paginationCursor,
      paginationSize
    );

    const codeReviewMetrics = CodeReview.getCodeReviewMetrics(pullRequests.pullRequests);

    return {
      data: { ...codeReviewMetrics, errorCount: pullRequests.errorCount, filteredCount: pullRequests.filteredCount },
    };
  }

  static async getCodeFreezePeriodMetrics(startDate, endDate, paginationCursor, paginationSize) {
    const commits = await AzureDevopsApi.fetchCommitsList(
      startDate,
      getNextDateWithGMT(endDate),
      paginationCursor,
      paginationSize
    );

    const codeFreezeMetrics = TrunkBasedDevelopment.getCodeFreezeMetrics(commits);

    return { data: codeFreezeMetrics };
  }
}
