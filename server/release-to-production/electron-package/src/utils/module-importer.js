export class ModuleImporter {
  static #developmentSourcePath = '../../../../src';
  static #productionSourcePath = '../../src';
  static #sourcePath;
  static #port;

  static {
    this.#sourcePath =
      process.env.NODE_ENVIRONMENT === 'development' ? this.#developmentSourcePath : this.#productionSourcePath;
  }

  static async importModules() {
    await import(`${this.#sourcePath}/index.js`);

    const ServerConfigurationModule = await import(`${this.#sourcePath}/configs/server.config.js`);

    this.#port = ServerConfigurationModule.ServerConfiguration.environmentVariables.port;
  }

  static async getPort() {
    return this.#port;
  }
}
