import joi from 'joi';
import path from 'path';
import dotenv from 'dotenv';
import lodash from 'lodash';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

import { logError } from '../utils/logger.js';
import { NODE_ENVIRONMENT_MODE } from '../constants/constants.js';

export class ServerConfiguration {
  static #clientFilters;
  static #versionControl;
  static #environmentVariables;

  static #dirName = path.dirname(fileURLToPath(import.meta.url));
  static #envFilePath = path.join(this.#dirName, './.env');

  static get clientFilters() {
    this.#loadConfigs();

    return lodash.cloneDeep(this.#clientFilters);
  }

  static get versionControl() {
    this.#loadConfigs();

    return lodash.cloneDeep(this.#versionControl);
  }

  static get environmentVariables() {
    this.#loadEnvironmentVariables();

    return lodash.cloneDeep(this.#environmentVariables);
  }

  static #logValidationError(error, header) {
    if (error) {
      error.details.forEach(({ message }) => {
        logError(header + message);
      });

      // invalid values don't boot server
      process.exit(1);
    }
  }

  static #validateConfigs(data) {
    const schema = joi
      .object({
        targetBranch: joi.string().required(),
        organization: joi.string().required(),
        projectName: joi.string().required(),
        repositoryId: joi.string().required(),
        authToken: joi.string().required(),
        squads: joi
          .array()
          .items(
            joi.object({
              squadName: joi.string().required(),
              developers: joi.object().pattern(joi.string().guid(), joi.string()).min(1).required(),
              reviewers: joi.object().pattern(joi.string().guid(), joi.string()).min(1),
            })
          )
          .required(),
      })
      .options({ abortEarly: false });

    const { error } = schema.validate(data);

    this.#logValidationError(error, 'Filters json validation error: ');
  }

  static #loadConfigs() {
    const isLoaded = this.#clientFilters && this.#versionControl;

    if (isLoaded) {
      return;
    }

    const filePath = path.join(this.#dirName, './server-config.json');

    try {
      const configs = JSON.parse(readFileSync(filePath, 'utf8'));

      this.#validateConfigs(configs);

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
    } catch (err) {
      logError('Error reading configuration file ', err);

      // invalid file don't boot server
      process.exit(1);
    }
  }

  static #validateEnvironmentVariables() {
    const schema = joi
      .object({
        port: joi.number().required(),
        nodeEnvironment: joi.string().valid(...Object.values(NODE_ENVIRONMENT_MODE)),
        versionControlSystem: joi.string().required(),
        clientDevelopmentUrlOrigin: joi.string().required(),
        swaggerEditorUrlOrigin: joi.string().required(),
        productionDockerImageVersion: joi.string().required(),
      })
      .options({ abortEarly: false });

    const { error } = schema.validate(this.#environmentVariables);

    return { error };
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

    const { error } = this.#validateEnvironmentVariables();

    this.#logValidationError(error, 'Environment variable validation error: ');
  }

  static load() {
    this.#loadEnvironmentVariables();
    this.#loadConfigs();
  }
}
