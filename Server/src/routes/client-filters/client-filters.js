import express from 'express';

import { catchAsync } from '../../utils/catch-async.js';
import { STATUS_CODE } from '../../constants/index.js';
import { ClientFilters } from '../../services/client-filters/client-filters.js';

const router = express.Router();

router.get(
  '/',
  catchAsync(async (req, res) => {
    const clientFilters = ClientFilters.getClientFilters();

    return res.status(STATUS_CODE.OK).json(clientFilters);
  })
);

export default router;
