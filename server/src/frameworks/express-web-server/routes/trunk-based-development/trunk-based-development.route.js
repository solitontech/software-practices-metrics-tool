import express from 'express';

import { TrunkBasedDevelopmentController } from '##/controllers/index.js';
import { catchAsync } from '##/utils/index.js';

const router = express.Router();

router.get('/branches', catchAsync(TrunkBasedDevelopmentController.getBranches));

router.get('/activeBranches', catchAsync(TrunkBasedDevelopmentController.getActiveBranches));

router.get('/pullRequests', catchAsync(TrunkBasedDevelopmentController.getPullRequests));

router.get('/commits', catchAsync(TrunkBasedDevelopmentController.getTrunkBranchCommits));

export default router;
