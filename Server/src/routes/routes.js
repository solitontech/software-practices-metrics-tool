import express from 'express';

import codeReviewRouter from './code-review/code-review.js';
import trunkBasedDevelopmentRouter from './trunk-based-development/trunk-based-development.js';
import clientFiltersRouter from './client-filters/client-filters.js';
import swaggerRouter from './swagger-open-api/swagger-open-api.js';

const appRouter = express.Router();

appRouter.use('/api/v1/metrics/trunk-based-development', trunkBasedDevelopmentRouter);

appRouter.use('/api/v1/metrics/code-review', codeReviewRouter);

appRouter.use('/api/v1/metrics/client-filters', clientFiltersRouter);

appRouter.use('/open-api-spec-doc', swaggerRouter);

export const router = appRouter;
