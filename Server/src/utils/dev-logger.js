import Logger from '@ptkdev/logger';

import { NODE_ENVIRONMENT_MODE } from '../constants/index.js';
import { ServerConfiguration } from '../configs/server.config.js';

const logger = new Logger();

const { DEVELOPMENT } = NODE_ENVIRONMENT_MODE;

export const logDevError = (...args) => {
  if (ServerConfiguration.environmentVariables.nodeEnvironment === DEVELOPMENT) {
    logger.error(...args);
    console.error(...args);
  }
};
