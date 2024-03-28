import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import electron from 'electron';
import electronSquirrelStartup from 'electron-squirrel-startup';

const { app, BrowserWindow, Menu } = electron;

export class Application {
  static #currentDirname = dirname(fileURLToPath(import.meta.url));
  static #hostDomain = 'http://localhost';

  static #browserWindowConfig = {
    icon: path.join(this.#currentDirname, '../assets/media/tech-force-logo.ico'),
  };

  static #menuTemplate = [
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
  ];

  static createWindow(port) {
    let window = new BrowserWindow(this.#browserWindowConfig);

    Menu.setApplicationMenu(Menu.buildFromTemplate(this.#menuTemplate));
    window.loadURL(`${this.#hostDomain}:${port}`);

    window.maximize();

    // delete window object when window closed to avoid memory leaks
    window.on('closed', () => {
      window = null;
    });
  }

  // When app is started by installer due to update or installation, it should be closed
  static handleAppStartUpDueToInstaller() {
    if (electronSquirrelStartup) {
      app.quit();
    }
  }
}
