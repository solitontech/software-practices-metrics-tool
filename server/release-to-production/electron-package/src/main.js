import { app } from 'electron';
import { Application, ModuleImporter } from './utils/index.js';

Application.handleAppStartUpDueToInstaller();

app.on('ready', async () => {
  await ModuleImporter.importModules();

  const port = await ModuleImporter.getPort();

  Application.createWindow(port);
});
