import { DateValidation, PaginationValidation } from '##/validations/index.js';
import { STATUS_CODE } from '##/constants/index.js';
import { VersionControl } from '##/use-cases/version-control/version-control.js';

export class TrunkBasedDevelopmentController {
  static async getBranches(req, res) {
    const { data } = await VersionControl.getBranchMetrics();

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

    const { data } = await VersionControl.getActiveBranchMetrics(paginationCursor, paginationSize);

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

    const { data } = await VersionControl.getPullRequestMetrics(startDate, endDate, paginationCursor, paginationSize);

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

    const { data } = await VersionControl.getTrunkBranchCommits(startDate, endDate, paginationCursor, paginationSize);

    return res.status(STATUS_CODE.OK).json(data);
  }
}
