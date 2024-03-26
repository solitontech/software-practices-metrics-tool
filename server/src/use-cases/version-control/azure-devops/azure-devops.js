import { AzureDevopsApi } from '##/use-cases/version-control/azure-devops/apis/azure-devops.api.js';
import { CodeReview } from './code-review/code-review.js';
import { TrunkBasedDevelopment } from './trunk-based-development/trunk-based-development.js';

import { getGmtISOString, getNextDayGmtISOString } from './helpers/helpers.js';

export class AzureDevops {
  static async getBranchMetrics() {
    const allBranches = await AzureDevopsApi.fetchAllBranches();

    const branchMetrics = TrunkBasedDevelopment.getBranchMetrics(allBranches);

    return { data: branchMetrics };
  }

  static async getActiveBranchMetrics(paginationCursor, paginationSize) {
    const activePullRequests = await AzureDevopsApi.fetchActivePullRequests(paginationCursor, paginationSize);

    const activeBranchMetrics = TrunkBasedDevelopment.getActiveBranchMetrics(activePullRequests);

    return { data: activeBranchMetrics };
  }

  static async getTrunkBranchCommits(startDate, endDate, paginationCursor, paginationSize) {
    const commits = await AzureDevopsApi.fetchCommitsList(
      startDate,
      getNextDayGmtISOString(endDate),
      paginationCursor,
      paginationSize
    );

    const commitMetrics = TrunkBasedDevelopment.getTrunkBranchCommits(commits);

    return { data: commitMetrics };
  }

  static async getPullRequestMetrics(startDate, endDate, paginationCursor, paginationSize) {
    const pullRequests = await AzureDevopsApi.fetchPullRequestsList(
      getGmtISOString(startDate),
      getNextDayGmtISOString(endDate),
      paginationCursor,
      paginationSize
    );

    const pullRequestMetrics = TrunkBasedDevelopment.getPullRequestMetrics(pullRequests);

    return { data: pullRequestMetrics };
  }

  static async getCodeReviewMetrics(startDate, endDate, paginationCursor, paginationSize) {
    const { pullRequests, errorCount, filteredCount } = await AzureDevopsApi.fetchPullRequests(
      getGmtISOString(startDate),
      getNextDayGmtISOString(endDate),
      paginationCursor,
      paginationSize
    );

    const codeReviewMetrics = CodeReview.getCodeReviewMetrics(pullRequests);

    return {
      data: { ...codeReviewMetrics, errorCount, filteredCount },
    };
  }
}
