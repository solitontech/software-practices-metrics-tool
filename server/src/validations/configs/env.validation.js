import joi from 'joi';

import { Validation } from '../common/validation.js';
import { NODE_ENVIRONMENT_MODE } from '../../constants/constants.js';

export class EnvValidation {
  static #validation;

  static {
    const errorMessage = 'Environment variables validation error ';

    const validationSchema = joi
      .object({
        port: joi.number().required(),
        nodeEnvironment: joi.string().valid(...Object.values(NODE_ENVIRONMENT_MODE)),
        versionControlSystem: joi.string().required(),
        clientDevelopmentUrlOrigin: joi.string().required(),
        swaggerEditorUrlOrigin: joi.string().required(),
        productionDockerImageVersion: joi.string().required(),
      })
      .options({ abortEarly: false });

    this.#validation = new Validation(errorMessage, validationSchema);
  }

  static terminateOnValidationError(environmentVariables) {
    this.#validation.terminateOnError(environmentVariables);
  }
}
