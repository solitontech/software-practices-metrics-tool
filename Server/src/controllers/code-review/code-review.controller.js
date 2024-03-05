import { DateValidation, PaginationValidation } from '../../validations/index.js';
import { VersionControlSystem } from '../../services/version-control-system/version-control-system.js';
import { STATUS_CODE } from '../../constants/index.js';

export class CodeReviewController {
  static async getCodeReview(req, res) {
    const { startDate, endDate, paginationCursor, paginationSize } = req.query;

    const dateError = DateValidation.getValidationError(startDate, endDate);
    const paginationError = PaginationValidation.getValidationError(paginationCursor, paginationSize);

    if (dateError || paginationError) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        error: dateError ?? paginationError,
      });
    }

    const { data } = await VersionControlSystem.getCodeReviewMetrics(
      startDate,
      endDate,
      paginationCursor,
      paginationSize
    );

    return res.status(STATUS_CODE.OK).json(data);
  }
}
