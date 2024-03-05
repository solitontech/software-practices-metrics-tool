import { getAzureDevOpsPullRequestURL, getAzureDevopsBranchesURL, getAzureDevOpsBranchURL } from '../utils/get-url.js';
import {
  BRANCH_SUFFIX,
  EMPTY_STRING,
  MAX_PERCENTAGE,
  PERCENTAGE,
  REQUIRED_BRANCH_PARTS,
  SEPARATOR,
  USERS,
} from './constants.js';

export class TrunkBasedDevelopment {
  static getBranchMetrics({ value: allBranches, count: totalNumberOfBranches }) {
    const { branchesFollowingNamingStandard, branchesNotFollowingNamingStandard } = allBranches.reduce(
      (acc, { name: branchName, objectId: id }) => {
        const formattedBranchName = branchName.replace(BRANCH_SUFFIX, EMPTY_STRING);

        const isBranchFollowingNamingStandard = () => {
          const hasRequiredParts = formattedBranchName.split(SEPARATOR).length === REQUIRED_BRANCH_PARTS;
          const isStartsWithUsers = formattedBranchName.split(SEPARATOR)[0] === USERS;

          return hasRequiredParts && isStartsWithUsers;
        };

        const branchURL = getAzureDevOpsBranchURL(formattedBranchName);

        const targetArray = isBranchFollowingNamingStandard()
          ? acc.branchesFollowingNamingStandard
          : acc.branchesNotFollowingNamingStandard;

        targetArray.push({ id: id, name: formattedBranchName, url: branchURL });

        return acc;
      },
      { branchesFollowingNamingStandard: [], branchesNotFollowingNamingStandard: [] }
    );

    const percentageOfBranchesFollowingStandard =
      ((branchesFollowingNamingStandard.length / totalNumberOfBranches) * MAX_PERCENTAGE).toFixed(2) + PERCENTAGE;

    return {
      branchesURL: getAzureDevopsBranchesURL(),
      totalNumberOfBranches,
      percentageOfBranchesFollowingStandard,
      branchesFollowingNamingStandard: {
        count: branchesFollowingNamingStandard.length,
        branches: branchesFollowingNamingStandard,
      },
      branchesNotFollowingNamingStandard: {
        count: branchesNotFollowingNamingStandard.length,
        branches: branchesNotFollowingNamingStandard,
      },
    };
  }

  static getActiveBranchMetrics(pullRequests) {
    return {
      count: pullRequests.count,
      branches: pullRequests.value.map(({ pullRequestId, title, sourceRefName, creationDate, createdBy }) => ({
        name: sourceRefName.replace(BRANCH_SUFFIX, EMPTY_STRING),
        title: pullRequestId + ' - ' + title,
        createdBy: createdBy.displayName,
        creationDate,
        pullRequestURL: getAzureDevOpsPullRequestURL(pullRequestId),
        branchURL: getAzureDevOpsBranchURL(sourceRefName.replace(BRANCH_SUFFIX, EMPTY_STRING)),
      })),
    };
  }

  static getPullRequestMetrics(pullRequests) {
    const totalPrs = pullRequests.value;

    return {
      count: pullRequests.count,
      pullRequests: totalPrs.map(({ pullRequestId, title, sourceRefName, creationDate, status, closedDate }) => ({
        name: sourceRefName.replace(BRANCH_SUFFIX, EMPTY_STRING),
        title: pullRequestId + ' - ' + title,
        status,
        creationDate,
        closedDate: closedDate ?? null,
        pullRequestURL: getAzureDevOpsPullRequestURL(pullRequestId),
        branchURL: getAzureDevOpsBranchURL(sourceRefName.replace(BRANCH_SUFFIX, EMPTY_STRING)),
      })),
    };
  }

  static getCodeFreezeMetrics(commits) {
    const commitsList = commits.value;

    return {
      count: commits.count,
      commits: commitsList.map(({ commitId, comment, author }) => ({
        id: commitId,
        comment: comment,
        author: author,
      })),
    };
  }
}
