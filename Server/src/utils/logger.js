import Logger from '@ptkdev/logger';

const logger = new Logger();

export const logError = (...args) => {
  logger.error(...args);
};
