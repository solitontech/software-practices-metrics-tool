import { app } from 'electron';
import { Application, ModuleImport } from './setup/index.js';

Application.handleAppStartUpDueToInstaller();

app.on('ready', async () => {
  await ModuleImport.importServerModules();

  const port = ModuleImport.serverPort;

  Application.createWindow(port);
});
