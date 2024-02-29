import fs from 'fs';
import path from 'path';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const router = express.Router();

const filePath = path.join(__dirname, '..', '..', '..', 'docs', 'open-api-doc-swagger.yaml');
const yamlData = fs.readFileSync(filePath, 'utf8');

const jsonData = yaml.load(yamlData);

router.use('/', swaggerUi.serve, swaggerUi.setup(jsonData));

export default router;
