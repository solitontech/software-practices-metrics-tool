import joi from 'joi';

import { logError } from '../utils/logger.js';
import { NODE_ENVIRONMENT_MODE } from '../constants/index.js';

export class EnvValidation {
  static #errorMessage = 'Environment variables validation error: ';

  static #validationSchema = joi
    .object({
      port: joi.number().required(),
      nodeEnvironment: joi.string().valid(...Object.values(NODE_ENVIRONMENT_MODE)),
      versionControlSystem: joi.string().required(),
      clientDevelopmentUrlOrigin: joi.string().required(),
      swaggerEditorUrlOrigin: joi.string().required(),
      productionDockerImageVersion: joi.string().required(),
    })
    .options({ abortEarly: false });

  static #validate(environmentVariables) {
    const { error } = this.#validationSchema.validate(environmentVariables);

    return { error };
  }

  static #logErrorAndTerminate(error) {
    if (!error) {
      return;
    }

    error.details.forEach(({ message }) => {
      logError(this.#errorMessage + message);
    });

    process.exit(1);
  }

  static terminateOnValidationError(environmentVariables) {
    const { error } = this.#validate(environmentVariables);

    this.#logErrorAndTerminate(error);
  }
}
