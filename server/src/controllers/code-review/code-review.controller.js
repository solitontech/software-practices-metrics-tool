import { DateValidation, PaginationValidation } from '##/validations/validations.js';
import { VersionControl } from '##/use-cases/version-control/version-control.js';
import { STATUS_CODE } from '##/constants/constants.js';

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

    const { data } = await VersionControl.getCodeReviewMetrics(startDate, endDate, paginationCursor, paginationSize);

    return res.status(STATUS_CODE.OK).json(data);
  }
}
