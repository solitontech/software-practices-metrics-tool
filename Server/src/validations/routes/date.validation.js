import joiBase from 'joi';
import joiDate from '@joi/date';

import { Validation } from '../common/validation.js';

const joi = joiBase.extend(joiDate);

export class DateValidation {
  static #validation;

  static {
    const errorMessage = 'Date validation error ';

    const validationSchema = joi
      .object({
        startDate: joi.date().format('YYYY-MM-DD').max(joi.ref('endDate')).required(),
        endDate: joi.date().format('YYYY-MM-DD').less(Date.now()).required(),
      })
      .options({ abortEarly: false });

    this.#validation = new Validation(errorMessage, validationSchema);
  }

  static getValidationError(startDate, endDate) {
    const { error } = this.#validation.getValidationResult({ startDate, endDate });

    return this.#validation.getUserErrorMessage(error);
  }
}
