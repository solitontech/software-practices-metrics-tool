import chalk from 'chalk';
import fs from 'fs-extra';
import path, { dirname } from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

class BuildClient {
  static #clientDirectory;
  static #serverDirectory;

  static #dirName = dirname(fileURLToPath(import.meta.url));

  static {
    this.#clientDirectory = path.join(this.#dirName, '../../../client');
    this.#serverDirectory = path.join(this.#dirName, '../../../server');
  }

  static startBuild() {
    this.#changeToClientDirectory();
    this.#installClientNodeModules();
    this.#startClientBuild();
    this.#copyClientBuildToServerDirectory();
  }

  static #changeToClientDirectory() {
    console.log(chalk.grey('\nSwitching to Client directory'));

    process.chdir(this.#clientDirectory);
  }

  static #installClientNodeModules() {
    console.log(chalk.grey(`\nInstalling Client directory node_modules...`));

    execSync(`npm install`, { stdio: 'inherit' });
  }

  static #startClientBuild() {
    console.log(chalk.grey('\nRunning npm run build...'));

    execSync('npm run build', { stdio: 'inherit' });

    console.log(chalk.grey('\nClient build completed successfully.'));
  }

  static #copyClientBuildToServerDirectory() {
    console.log(chalk.grey('\nCopying dist folder from Client directory to Server directory...'));

    fs.copySync(path.join(this.#clientDirectory, 'dist'), path.join(this.#serverDirectory, 'dist'));

    console.log(chalk.green('\nCopied dist folder from Client directory to Server directory successfully'));
  }
}

BuildClient.startBuild();
