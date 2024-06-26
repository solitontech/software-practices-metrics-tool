import { AppError, logError } from '##/utils/utils.js';
import { SERVER_ERROR_MESSAGE, STATUS_CODE } from '##/constants/constants.js';

// express global error handler (https://expressjs.com/en/guide/error-handling.html)
// eslint-disable-next-line no-unused-vars
export const globalErrorHandlerMiddleware = (error, req, res, next) => {
  logError(error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: error.message,
    });
  }

  return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
    error: SERVER_ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
  });
};
