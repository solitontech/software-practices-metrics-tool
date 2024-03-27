import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import archiver from 'archiver';

import { DirectoryService } from '../setup/index.js';

class Build {
  static #currentDirname = dirname(fileURLToPath(import.meta.url));
  static #electronPackageDirectoryPath = path.join(this.#currentDirname, '../..');

  static #electronPackageJsonPath = path.join(this.#electronPackageDirectoryPath, 'package.json');
  static #electronPackageLockJsonPath = path.join(this.#electronPackageDirectoryPath, 'package-lock.json');
  static #tempElectronPackageJsonPath = path.join(this.#electronPackageDirectoryPath, 'package.temp.json');
  static #tempElectronPackageLockJsonPath = path.join(this.#electronPackageDirectoryPath, 'package-lock.temp.json');
  static #serverPackageJsonPath = path.join(this.#electronPackageDirectoryPath, '../../package.json');

  static #electronOutDirectoryPath = path.join(this.#electronPackageDirectoryPath, 'out');
  static #electronReleaseDirectoryPath = path.join(this.#electronPackageDirectoryPath, 'electron-dist');
  static #serverConfigFilePath = path.join(this.#electronPackageDirectoryPath, '../../src/configs/server-config.json');

  static #createBackUpPackageJsonForElectron() {
    console.log(chalk.grey('\nCreating backup of package.json & package.lock.json in electron directory\n'));

    fs.copyFileSync(this.#electronPackageJsonPath, this.#tempElectronPackageJsonPath);
    fs.copyFileSync(this.#electronPackageLockJsonPath, this.#tempElectronPackageLockJsonPath);

    console.log(
      chalk.green('\nBackup created successfully for package.json & package.lock.json in electron directory\n')
    );
  }

  static #copyDirectoriesFromServerToElectronPackage() {
    console.log(chalk.grey('\nCopying src , docs and dist directories of server into electron-package\n'));

    // Copy src directory in server to server directory in electron-package
    DirectoryService.copyDirectory(
      path.join(this.#electronPackageDirectoryPath, '../../src'),
      path.join(this.#electronPackageDirectoryPath, 'server/src')
    );

    // Copy dist directory in server to server directory in electron-package
    DirectoryService.copyDirectory(
      path.join(this.#electronPackageDirectoryPath, '../../dist'),
      path.join(this.#electronPackageDirectoryPath, 'server/dist')
    );

    // Copy docs directory in server to server directory in electron-package
    DirectoryService.copyDirectory(
      path.join(this.#electronPackageDirectoryPath, '../../docs'),
      path.join(this.#electronPackageDirectoryPath, 'server/docs')
    );

    DirectoryService.copyFile(this.#serverConfigFilePath, this.#electronReleaseDirectoryPath);

    console.log(chalk.green('\nsrc ,docs and dist directories of server copied successfully into electron-package\n'));
  }

  static #settingProductionEnvironmentForElectronPackage() {
    console.log(chalk.grey('\nSetting production environment in server .env of electron package directory\n'));

    const envFilePath = path.join(this.#electronPackageDirectoryPath, 'server/src/configs/.env');
    const env = fs.readFileSync(envFilePath, 'utf-8');

    fs.writeFileSync(envFilePath, `${env}\nNODE_ENVIRONMENT=production`);

    console.log(
      chalk.green('\nProduction environment in server .env of electron package directory set successfully\n')
    );
  }

  static #mergeDependenciesFromServerToElectron() {
    console.log(chalk.grey('\nMerging dependencies from server package.json into electron-package package.json\n'));

    const currentPackageJson = JSON.parse(fs.readFileSync(this.#electronPackageJsonPath, 'utf-8'));
    const serverPackageJson = JSON.parse(fs.readFileSync(this.#serverPackageJsonPath, 'utf-8'));

    currentPackageJson.dependencies = {
      ...currentPackageJson.dependencies,
      ...serverPackageJson.dependencies,
    };

    fs.writeFileSync(this.#electronPackageJsonPath, JSON.stringify(currentPackageJson, null, 2));

    console.log(
      chalk.green('\nDependencies merged from server package.json into electron-package package.json successfully\n')
    );
  }

  static #installDependenciesInsideElectron() {
    console.log(chalk.grey('\nInstalling electron-package dependencies\n'));

    DirectoryService.runCommand('npm', ['install']);

    console.log(chalk.green('\nDependencies of electron-package installed successfully\n'));
  }

  static #buildElectron() {
    console.log(chalk.grey('\nBuilding Electron installer\n'));

    DirectoryService.runCommand('electron-forge', ['make']);

    console.log(chalk.green('\nElectron build successfully\n'));
  }

  static #deleteDirectoriesCopiedFromServerInElectron() {
    console.log(chalk.grey('\nDeleting copied server directory in electron-package\n'));

    DirectoryService.deleteDirectories([path.join(this.#electronPackageDirectoryPath, 'server')]);

    DirectoryService.deleteFiles([path.join(this.#electronReleaseDirectoryPath, 'server-config.json')]);

    console.log(chalk.green('\nCopied server directory in electron-package deleted successfully\n'));
  }

  static #restoreElectronPackageJson() {
    console.log(chalk.grey('\nRestoring package.json in electron-package\n'));

    fs.copyFileSync(this.#tempElectronPackageJsonPath, this.#electronPackageJsonPath);
    fs.copyFileSync(this.#tempElectronPackageLockJsonPath, this.#electronPackageLockJsonPath);

    fs.unlinkSync(this.#tempElectronPackageJsonPath);
    fs.unlinkSync(this.#tempElectronPackageLockJsonPath);

    console.log(chalk.green('\nRestored package.json in electron-package successfully\n'));
  }

  static async #zipReleaseFolder() {
    console.log('\nZipping release-to-production folder...');

    this.#copyInstallerToElectronDist();

    const outputPath = path.join(this.#electronPackageDirectoryPath, 'electron-dist.zip');
    const output = fs.createWriteStream(outputPath);
    const compressionLevel = 9;

    const archive = archiver('zip', {
      zlib: { level: compressionLevel },
    });

    return new Promise((resolve, reject) => {
      output.on('close', function () {
        console.log('\nZipped release-to-production folder successfully.');
        resolve();
      });

      archive.on('error', function (err) {
        reject(err);
      });

      archive.pipe(output);
      archive.directory(path.join(this.#electronReleaseDirectoryPath), false);
      archive.finalize();
    });
  }

  static #copyInstallerToElectronDist() {
    console.log(chalk.grey('\nCopying installer directory to electron-dist\n'));

    const makeFolderPath = path.join(this.#electronOutDirectoryPath, 'make');

    DirectoryService.copyDirectory(makeFolderPath, this.#electronReleaseDirectoryPath);

    console.log(chalk.green('\nInstaller directory copied to electron-dist successfully\n'));
  }

  static async startBuild() {
    try {
      this.#createBackUpPackageJsonForElectron();
      this.#copyDirectoriesFromServerToElectronPackage();
      this.#settingProductionEnvironmentForElectronPackage();
      this.#mergeDependenciesFromServerToElectron();
      this.#installDependenciesInsideElectron();
      this.#buildElectron();
      await this.#zipReleaseFolder();
    } catch (error) {
      console.error(chalk.red('Build process failed:', error));
    } finally {
      this.#deleteDirectoriesCopiedFromServerInElectron();
      this.#restoreElectronPackageJson();
    }
  }
}

Build.startBuild();
