import express from 'express';

import clientFiltersRouter from './client-filters/client-filters.route.js';
import codeReviewRouter from './code-review/code-review.route.js';
import trunkBasedDevelopmentRouter from './trunk-based-development/trunk-based-development.route.js';
import openApiSpecRouter from './open-api-spec/open-api-spec.route.js';

const appRouter = express.Router();

appRouter.use('/api/v1/metrics/client-filters', clientFiltersRouter);

appRouter.use('/api/v1/metrics/code-review', codeReviewRouter);

appRouter.use('/api/v1/metrics/trunk-based-development', trunkBasedDevelopmentRouter);

appRouter.use('/open-api-spec-doc', openApiSpecRouter);

export const router = appRouter;
