import { NODE_ENVIRONMENT_MODE } from '../constants/index.js';

const { DEVELOPMENT } = NODE_ENVIRONMENT_MODE;

export class ModuleImporter {
  static #developmentSourcePath = '../../../../src';
  static #productionSourcePath = '../../server/src';
  static #sourcePath;
  static #ServerConfiguration;

  static {
    this.#sourcePath =
      process.env.NODE_ENVIRONMENT === DEVELOPMENT ? this.#developmentSourcePath : this.#productionSourcePath;
  }

  static async importServerModules() {
    await import(`${this.#sourcePath}/index.js`);

    const ServerConfigurationModule = await import(`${this.#sourcePath}/configs/server.config.js`);

    this.#ServerConfiguration = ServerConfigurationModule.ServerConfiguration;
  }

  static async getServerPort() {
    return this.#ServerConfiguration.environmentVariables.port;
  }
}
