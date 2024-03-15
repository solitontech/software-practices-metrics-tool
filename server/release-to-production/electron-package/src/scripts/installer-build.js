import { copyFileSync, readFileSync, writeFileSync, unlinkSync } from 'fs';
import { dirname, join, sep as separator } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

import { FileSystemOperator } from '../utils/index.js';

class InstallerBuilder {
  static #currentDirname = dirname(fileURLToPath(import.meta.url));
  static #currentPackageJsonPath = 'package.json';
  static #currentPackageLockJsonPath = 'package-lock.json';
  static #backupPackageJsonPath = 'package.temp.json';
  static #backupPackageLockJsonPath = 'package-lock.temp.json';
  static #serverPackageJsonPath = join(this.#currentDirname, '..', '..', '..', '..', 'package.json');

  static #createBackUpPackageJson() {
    console.log(chalk.grey('\nCreating backup of package.json & package.lock.json\n'));

    copyFileSync(this.#currentPackageJsonPath, this.#backupPackageJsonPath);
    copyFileSync(this.#currentPackageLockJsonPath, this.#backupPackageLockJsonPath);

    console.log(chalk.green('\nBackup created successfully for package.json & package.lock.json\n'));
  }

  static #copyDirectoriesFromServer() {
    console.log(chalk.grey('\nCopying src , docs and dist directories of server into electron-package\n'));

    FileSystemOperator.copyDirectory(join('..', '..', 'src'), join('server', 'src'));
    FileSystemOperator.copyDirectory(join('..', '..', 'dist'), join('server', 'dist'));
    FileSystemOperator.copyFile(
      join('..', '..', 'docs', 'open-api-doc-swagger.yaml'),
      join('server', 'docs', separator)
    );

    console.log(chalk.green('\nDirectories copied successfully\n'));
  }

  static #settingProductionEnvironment() {
    console.log(chalk.grey('\nSetting production environment in .env\n'));

    const envFilePath = join(this.#currentDirname, '..', '..', 'server', 'src', 'configs', '.env');
    const env = readFileSync(envFilePath, 'utf-8');

    writeFileSync(envFilePath, `${env}\nNODE_ENVIRONMENT=production`);

    console.log(chalk.green('\nProduction environment set successfully\n'));
  }

  static #mergeDependencies() {
    console.log(chalk.grey('\nMerging dependencies from server package.json into electron-package package.json\n'));

    const currentPackageJson = JSON.parse(readFileSync(this.#currentPackageJsonPath, 'utf-8'));
    const serverPackageJson = JSON.parse(readFileSync(this.#serverPackageJsonPath, 'utf-8'));

    currentPackageJson.dependencies = {
      ...currentPackageJson.dependencies,
      ...serverPackageJson.dependencies,
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
    console.log(chalk.grey('\nBuilding Electron installer\n'));

    FileSystemOperator.runCommand('electron-forge', ['make']);

    console.log(chalk.green('\nElectron build successfully\n'));
  }

  static #deleteDirectoriesCopiedFromServer() {
    console.log(chalk.grey('\nDeleting server directories\n'));

    FileSystemOperator.deleteDirectories(['server']);

    console.log(chalk.green('\nDirectories deleted successfully\n'));
  }

  static #restorePackageJson() {
    console.log(chalk.grey('\nRestoring package.json\n'));

    copyFileSync(this.#backupPackageJsonPath, this.#currentPackageJsonPath);
    unlinkSync(this.#backupPackageJsonPath);

    copyFileSync(this.#backupPackageLockJsonPath, this.#currentPackageLockJsonPath);
    unlinkSync(this.#backupPackageLockJsonPath);

    console.log(chalk.green('\nRestored package.json successfully\n'));
  }

  static build() {
    try {
      this.#createBackUpPackageJson();
      this.#copyDirectoriesFromServer();
      this.#settingProductionEnvironment();
      this.#mergeDependencies();
      this.#installDependencies();
      this.#buildElectron();
    } catch (error) {
      console.error(chalk.red('Build process failed:', error));
    } finally {
      this.#deleteDirectoriesCopiedFromServer();
      this.#restorePackageJson();
    }
  }
}

InstallerBuilder.build();
