import fs from 'fs-extra';
import chalk from 'chalk';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import archiver from 'archiver';

import { ServerConfiguration } from '##/configs/server.config.js';

class Build {
  static #dockerImageName;
  static #currentDir = dirname(fileURLToPath(import.meta.url));
  static #clientDirectory = path.join(this.#currentDir, '../../../client');
  static #serverDirectory = path.join(this.#currentDir, '../../../server');
  static #releaseToProductionDirectory = path.join(this.#currentDir, '/../../release-to-production');

  static {
    const imageVersion = ServerConfiguration.environmentVariables.productionDockerImageVersion;

    this.#dockerImageName = 'software-practices-metrics-tool:' + imageVersion;
  }

  static startBuild() {
    this.#buildClient();
    this.#buildDocker();
  }

  static #buildClient() {
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

  static #buildDocker() {
    this.#changeToServerDirectory();
    this.#buildImage();
    this.#createTarFileFromImage();
    this.#zipReleaseFolder();
  }

  static #changeToServerDirectory() {
    console.log(chalk.grey('\nSwitching to Server directory'));
    process.chdir(this.#serverDirectory);
  }

  static #buildImage() {
    console.log(chalk.grey(`Building docker image ( ${this.#dockerImageName} )`));
    console.log(chalk.grey('\nCreating docker image...'));

    const command = `docker build -t ${this.#dockerImageName} .`;

    execSync(command);

    console.log(chalk.green('\nDocker image created successfully'));
  }

  static #createTarFileFromImage() {
    console.log(chalk.grey('\nCreating tar file from builded docker image...'));

    const [tarFileName] = this.#dockerImageName.split(':');
    const outputPath = path.join(this.#releaseToProductionDirectory, `${tarFileName}.tar`);
    const command = `docker save -o ${outputPath} ${this.#dockerImageName}`;

    execSync(command);

    console.log(chalk.green('\nDocker tar file created successfully in release-to-production directory.'));
  }

  static #zipReleaseFolder() {
    console.log('\nZipping release-to-production folder...');

    const outputPath = path.join(this.#currentDir, '/../../release-to-production.zip');
    const output = fs.createWriteStream(outputPath);
    const compressionLevel = 9;

    const archive = archiver('zip', {
      zlib: { level: compressionLevel },
    });

    output.on('close', function () {
      console.log('\nZipped release-to-production folder successfully.');
    });

    archive.on('error', function (err) {
      throw err;
    });

    archive.pipe(output);
    archive.directory(path.join(this.#releaseToProductionDirectory), false);
    archive.finalize();
  }
}

Build.startBuild();
