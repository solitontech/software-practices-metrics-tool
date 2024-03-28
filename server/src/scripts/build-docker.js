import fs from 'fs';
import chalk from 'chalk';
import archiver from 'archiver';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import { ServerConfiguration } from '##/configs/server.config.js';

class BuildDocker {
  static #dockerImageName;

  static #currentDir = dirname(fileURLToPath(import.meta.url));
  static #dockerPackageDir = path.join(this.#currentDir, '../../release-to-production/docker-package');
  static sourceDirectoryPath = path.join(this.#currentDir, '../../src');
  static serverConfigPath = path.join(this.sourceDirectoryPath, 'configs/server-config.json');

  static {
    const imageVersion = ServerConfiguration.environmentVariables.productionDockerImageVersion;

    this.#dockerImageName = 'software-practices-metrics-tool:' + imageVersion;
  }

  static startBuild() {
    this.#buildImageAsTarFile();
    this.#changeImageVersionInComposeFile();
    this.#zipReleaseFolder();
  }

  static #buildImageAsTarFile() {
    console.log(`Building docker image ( ${this.#dockerImageName} )`);

    if (!this.#isImageNameValid(this.#dockerImageName)) {
      throw new Error(`
        Invalid image name - ${this.#dockerImageName}
        - Change the ".env" file "PRODUCTION_DOCKER_IMAGE_VERSION" key like the following example:
        - Example: 1.0.0
      `);
    }

    this.#buildImage();
    this.#createTarFileFromImage();
  }

  static #isImageNameValid(name) {
    // Regex match example : software-practices-metrics-tool:1.0.0
    const imageNameRegex = /^[a-z0-9-]+:[0-9]+\.[0-9]+\.[0-9]+$/i;

    return imageNameRegex.test(name);
  }

  static #buildImage() {
    console.log(chalk.grey('\nCreating docker image...'));

    const command = `docker build -t ${this.#dockerImageName} .`;

    execSync(command);

    console.log(chalk.green('\nDocker image created successfully'));
  }

  static #createTarFileFromImage() {
    console.log(chalk.grey('\nCreating tar file from builded docker image...'));

    const [tarFileName] = this.#dockerImageName.split(':');
    const outputPath = path.join(this.#dockerPackageDir, `${tarFileName}.tar`);
    const command = `docker save -o ${outputPath} ${this.#dockerImageName}`;

    execSync(command);

    console.log(
      chalk.green('\nDocker tar file created successfully in docker-package in release-to-production directory.')
    );
  }

  static #changeImageVersionInComposeFile() {
    const filePath = path.join(this.#dockerPackageDir, '/compose.yaml');
    const composeFileContent = fs.readFileSync(filePath, 'utf8');

    // RegExp pattern to match the image in compose file
    const regexPattern = new RegExp('image: software-practices-metrics-tool:.*', 'g');
    const isPatternMatched = regexPattern.test(composeFileContent);

    if (!isPatternMatched) {
      console.log(chalk.gray('Invalid image in compose.yaml file.'));
      console.log(
        chalk.gray('Please update the new image manually in compose.yaml file.image -', this.#dockerImageName)
      );

      return;
    }

    const modifiedData = composeFileContent.replace(regexPattern, `image: ${this.#dockerImageName}`);

    fs.writeFileSync(filePath, modifiedData, 'utf8');

    console.log(chalk.green('Compose.yaml file has been updated with the new image tag.'));
  }

  static #zipReleaseFolder() {
    console.log('\nZipping docker-package folder...');

    this.#copyServerConfigJson();

    const outputPath = path.join(this.#currentDir, '../../software-practices-metrics-tool.zip');
    const writeStream = fs.createWriteStream(outputPath);
    const compressionLevel = 9;

    const archive = archiver('zip', {
      zlib: { level: compressionLevel },
    });

    writeStream.on('close', () => {
      console.log('\nZipped docker-package folder successfully.');
    });

    archive.on('error', (err) => {
      throw err;
    });

    archive.pipe(writeStream);
    archive.directory(path.join(this.#dockerPackageDir), false);
    archive.finalize();
  }

  static #copyServerConfigJson() {
    console.log(chalk.grey('\nCopying server-config.json file to docker-package...'));

    fs.copyFileSync(this.serverConfigPath, path.join(this.#dockerPackageDir, 'server-config.json'));

    console.log(chalk.green('\nserver-config.json file copied to docker-package successfully.'));
  }
}

BuildDocker.startBuild();
