import joiBase from 'joi';
import joiDate from '@joi/date';

const joi = joiBase.extend(joiDate);

export class Validator {
  static validatePaginationData(paginationCursor, paginationSize) {
    const schema = joi
      .object({
        paginationCursor: joi.number().min(1).required(),
        paginationSize: joi.number().min(1).required(),
      })
      .options({ abortEarly: false });

    const { error } = schema.validate({
      paginationCursor,
      paginationSize,
    });

    if (!error) {
      return { error: null };
    }

    return { error: Validator.getFormattedErrors(error) };
  }

  static validateDate(startDate, endDate) {
    const schema = joi
      .object({
        startDate: joi.date().format('YYYY-MM-DD').max(joi.ref('endDate')).required(),
        endDate: joi.date().format('YYYY-MM-DD').less(Date.now()).required(),
      })
      .options({ abortEarly: false });

    const { error } = schema.validate({
      startDate,
      endDate,
    });

    if (!error) {
      return { error: null };
    }

    return { error: Validator.getFormattedErrors(error) };
  }

  static getFormattedErrors = (error) => {
    return error.details
      .map(({ message }) => {
        return Validator.replaceWithSingleQuotes(message);
      })
      .join(' | ');
  };

  static replaceWithSingleQuotes = (message) => {
    return message.replace(/"/g, "'");
  };
}
