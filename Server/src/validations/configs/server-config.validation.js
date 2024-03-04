import joi from 'joi';

import { Validation } from '../common/validation.js';

export class ServerConfigValidation {
  static #validation;

  static {
    const errorMessage = 'Server config validation error ';

    const validationSchema = joi
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

    this.#validation = new Validation(errorMessage, validationSchema);
  }

  static terminateOnValidationError(serverConfigs) {
    this.#validation.terminateOnError(serverConfigs);
  }
}
