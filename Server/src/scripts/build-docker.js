import path, { dirname } from 'path';
import chalk from 'chalk';
import { promisify } from 'util';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { ServerConfiguration } from '../configs/server-config.js';

class BuildDocker {
  static dockerImageName;
  static execAsync = promisify(exec);
  static currentDir = dirname(fileURLToPath(import.meta.url));

  static {
    const imageVersion = ServerConfiguration.environmentVariables.productionDockerImageVersion;

    this.dockerImageName = 'software-practices-metrics-tool:' + imageVersion;
  }

  static isImageNameValid(name) {
    // Regex match example : software-practices-metrics-tool:1.0.0
    const imageNameRegex = /^[a-z0-9-]+:[0-9]+\.[0-9]+\.[0-9]+$/i;

    return imageNameRegex.test(name);
  }

  static async buildImage() {
    const command = `docker build -t ${this.dockerImageName} .`;

    console.log(chalk.grey('\nCreating docker image...'));

    await this.execAsync(command);

    console.log(chalk.green('\nDocker image created successfully'));
  }

  static async createTarFileFromImage() {
    const [tarFileName] = this.dockerImageName.split(':');

    const outputPath = path.join(this.currentDir, '/..', '/..', '/release-to-production', `${tarFileName}.tar`);
    const command = `docker save -o ${outputPath} ${this.dockerImageName}`;

    console.log(chalk.grey('\nCreating tar file from builded docker image...'));

    await this.execAsync(command);

    console.log(chalk.green('\nDocker tar file created successfully in release-to-production directory.'));
  }

  static async buildImageAsTarFile() {
    console.log(`Building docker image ( ${this.dockerImageName} )`);

    if (!this.isImageNameValid(this.dockerImageName)) {
      throw new Error(`
        Invalid image name - ${this.dockerImageName}
        - Change the ".env" file "PRODUCTION_DOCKER_IMAGE_VERSION" key like the following example:
        - Example: 1.0.0
      `);
    }

    await this.buildImage();
    await this.createTarFileFromImage();
  }

  static async changeImageVersionInComposeFile() {
    const filePath = path.join(this.currentDir, '/..', '/..', '/release-to-production', 'compose.yaml');

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }

      // RegExp pattern to match the image in compose file
      const regexPattern = new RegExp('image: software-practices-metrics-tool:.*', 'g');

      const isPatternMatched = regexPattern.test(data);

      if (!isPatternMatched) {
        console.log(
          chalk.gray(`
        Invalid image in compose.yaml file. 
        Please update the new image manually in compose.yaml file.
        image - ${this.dockerImageName}`)
        );

        return;
      }

      const modifiedData = data.replace(regexPattern, `image: ${this.dockerImageName}`);

      fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
        if (err) {
          console.error(chalk.red('Error writing to file:', err));
          return;
        }

        console.log(chalk.green('Compose.yaml file has been updated with the new image tag.'));
      });
    });
  }

  static async startBuild() {
    try {
      await this.buildImageAsTarFile();
      await this.changeImageVersionInComposeFile();
    } catch (error) {
      console.log(chalk.grey('\nMake sure the docker daemon is running: $ docker ps\n'));

      console.error(chalk.red(error));
    }
  }
}

BuildDocker.startBuild();
