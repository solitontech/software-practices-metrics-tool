import { DateValidation, PaginationValidation } from '../../validations/index.js';
import { VersionControlSystem } from '../../services/version-control-system/version-control-system.js';
import { STATUS_CODE } from '../../constants/index.js';

export class TrunkBasedDevelopmentController {
  static async getBranches(req, res) {
    const { data } = await VersionControlSystem.getBranchMetrics();

    return res.status(STATUS_CODE.OK).json(data);
  }

  static async getActiveBranches(req, res) {
    const { paginationCursor, paginationSize } = req.query;

    const paginationError = PaginationValidation.getValidationError(paginationCursor, paginationSize);

    if (paginationError) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        error: paginationError,
      });
    }

    const { data } = await VersionControlSystem.getActiveBranchMetrics(paginationCursor, paginationSize);

    return res.status(STATUS_CODE.OK).json(data);
  }

  static async getPullRequests(req, res) {
    const { startDate, endDate, paginationCursor, paginationSize } = req.query;

    const dateError = DateValidation.getValidationError(startDate, endDate);
    const paginationError = PaginationValidation.getValidationError(paginationCursor, paginationSize);

    if (dateError || paginationError) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        error: dateError ?? paginationError,
      });
    }

    const { data } = await VersionControlSystem.getPullRequestMetrics(
      startDate,
      endDate,
      paginationCursor,
      paginationSize
    );

    return res.status(STATUS_CODE.OK).json(data);
  }

  static async getTrunkBranchCommits(req, res) {
    const { startDate, endDate, paginationCursor, paginationSize } = req.query;

    const dateError = DateValidation.getValidationError(startDate, endDate);
    const paginationError = PaginationValidation.getValidationError(paginationCursor, paginationSize);

    if (dateError || paginationError) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        error: dateError ?? paginationError,
      });
    }

    const { data } = await VersionControlSystem.getTrunkBranchCommits(
      startDate,
      endDate,
      paginationCursor,
      paginationSize
    );

    return res.status(STATUS_CODE.OK).json(data);
  }
}
