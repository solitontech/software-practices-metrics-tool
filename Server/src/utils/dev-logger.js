import Logger from '@ptkdev/logger';

import { NODE_ENVIRONMENT_MODE } from '../constants/constants.js';
import { ServerConfiguration } from '../configs/server-config.js';

const { DEVELOPMENT } = NODE_ENVIRONMENT_MODE;

const logger = new Logger();

export const logDevError = (...args) => {
  if (ServerConfiguration.environmentVariables.nodeEnvironment === DEVELOPMENT) {
    logger.error(...args);
    console.error(...args);
  }
};
