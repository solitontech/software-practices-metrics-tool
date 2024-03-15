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
    name: '@electron-forge/maker-squirrel',
    config: {
      setupIcon: iconPath,
    },
  },
  {
    name: '@electron-forge/maker-zip',
    platforms: ['darwin'],
  },
  {
    name: '@electron-forge/maker-deb',
    config: {
      options: {
        icon: iconPath,
      },
    },
  },
  {
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
