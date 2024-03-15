import { app, BrowserWindow, Menu } from 'electron';
import electronSquirrelStartup from 'electron-squirrel-startup';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export class Application {
  static currentDirname = dirname(fileURLToPath(import.meta.url));

  static browserWindowConfig = {
    icon: join(this.currentDirname, '../assets/media/tech-force-logo.ico'),
  };

  static menuTemplate = [
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
    const window = new BrowserWindow(this.browserWindowConfig);

    window.loadURL(`http://localhost:${port}`);

    window.maximize();

    Menu.setApplicationMenu(Menu.buildFromTemplate(this.menuTemplate));

    // delete window object when window closed to avoid memory leaks
    window.on('closed', () => {
      window = null;
    });
  }

  static handleAppStartUpDueToInstaller() {
    if (electronSquirrelStartup) {
      app.quit();
    }
  }
}
