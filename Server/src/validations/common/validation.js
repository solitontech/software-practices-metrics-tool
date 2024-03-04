import { logError } from '../../utils/logger.js';

export class Validation {
  #errorMessage;
  #validationSchema;

  constructor(errorMessage, validationSchema) {
    this.#errorMessage = errorMessage;
    this.#validationSchema = validationSchema;
  }

  #validate(data) {
    return this.#validationSchema.validate(data);
  }

  #logValidationError(error) {
    error.details.forEach(({ message }) => {
      logError(this.#errorMessage + message);
    });
  }

  getValidationResult(data) {
    return this.#validate(data);
  }

  terminateOnError(data) {
    const { error } = this.#validate(data);

    if (error) {
      this.#logValidationError(error);

      return process.exit(1);
    }
  }
}
