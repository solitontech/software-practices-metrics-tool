import { logError } from '../../utils/utils.js';

export class Validation {
  #errorMessage;
  #validationSchema;

  constructor(errorMessage, validationSchema) {
    this.#errorMessage = errorMessage;
    this.#validationSchema = validationSchema;
  }

  getValidationResult(dataToValidate) {
    return this.#validate(dataToValidate);
  }

  terminateOnError(dataToValidate) {
    const { error } = this.#validate(dataToValidate);

    if (error) {
      this.#logError(error);

      return process.exit(1);
    }
  }

  getUserErrorMessage(error) {
    if (!error) {
      return null;
    }

    const errorMessage = error.details
      .map(({ message }) => {
        return this.#replaceWithSingleQuotes(message);
      })
      .join(' | ');

    return errorMessage;
  }

  #validate(dataToValidate) {
    return this.#validationSchema.validate(dataToValidate);
  }

  #logError(error) {
    error.details.forEach(({ message }) => {
      logError(this.#errorMessage + message);
    });
  }

  #replaceWithSingleQuotes(message) {
    return message.replace(/"/g, "'");
  }
}
