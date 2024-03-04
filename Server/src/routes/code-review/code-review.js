import express from 'express';

import { VersionControlSystem } from '../../services/version-control-system/version-control-system.js';
import { Validator } from '../validations/validators.js';
import { catchAsync } from '../../utils/catch-async.js';
import { STATUS_CODE } from '../../constants/index.js';

const router = express.Router();

const { validateDate, validatePaginationData } = Validator;
const { getCodeReviewMetrics } = VersionControlSystem;

router.get(
  '/',
  catchAsync(async (req, res) => {
    const { startDate, endDate, paginationCursor, paginationSize } = req.query;

    const { error: dateError } = validateDate(startDate, endDate);
    const { error: paginationError } = validatePaginationData(paginationCursor, paginationSize);

    if (dateError || paginationError) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        error: dateError ?? paginationError,
      });
    }

    const { data } = await getCodeReviewMetrics(startDate, endDate, paginationCursor, paginationSize);

    return res.status(STATUS_CODE.OK).json(data);
  })
);

export default router;
