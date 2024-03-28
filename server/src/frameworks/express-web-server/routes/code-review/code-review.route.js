import express from 'express';

import { CodeReviewController } from '##/controllers/controllers.js';
import { catchAsync } from '##/utils/utils.js';

const router = express.Router();

router.get('/', catchAsync(CodeReviewController.getCodeReview));

export default router;
