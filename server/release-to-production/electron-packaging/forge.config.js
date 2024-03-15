import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';
import { fileURLToPath, format } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const packagerConfig = {
  asar: true,
  icon: join(__dirname, 'src/assets/media/tech-force-logo.ico'),
};

export const rebuildConfig = {};

export const makers = [
  {
    name: '@electron-forge/maker-squirrel',
    config: {
      setupIcon: join(__dirname, 'src/assets/media/tech-force-logo.ico'),
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
        icon: join(__dirname, 'src/assets/media/tech-force-logo.ico'),
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
