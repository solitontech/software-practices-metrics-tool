import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export class OpenAPISpecController {
  static #swaggerJson;

  static {
    const dirName = path.dirname(fileURLToPath(import.meta.url));
    const swaggerFilePath = path.join(dirName, '../../../docs/open-api-doc-swagger.yaml');
    const swaggerYaml = fs.readFileSync(swaggerFilePath, 'utf8');

    this.#swaggerJson = yaml.load(swaggerYaml);
  }

  static get swaggerJson() {
    return this.#swaggerJson;
  }
}
