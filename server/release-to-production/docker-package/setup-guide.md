# Setup Guide

## Prerequisites

1. If you are already using `software practices metrics tool` earlier version
   delete the older docker container & the docker image.

2. Make sure you are aware of your Azure organization, project, repository,
   & target branch and add these details in the `server-config.json` file.
   You can get the `server-config.json` details as described [here](https://github.com/solitontech/software-practices-metrics-tool/blob/main/server/README.md/#configure-server-configuration-file).

3. Make sure you have Git Bash installed; if not, you can download and install
   it from [git](https://git-scm.com/downloads).

## Launching Metrics Tool Using Docker

1. Check whether docker is installed (`$  docker --help`) & ensure docker daemon
   is running (`$ docker ps`).

2. If you have installed docker desktop & docker daemon is running skip step 3
   and go to step 4.

3. If Docker is not installed you can install from [Rancher Desktop](https://rancherdesktop.io/).

   1. After downloading Rancher desktop, double click on msi file and follow the
   instructions on the installation wizard and proceed with the install.

   2. Restart your PC and open Rancher desktop & deselect `Kubernetes` & make
   sure you selected `dockerd`, proceed with further steps.

   3. Check whether docker is installed (`$  docker --help`).

   4. Wait for few minutes (around 2mins) after opening Rancher desktop to initialize.

   5. Ensure docker daemon is running with command (`$ docker ps`). If docker
   daemon is not running open Rancher desktop application.

4. Ensure `server-config.json`, `software-practices-metrics-tool.tar`, `compose.yml`
   and `load-metrics-tool.sh` files are in same directory.

5. Update the `server-config.json` file with relevant details.

6. Run `load-metrics-tool.sh` script in git bash (`$ ./load-metrics-tool.sh`), the
   script will build the docker container & the metrics tool application will
   started at [http://localhost:3498](http://localhost:3498).

7. In case your host's port 3498 is occupied, you can specify a different port
   in `compose.yaml` file.

8. Use below commands to re-run or stop the container using terminal, and ensure
   you are in the compose.yml file directory location.

   1. To start docker container

      ```bash
      $ docker compose start
      ✔ Container software-practices-metrics-tool  Started
      ```

   2. To stop docker container

      ```bash
      $ docker compose stop
      ✔ Container software-practices-metrics-tool  Stopped
      ```

   3. To restart docker container

      ```bash
      $ docker compose restart
      ✔ Container software-practices-metrics-tool  Started
      ```

## Optional Configuration in server-config.json File

Please refer this [guide](https://github.com/solitontech/software-practices-metrics-tool/blob/main/server/README.md/#optional-configurations-in-server-configjson-file)
to know about how to configure optional squads field.

### Note

After configuring optional configuration, restart the container.

## Optional Docker Commands Reference

1. Listing docker containers

   ```bash
   docker ps -a
   ```

2. Destroying a docker container (when compose.yaml file is used)

   ```bash
   docker compose down
   ```

3. Viewing container logs

   ```bash
   docker logs <container-name>
   ```
