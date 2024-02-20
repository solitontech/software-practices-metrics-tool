import { AzureDevops } from './azure-devops/azure-devops.js';

import { logError } from '../../utils/logger.js';
import { ServerConfiguration } from '../../configs/server-config.js';

const { versionControlSystem: VERSION_CONTROL_SYSTEM } = ServerConfiguration.environmentVariables;

export const SERVICE_MAP = {
  AZURE_DEVOPS: AzureDevops,
};

export const ACTIVE_VERSION_CONTROL_SERVICE = SERVICE_MAP[VERSION_CONTROL_SYSTEM];

if (!ACTIVE_VERSION_CONTROL_SERVICE) {
  logError(`Version control system not found. Valid values are ${Object.keys(SERVICE_MAP)}`);

  // version control system is invalid don't boot server
  process.exit(1);
}
