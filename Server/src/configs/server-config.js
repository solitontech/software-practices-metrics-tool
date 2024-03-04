import path from 'path';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

import { NODE_ENVIRONMENT_MODE } from '../constants/index.js';
import { EnvValidation, ServerConfigValidation } from '../validations/index.js';

export class ServerConfiguration {
  static #clientFilters;
  static #versionControl;
  static #environmentVariables;

  static #dirName = path.dirname(fileURLToPath(import.meta.url));
  static #envFilePath = path.join(this.#dirName, './.env');
  static #serverConfigPath = path.join(this.#dirName, './server-config.json');

  static get #allConfigsLoaded() {
    return this.#clientFilters && this.#versionControl && this.#environmentVariables;
  }

  static #loadServerConfigs() {
    const configs = JSON.parse(readFileSync(this.#serverConfigPath, 'utf8'));

    this.#clientFilters = {
      squads: configs.squads,
    };

    this.#versionControl = {
      targetBranch: configs.targetBranch,
      organization: configs.organization,
      projectName: configs.projectName,
      repositoryId: configs.repositoryId,
      authToken: configs.authToken,
    };

    ServerConfigValidation.terminateOnValidationError(configs);
  }

  static #loadEnvironmentVariables() {
    dotenv.config({ path: this.#envFilePath });

    this.#environmentVariables = {
      port: process.env.SERVER_RUNNING_PORT,
      nodeEnvironment: process.env.NODE_ENVIRONMENT ?? NODE_ENVIRONMENT_MODE.DEVELOPMENT,
      versionControlSystem: process.env.VERSION_CONTROL_SYSTEM,
      clientDevelopmentUrlOrigin: process.env.CLIENT_DEVELOPMENT_URL_ORIGIN,
      swaggerEditorUrlOrigin: process.env.SWAGGER_EDITOR_URL_ORIGIN,
      productionDockerImageVersion: process.env.PRODUCTION_DOCKER_IMAGE_VERSION,
    };

    EnvValidation.terminateOnValidationError(this.#environmentVariables);
  }

  static get clientFilters() {
    this.load();

    return this.#clientFilters;
  }

  static get versionControl() {
    this.load();

    return this.#versionControl;
  }

  static get environmentVariables() {
    this.load();

    return this.#environmentVariables;
  }

  static load() {
    if (this.#allConfigsLoaded) {
      return;
    }

    this.#loadEnvironmentVariables();
    this.#loadServerConfigs();

    Object.freeze(this);
  }
}
