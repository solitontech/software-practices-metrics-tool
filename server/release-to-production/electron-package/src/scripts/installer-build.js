import { copyFileSync, readFileSync, writeFileSync, unlinkSync } from 'fs';
import { dirname, join, sep as separator } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

import { FileSystemOperator } from '../utils/index.js';

class InstallerBuilder {
  static #currentDirname = dirname(fileURLToPath(import.meta.url));
  static #currentPackageJsonPath = 'package.json';
  static #backupPackageJsonPath = 'package.temp.json';
  static #serverPackageJsonPath = join(this.#currentDirname, '..', '..', '..', '..', 'package.json');

  static #createBackUpPackageJson() {
    console.log(chalk.grey('\nCreating backup of package.json\n'));

    copyFileSync(this.#currentPackageJsonPath, this.#backupPackageJsonPath);

    console.log(chalk.green('\npackage.json Backup created successfully\n'));
  }

  static #createBackUpSourceDirectory() {
    console.log(chalk.grey('\nCreating backup of source directory\n'));

    FileSystemOperator.copyDirectory('src', join('temp', 'src'));
    FileSystemOperator.deleteDirectories(['src']);

    console.log(chalk.green('\nSource directory Backup created successfully\n'));
  }

  static #restoreSourceDirectory() {
    console.log(chalk.grey('\nRestoring source directory\n'));

    FileSystemOperator.copyDirectory(join('temp', 'src'), 'src');
    FileSystemOperator.deleteDirectories(['temp']);

    console.log(chalk.green('\nSource directory restored successfully\n'));
  }

  static #copyDirectoriesFromServer() {
    console.log(chalk.grey('\nCopying src , docs and dist directories\n'));

    FileSystemOperator.copyDirectory(join('..', '..', 'src'), 'src');
    FileSystemOperator.copyDirectory(join('..', '..', 'dist'), 'dist');
    FileSystemOperator.copyFile(join('..', '..', 'docs', 'open-api-doc-swagger.yaml'), join('docs', separator));

    console.log(chalk.green('\nDirectories copied successfully\n'));
  }

  static #settingProductionEnvironment() {
    console.log(chalk.grey('\nSetting production environment\n'));

    const envFilePath = join(this.#currentDirname, '..', '..', 'src', 'configs', '.env');
    const env = readFileSync(envFilePath, 'utf-8');

    writeFileSync(envFilePath, `${env}\nNODE_ENVIRONMENT=production`);

    console.log(chalk.green('\nProduction environment set successfully\n'));
  }

  static #deleteDirectoriesCopiedFromServer() {
    console.log(chalk.grey('\nDeleting src , dist and docs directories\n'));

    FileSystemOperator.deleteDirectories(['src', 'dist', 'docs']);

    console.log(chalk.green('\nDirectories deleted successfully\n'));
  }

  static #mergeDependencies() {
    console.log(chalk.grey('\nMerging dependencies from source package.json into current package.json\n'));

    const currentPackageJson = JSON.parse(readFileSync(this.#currentPackageJsonPath, 'utf-8'));
    const sourcePackageJson = JSON.parse(readFileSync(this.#serverPackageJsonPath, 'utf-8'));

    currentPackageJson.dependencies = {
      ...currentPackageJson.dependencies,
      ...sourcePackageJson.dependencies,
    };

    writeFileSync(this.#currentPackageJsonPath, JSON.stringify(currentPackageJson, null, 2));

    console.log(chalk.green('\nDependencies merged successfully\n'));
  }

  static #installDependencies() {
    console.log(chalk.grey('\nInstalling dependencies\n'));

    FileSystemOperator.runCommand('npm', ['install']);

    console.log(chalk.green('\nDependencies installed successfully\n'));
  }

  static #buildElectron() {
    console.log(chalk.grey('\nBuilding Electron\n'));

    FileSystemOperator.runCommand('electron-forge', ['make']);

    console.log(chalk.green('\nElectron build successfully\n'));
  }

  static #restorePackageJson() {
    console.log(chalk.grey('\nRestoring package.json\n'));

    copyFileSync(this.#backupPackageJsonPath, this.#currentPackageJsonPath);
    unlinkSync(this.#backupPackageJsonPath);

    console.log(chalk.green('\npackage.json restored successfully\n'));
  }

  static build() {
    try {
      this.#createBackUpPackageJson();
      this.#createBackUpSourceDirectory();
      this.#copyDirectoriesFromServer();
      this.#settingProductionEnvironment();
      this.#mergeDependencies();
      this.#installDependencies();
      this.#buildElectron();
    } catch (error) {
      console.error(chalk.grey('Build process failed:', error));
    } finally {
      this.#deleteDirectoriesCopiedFromServer();
      this.#restoreSourceDirectory();
      this.#restorePackageJson();
    }
  }
}

InstallerBuilder.build();
