import express from 'express';
import { ClientFiltersController } from '../../controllers/index.js';
import { catchAsync } from '../../utils/catch-async.js';

const router = express.Router();

router.get('/', catchAsync(ClientFiltersController.getClientFilters));

export default router;
