import express from 'express';

import codeReviewRouter from './code-review/code-review.js';
import trunkBasedDevelopmentRouter from './trunk-based-development/trunk-based-development.js';
import clientFiltersRouter from './client-filters/client-filters.js';

const appRouter = express.Router();

appRouter.use('/api/v1/metrics/trunk-based-development', trunkBasedDevelopmentRouter);

appRouter.use('/api/v1/metrics/code-review', codeReviewRouter);

appRouter.use('/api/v1/metrics/client-filters', clientFiltersRouter);

export const router = appRouter;
