import joi from 'joi';

import { logError } from '../utils/logger.js';

export class ServerConfigValidation {
  static #errorMessage = 'Server config validation error: ';

  static #validationSchema = joi
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

  static #validate(serverConfigs) {
    const { error } = this.#validationSchema.validate(serverConfigs);

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

  static terminateOnValidationError(serverConfigs) {
    const { error } = this.#validate(serverConfigs);

    this.#logErrorAndTerminate(error);
  }
}
