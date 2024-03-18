import { spawnSync } from 'child_process';

export class ExecuteTerminalCommand {
  static runCommand(command, args) {
    spawnSync(command, args, { stdio: 'inherit', shell: true });
  }

  static copyDirectory(source, destination) {
    // /E - Copies directories and subdirectories, including empty ones.
    // /I - If destination does not exist and copying more than one file, assumes that destination must be a directory.
    this.runCommand('xcopy', [source, destination, '/E', '/I']);
  }

  static deleteDirectories(directories) {
    // /s - Removes all directories and files in the specified directory in addition to the directory itself.
    // /q - Specifies quiet mode. Do not ask if you want to delete a directory.
    this.runCommand('rd', ['/s', '/q', ...directories]);
  }
}
