import { NODE_ENVIRONMENT_MODE } from '../constants/index.js';

const { DEVELOPMENT } = NODE_ENVIRONMENT_MODE;

export class ModuleImport {
  static #developmentCodePathForElectron = '../../../../src';
  static #productionCodePathForElectron = '../../server/src';
  static #activeCodePath;
  static #ServerConfiguration;
  static #entryFile = 'index.js';

  static {
    this.#activeCodePath =
      process.env.NODE_ENVIRONMENT === DEVELOPMENT
        ? this.#developmentCodePathForElectron
        : this.#productionCodePathForElectron;
  }

  static async importServerModules() {
    await import(`${this.#activeCodePath}/frameworks/express-web-server/${this.#entryFile}`);

    const ServerConfigurationModule = await import(`${this.#activeCodePath}/configs/server.config.js`);

    this.#ServerConfiguration = ServerConfigurationModule.ServerConfiguration;
  }

  static get serverPort() {
    return this.#ServerConfiguration.environmentVariables.port;
  }
}
