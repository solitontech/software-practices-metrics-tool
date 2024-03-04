import { logError } from '../../utils/logger.js';

export class Validation {
  #errorMessage;
  #validationSchema;

  constructor(errorMessage, validationSchema) {
    this.#errorMessage = errorMessage;
    this.#validationSchema = validationSchema;
  }

  #validate(dataToValidate) {
    return this.#validationSchema.validate(dataToValidate);
  }

  #logValidationError(error) {
    error.details.forEach(({ message }) => {
      logError(this.#errorMessage + message);
    });
  }

  getValidationResult(dataToValidate) {
    return this.#validate(dataToValidate);
  }

  terminateOnError(dataToValidate) {
    const { error } = this.#validate(dataToValidate);

    if (error) {
      this.#logValidationError(error);

      return process.exit(1);
    }
  }
}
