import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';
import { fileURLToPath, format } from 'url';
import { dirname, join } from 'path';

const currentDir = dirname(fileURLToPath(import.meta.url));
const iconPath = join(currentDir, 'src/assets/media/tech-force-logo.ico');

export const packagerConfig = {
  asar: true,
  icon: iconPath,
};

export const rebuildConfig = {};

export const makers = [
  {
    // This package is for building Windows installers
    name: '@electron-forge/maker-squirrel',
    config: {
      setupIcon: iconPath,
    },
  },
  {
    // This package is for building a zip file of your application for macOS
    name: '@electron-forge/maker-zip',
    platforms: ['darwin'],
  },
  {
    // This package is for building Debian packages, which can be installed on Debian-based Linux distributions like Ubuntu
    name: '@electron-forge/maker-deb',
    config: {
      options: {
        icon: iconPath,
      },
    },
  },
  {
    // This package is for building RPM packages, which can be installed on RPM-based Linux distributions like Fedora and CentOS
    name: '@electron-forge/maker-rpm',
    config: {},
  },
];

export const plugins = [
  {
    name: '@electron-forge/plugin-auto-unpack-natives',
    config: {},
  },
  new FusesPlugin({
    version: FuseVersion.V1,
    [FuseV1Options.RunAsNode]: false,
    [FuseV1Options.EnableCookieEncryption]: true,
    [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
    [FuseV1Options.EnableNodeCliInspectArguments]: false,
    [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
    [FuseV1Options.OnlyLoadAppFromAsar]: true,
  }),
];
