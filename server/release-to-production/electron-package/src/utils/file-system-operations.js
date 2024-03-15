import { spawnSync } from 'child_process';

export class FileSystemOperations {
  static runCommand(command, args) {
    spawnSync(command, args, { stdio: 'inherit', shell: true });
  }

  static copyDirectory(source, destination) {
    this.runCommand('xcopy', [source, destination, '/E', '/I']);
  }

  static copyFile(source, destination) {
    this.runCommand('xcopy', [source, destination]);
  }

  static deleteDirectories(directories) {
    this.runCommand('rd', ['/s', '/q', ...directories]);
  }
}
