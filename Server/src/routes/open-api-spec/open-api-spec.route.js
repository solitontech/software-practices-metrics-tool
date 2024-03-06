import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { OpenAPISpecController } from '../../controllers/index.js';

const router = express.Router();

router.use('/', swaggerUi.serve, swaggerUi.setup(OpenAPISpecController.swaggerJson));

export default router;
