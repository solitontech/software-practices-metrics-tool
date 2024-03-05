import path from 'path';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

import { EnvValidation, ServerConfigValidation } from '../validations/index.js';
import { NODE_ENVIRONMENT_MODE } from '../constants/index.js';

export class ServerConfiguration {
  static #clientFilters;
  static #versionControl;
  static #environmentVariables;

  static #dirName = path.dirname(fileURLToPath(import.meta.url));
  static #envFilePath = path.join(this.#dirName, './.env');
  static #serverConfigPath = path.join(this.#dirName, './server-config.json');

  static {
    this.#loadServerConfigs();
    this.#loadEnvironmentVariables();
  }

  static #loadServerConfigs() {
    const configs = JSON.parse(readFileSync(this.#serverConfigPath, 'utf8'));

    this.#clientFilters = Object.freeze({
      squads: configs.squads,
    });

    this.#versionControl = Object.freeze({
      targetBranch: configs.targetBranch,
      organization: configs.organization,
      projectName: configs.projectName,
      repositoryId: configs.repositoryId,
      authToken: configs.authToken,
    });

    ServerConfigValidation.terminateOnValidationError(configs);
  }

  static #loadEnvironmentVariables() {
    dotenv.config({ path: this.#envFilePath });

    this.#environmentVariables = Object.freeze({
      port: process.env.SERVER_RUNNING_PORT,
      nodeEnvironment: process.env.NODE_ENVIRONMENT ?? NODE_ENVIRONMENT_MODE.DEVELOPMENT,
      versionControlSystem: process.env.VERSION_CONTROL_SYSTEM,
      clientDevelopmentUrlOrigin: process.env.CLIENT_DEVELOPMENT_URL_ORIGIN,
      swaggerEditorUrlOrigin: process.env.SWAGGER_EDITOR_URL_ORIGIN,
      productionDockerImageVersion: process.env.PRODUCTION_DOCKER_IMAGE_VERSION,
    });

    EnvValidation.terminateOnValidationError(this.#environmentVariables);
  }

  static get clientFilters() {
    return this.#clientFilters;
  }

  static get clientFiltersSquads() {
    return this.#clientFilters.squads;
  }

  static get versionControl() {
    return this.#versionControl;
  }

  static get environmentVariables() {
    return this.#environmentVariables;
  }
}
