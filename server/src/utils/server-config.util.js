import os from 'os';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { PLATFORM } from '##/constants/constants.js';

export class ConfigPathResolver {
  static #dirName = path.dirname(fileURLToPath(import.meta.url));
  static #defaultServerConfigPath = path.join(this.#dirName, '../configs/server-config.json');

  static getServerConfigPath() {
    let appDataPath;

    if (os.platform() === PLATFORM.WINDOWS) {
      appDataPath = this.#getWindowConfigPath();
    }

    if (appDataPath && fs.existsSync(appDataPath)) {
      return appDataPath;
    }

    return this.#defaultServerConfigPath;
  }

  static #getWindowConfigPath() {
    return path.join(os.homedir(), 'AppData/Local/SoftwarePracticesMetricsTool/server-config.json');
  }
}
