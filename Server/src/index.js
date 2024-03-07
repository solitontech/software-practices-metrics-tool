import app from './app.js';

import { ServerConfiguration } from './configs/server.config.js';
import { logError } from './utils/logger.js';

const { port } = ServerConfiguration.environmentVariables;

process.on('uncaughtException', logError);
process.on('unhandledRejection', logError);

app.listen(port, () => {
  console.log('Server is running on port:', port);
});
