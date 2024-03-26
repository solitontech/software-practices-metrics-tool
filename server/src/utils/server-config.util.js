import os from 'os';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PLATFORM } from '##/constants/constants.js';

const { WINDOWS } = PLATFORM;

export class ConfigPathResolver {
  static #dirName = path.dirname(fileURLToPath(import.meta.url));
  static #defaultServerConfigPath = path.join(this.#dirName, '../configs/server-config.json');

  static getServerConfigPath() {
    if (os.platform() === WINDOWS) {
      const appDataPath = path.join(
        os.homedir(),
        'AppData',
        'Local',
        'SoftwarePracticesMetricsTool',
        'server-config.json'
      );

      if (fs.existsSync(appDataPath)) {
        return appDataPath;
      }
    }

    return this.#defaultServerConfigPath;
  }
}
