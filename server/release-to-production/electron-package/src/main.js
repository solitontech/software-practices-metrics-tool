import { app, BrowserWindow, Menu } from 'electron';
import electronSquirrelStartup from 'electron-squirrel-startup';
import { fileURLToPath, format } from 'url';
import { dirname } from 'path';

if (process.argv.includes('--electron-forge-start')) {
  import('./../../../src/index.js').then();
} else {
  import('./../src/index.js').then();
}

// Get the directory of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

if (electronSquirrelStartup) {
  app.quit();
}

let mainWindow;

function createWindow() {
  const port = 3000; // This should be the same port your Express app is listening on

  mainWindow = new BrowserWindow({
    width: 1500,
    height: 900,
    icon: __dirname + './assets/media/tech-force-logo.ico',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    format({
      pathname: `localhost:${port}`,
      protocol: 'http:',
      slashes: true,
    })
  );

  const menuTemplate = [
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

  // Build the menu from the template and set it as the application menu
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);
