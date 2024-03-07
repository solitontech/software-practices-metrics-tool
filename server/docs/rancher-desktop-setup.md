# Rancher desktop setup

1. If docker is not installed, download [Rancher](https://rancherdesktop.io/) to
   use Docker.

2. After downloading, double-click Rancher.Desktop.Setup.msi to run the installer.

3. Follow the instructions on the installation wizard to authorize the installer
   and proceed with the install.

4. If using Rancher solely for our tool, deselect Kubernetes during installation.

5. Restart your PC and open Rancher, allowing it to install dependencies.

6. To check whether the docker is successfully installed. Run below command

   ```bash
   docker --help
   ```

7. Make sure the docker daemon is running in the background. Run below command
   to verify

   ```bash
   docker ps
   ```

## Note

1. If using Docker, avoid pushing the tool image to public Docker Hub repositories.

2. The Docker daemon runs in the background, allowing terminal commands even when
   the application is closed.
