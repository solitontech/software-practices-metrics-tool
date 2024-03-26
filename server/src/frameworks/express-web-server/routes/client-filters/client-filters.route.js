import express from 'express';

import { ClientFiltersController } from '##/controllers/controllers.js';
import { catchAsync } from '##/utils/utils.js';

const router = express.Router();

router.get('/', catchAsync(ClientFiltersController.getClientFilters));

export default router;
