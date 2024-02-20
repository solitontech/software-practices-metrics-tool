import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { router } from './routes/routes.js';
import { AppError } from './utils/app-error.js';
import { logDevError } from './utils/dev-logger.js';
import { ServerConfiguration } from './configs/server-config.js';

import { ERROR_MESSAGE, NODE_ENVIRONMENT_MODE, STATUS_CODE } from './constants/constants.js';

ServerConfiguration.load();

const { DEVELOPMENT } = NODE_ENVIRONMENT_MODE;
const {
  nodeEnvironment: NODE_ENVIRONMENT,
  port: SERVER_RUN_IN_PORT,
  clientDevelopmentUrlOrigin: CLIENT_DEVELOPMENT_URL_ORIGIN,
  swaggerEditorUrlOrigin: SWAGGER_EDITOR_URL_ORIGIN,
} = ServerConfiguration.environmentVariables;

const dirName = path.dirname(fileURLToPath(import.meta.url));

const app = express();

if (NODE_ENVIRONMENT === DEVELOPMENT) {
  const morgan = await import('morgan');
  const cors = await import('cors');

  const corsOptions = {
    origin: [CLIENT_DEVELOPMENT_URL_ORIGIN, SWAGGER_EDITOR_URL_ORIGIN],
    optionsSuccessStatus: STATUS_CODE.OK,
  };

  app.use(morgan.default('dev'));
  app.use(cors.default(corsOptions));
}

app.use(express.static(path.join(dirName, '../dist')));

app.use(router);

app.get('*', (req, res) => {
  res.sendFile(path.join(dirName, '../dist/index.html'));
});

// express global error handler (https://expressjs.com/en/guide/error-handling.html)
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  logDevError(error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: error.message,
    });
  }

  return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
    error: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
  });
});

app.listen(SERVER_RUN_IN_PORT, () => {
  console.log('Server is running on Port:', SERVER_RUN_IN_PORT);
});
