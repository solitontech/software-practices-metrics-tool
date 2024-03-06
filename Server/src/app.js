import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';

import { router } from './routes/routes.js';
import { globalErrorHandlerMiddleware } from './middlewares/index.js';
import { ServerConfiguration } from './configs/server.config.js';
import { NODE_ENVIRONMENT_MODE, STATUS_CODE } from './constants/index.js';

const dirName = path.dirname(fileURLToPath(import.meta.url));
const app = express();

const { nodeEnvironment, port, clientDevelopmentUrlOrigin, swaggerEditorUrlOrigin } =
  ServerConfiguration.environmentVariables;

if (nodeEnvironment === NODE_ENVIRONMENT_MODE.DEVELOPMENT) {
  const morgan = await import('morgan');
  const cors = await import('cors');

  const corsOptions = {
    origin: [clientDevelopmentUrlOrigin, swaggerEditorUrlOrigin],
    optionsSuccessStatus: STATUS_CODE.OK,
  };

  app.use(morgan.default('dev'));
  app.use(cors.default(corsOptions));
}

// set security HTTP headers in response
app.use(helmet());

// request body parse as json
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// serve client build dist to user
app.use(express.static(path.join(dirName, '../dist')));

app.use(router);

// unhandled routes send client app for good user experience
app.get('*', (req, res) => {
  res.sendFile(path.join(dirName, '../dist/index.html'));
});

// express global error handler for api routes
app.use(globalErrorHandlerMiddleware);

if (nodeEnvironment !== NODE_ENVIRONMENT_MODE.TEST) {
  app.listen(port, () => {
    console.log('Server is running on port:', port);
  });
}

export default app;
