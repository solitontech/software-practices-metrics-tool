import express from 'express';

import { CodeReviewController } from '##/controllers/index.js';
import { catchAsync } from '##/utils/index.js';

const router = express.Router();

router.get('/', catchAsync(CodeReviewController.getCodeReview));

export default router;
