export class AppError extends Error {
  constructor(errorMessage, statusCode) {
    super(errorMessage);
    this.statusCode = statusCode;
  }

  static throwAppError(errorMessage, statusCode) {
    throw new AppError(errorMessage, statusCode);
  }
}
