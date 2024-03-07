import joi from 'joi';

import { Validation } from '../common/validation.js';

export class PaginationValidation {
  static #validation;

  static {
    const errorMessage = 'Pagination validation error ';

    const validationSchema = joi
      .object({
        paginationCursor: joi.number().min(1).required(),
        paginationSize: joi.number().min(1).required(),
      })
      .options({ abortEarly: false });

    this.#validation = new Validation(errorMessage, validationSchema);
  }

  static getValidationError(paginationCursor, paginationSize) {
    const { error } = this.#validation.getValidationResult({
      paginationCursor,
      paginationSize,
    });

    return this.#validation.getUserErrorMessage(error);
  }
}
