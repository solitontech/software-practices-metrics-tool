import chalk from 'chalk';
import fs from 'fs-extra';
import path, { dirname } from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

class BuildClient {
  static #clientDirectory;
  static #serverDirectory;

  static #dirName = dirname(fileURLToPath(import.meta.url));
  static #clientTrunkBranch = 'main';

  static {
    this.#clientDirectory = path.join(this.#dirName, '../../../Client');
    this.#serverDirectory = path.join(this.#dirName, '../../../Server');
  }

  static startBuild() {
    this.#changeToClientDirectory();
    this.#switchClientBranchToMain();
    this.#pullLatestClientChanges();
    this.#installClientNodeModules();
    this.#startClientBuild();
    this.#copyClientBuildToServerDirectory();
  }

  static #changeToClientDirectory() {
    console.log(chalk.grey('\nSwitching to Client directory'));

    process.chdir(this.#clientDirectory);
  }

  static #switchClientBranchToMain() {
    console.log(chalk.grey(`\nSwitching to ${this.#clientTrunkBranch} branch in Client directory\n`));

    execSync(`git checkout ${this.#clientTrunkBranch}`, { stdio: 'inherit' });
  }

  static #pullLatestClientChanges() {
    console.log(chalk.grey(`\nPulling ${this.#clientTrunkBranch} branch latest changes in Client directory\n`));

    execSync(`git pull origin ${this.#clientTrunkBranch}`, { stdio: 'inherit' });
  }

  static #installClientNodeModules() {
    const nodeModulesPath = path.join(this.#clientDirectory, 'node_modules');

    if (fs.existsSync(nodeModulesPath)) {
      return console.log(
        chalk.grey('\nnode_modules folder already present in Client directory, so skipping npm install\n')
      );
    }

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
