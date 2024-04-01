import Logger from '@ptkdev/logger';

import { NODE_ENVIRONMENT_MODE } from '##/constants/constants.js';
import { ServerConfiguration } from '##/configs/server.config.js';

const logger = new Logger();

const { DEVELOPMENT, TEST_CI } = NODE_ENVIRONMENT_MODE;

export const logError = (...args) => {
  if (ServerConfiguration.environmentVariables.nodeEnvironment === TEST_CI) {
    return;
  }

  if (ServerConfiguration.environmentVariables.nodeEnvironment === DEVELOPMENT) {
    logger.error(...args);

    return console.error(...args);
  }

  logger.error(...args);
};
