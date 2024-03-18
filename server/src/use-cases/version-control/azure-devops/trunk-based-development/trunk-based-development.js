import { AzureDevopsURL } from '../helpers/index.js';
import {
  BRANCH_SUFFIX,
  EMPTY_STRING,
  MAX_PERCENTAGE,
  PERCENTAGE,
  REQUIRED_BRANCH_PARTS,
  SEPARATOR,
  USERS,
} from './trunk-based-development.constants.js';

export class TrunkBasedDevelopment {
  static #isBranchFollowingNamingStandard(branchName) {
    const parts = branchName.split(SEPARATOR);
    const [firstPart] = parts;

    const isBranchNameStartsWithUsers = firstPart === USERS;
    const hasRequiredParts = parts.length === REQUIRED_BRANCH_PARTS;

    return isBranchNameStartsWithUsers && hasRequiredParts;
  }

  static getBranchMetrics({ value: allBranches, count: totalNumberOfBranches }) {
    const { branchesFollowingNamingStandard, branchesNotFollowingNamingStandard } = allBranches.reduce(
      (acc, { name, objectId: id }) => {
        const branchName = name.replace(BRANCH_SUFFIX, EMPTY_STRING);
        const branchURL = AzureDevopsURL.getBranchURL(branchName);

        const targetArray = this.#isBranchFollowingNamingStandard(branchName)
          ? acc.branchesFollowingNamingStandard
          : acc.branchesNotFollowingNamingStandard;

        targetArray.push({ id: id, name: branchName, url: branchURL });

        return acc;
      },
      { branchesFollowingNamingStandard: [], branchesNotFollowingNamingStandard: [] }
    );

    const percentageOfBranchesFollowingStandard =
      ((branchesFollowingNamingStandard.length / totalNumberOfBranches) * MAX_PERCENTAGE).toFixed(2) + PERCENTAGE;

    return {
      branchesURL: AzureDevopsURL.getBranchesURL(),
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

  static getActiveBranchMetrics({ count, value }) {
    const branches = value.map(({ pullRequestId, title, sourceRefName, creationDate, createdBy }) => {
      const name = sourceRefName.replace(BRANCH_SUFFIX, EMPTY_STRING);
      const branchURL = AzureDevopsURL.getBranchURL(name);
      const titleWithId = pullRequestId + ' - ' + title;
      const pullRequestURL = AzureDevopsURL.getPullRequestURL(pullRequestId);

      return {
        name,
        title: titleWithId,
        createdBy: createdBy.displayName,
        creationDate,
        pullRequestURL,
        branchURL,
      };
    });

    return {
      count,
      branches,
    };
  }

  static getPullRequestMetrics({ count, value }) {
    const pullRequests = value.map(
      ({ pullRequestId, title, sourceRefName, creationDate, status, closedDate = null }) => {
        const name = sourceRefName.replace(BRANCH_SUFFIX, EMPTY_STRING);
        const branchURL = AzureDevopsURL.getBranchURL(name);
        const titleWithId = pullRequestId + ' - ' + title;
        const pullRequestURL = AzureDevopsURL.getPullRequestURL(pullRequestId);

        return {
          name,
          title: titleWithId,
          status,
          creationDate,
          closedDate,
          pullRequestURL,
          branchURL,
        };
      }
    );

    return {
      count,
      pullRequests,
    };
  }

  static getTrunkBranchCommits({ count, value }) {
    const commits = value.map(({ commitId, comment, author }) => {
      return {
        id: commitId,
        comment,
        author,
      };
    });

    return {
      count,
      commits,
    };
  }
}
