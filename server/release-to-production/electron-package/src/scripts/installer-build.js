// build.js
import { copyFileSync, readFileSync, writeFileSync, unlinkSync } from 'fs';
import { resolve, dirname } from 'path';
import { spawnSync, execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Get the directory of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Save original package.json
const currentPackageJsonPath = resolve(__dirname, '../../package.json');
const backupPackageJsonPath = resolve(__dirname, '../../package.json.bak');

const createBackUpPackageJson = () => {
  console.log('\nCreating backup of package.json\n');

  copyFileSync(currentPackageJsonPath, backupPackageJsonPath);
};

// Copy src and dist directories
const copyDirectories = () => {
  console.log('\nCopying src , docs and dist directories\n');

  spawnSync('xcopy', ['..\\..\\src', '.\\src', '/E', '/I'], { stdio: 'inherit' });
  spawnSync('xcopy', ['..\\..\\dist', '.\\dist', '/E', '/I'], { stdio: 'inherit' });
  spawnSync('xcopy', ['..\\..\\docs\\open-api-doc-swagger.yaml', '.\\docs\\', '/E', '/I'], {
    stdio: 'inherit',
  });
};

const settingProductionEnvironment = () => {
  console.log('\nSetting production environment\n');

  const env = readFileSync(resolve(__dirname, '..', '..', 'src', 'configs', '.env'), 'utf-8');
  writeFileSync(resolve(__dirname, '..', '..', 'src', 'configs', '.env'), `${env}\nNODE_ENVIRONMENT=production`);
};

// Delete src and dist directories
const deleteDirectories = () => {
  console.log('\nDeleting src , docs and dist directories\n');

  // Copy the files or folders you want to keep to a temporary location
  spawnSync('xcopy', ['.\\src\\main.js', '.\\temp\\', '/E', '/I'], { stdio: 'inherit', shell: true });
  spawnSync('xcopy', ['.\\src\\scripts\\installer-build.js', '.\\temp\\', '/E', '/I'], {
    stdio: 'inherit',
    shell: true,
  });
  spawnSync('xcopy', ['.\\src\\assets', '.\\temp\\assets', '/E', '/I'], { stdio: 'inherit', shell: true });

  // Delete the directory
  spawnSync('rd', ['/s', '/q', 'src', 'dist', 'docs'], { stdio: 'inherit', shell: true });

  // Copy the files or folders back to the original location
  spawnSync('xcopy', ['.\\temp\\main.js', '.\\src\\', '/E', '/I'], { stdio: 'inherit', shell: true });
  spawnSync('xcopy', ['.\\temp\\installer-build.js', '.\\src\\scripts\\', '/E', '/I'], {
    stdio: 'inherit',
    shell: true,
  });
  spawnSync('xcopy', ['.\\temp\\assets', '.\\src\\assets', '/E', '/I'], { stdio: 'inherit', shell: true });

  spawnSync('rd', ['/s', '/q', '.\\temp'], { stdio: 'inherit', shell: true });
};

// Merge dependencies from source package.json into current package.json
const mergeDependencies = () => {
  console.log('\nMerging dependencies from source package.json into current package.json\n');

  const sourcePackageJsonPath = resolve(__dirname, '..', '..', '..', '..', 'package.json');

  const currentPackageJson = JSON.parse(readFileSync(currentPackageJsonPath, 'utf-8'));
  const sourcePackageJson = JSON.parse(readFileSync(sourcePackageJsonPath, 'utf-8'));

  currentPackageJson.dependencies = {
    ...currentPackageJson.dependencies,
    ...sourcePackageJson.dependencies,
  };

  writeFileSync(currentPackageJsonPath, JSON.stringify(currentPackageJson, null, 2));
};

// Install dependencies
const installDependencies = () => {
  console.log('\nInstalling dependencies\n');

  const result = spawnSync('npm', ['install'], { stdio: 'inherit', shell: true });
  if (result.error) {
    throw result.error;
  }
};

const buildElectron = () => {
  console.log('\nBuilding Electron\n');

  const result = spawnSync('electron-forge', ['make'], { stdio: 'inherit', shell: true });
  if (result.error) {
    throw result.error;
  }
};

const restorePackageJson = () => {
  console.log('\nRestoring package.json\n');

  copyFileSync(backupPackageJsonPath, currentPackageJsonPath);
  unlinkSync(backupPackageJsonPath);
};

// Build process
try {
  createBackUpPackageJson();
  copyDirectories();
  settingProductionEnvironment();
  mergeDependencies();
  installDependencies();
  buildElectron();
} catch (error) {
  console.error('Build process failed:', error);
} finally {
  deleteDirectories();
  restorePackageJson();
}
