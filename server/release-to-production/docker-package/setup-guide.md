# Setup Guide

## Prerequisites

1. If you are already using `software practices metrics tool` earlier version
   delete the older docker container & the docker image.

2. Make sure you are aware of your Azure organization, project, repository,
   & target branch and add these details in the `server-config.json` file.
   You can get the `server-config.json` details as described [here](https://github.com/solitontech/software-practices-metrics-tool/blob/main/server/README.md/#steps-to-find-out-azure-repo-details).

3. Ensure you possess a valid Azure token, otherwise create one by following the
   steps below.

4. Make sure you have Git Bash installed; if not, you can download and install
   it from [git](https://git-scm.com/downloads).

## Steps to Create Azure Devops Token

1. Sign up to [Azure Devops](https://dev.azure.com/).

2. Find Personal access tokens in `user settings` (beside profile picture).

3. Click on `Personal access tokens`.

4. Create new Token by clicking on `New Token`.

5. Enter a name for your token.

6. Choose the `organization` where you want to use the token.

7. Set the expiration for token, select the scope as `Custom defined`
   and tick(mark as selected) for `Read` under `Code` scope.

8. Click on `Create`.

9. Ensure to copy and save the token value as **it won't be recoverable if lost.**

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

## Using Squads in server-config.json File

1. Please refer [Steps to get developer uuid](#steps-to-get-developer-uuid) &
   [Steps to get reviewer uuid](#steps-to-get-reviewer-uuid) to know how to get
   the uuids using the metrics tool before starting with below steps.

2. Update squads in `server-config.json` with relevant details for filtering in
   the application. Refer below format.

    ```json
    squads:[
      {
         "squadName": "Squad_name",
         "developers": {
            "9e1413a9-2b7c-6556-b441-e1eabfed5d43": "Developer_name_1",
            "9c1413b9-2b7c-8767-c252-e2eacfed5f43": "Developer_name_2"
         },
         "reviewers": {
            "4c56f2d9-f179-65fd-af3d-0650c183e580": "Reviewer_name"
         }
      }
    ]
    ```

3. Ensure entering unique squad name to avoid confusion. And enter the details
   of developers and reviewers as key value pairs specified in the
   below format.

    - `developer_uuid (or) reviewer_uuid : developer_name (or) reviewer_name`

4. After applying filters in the json file. If your container is already running
   restart it using below command.

      ```bash
         $ docker compose restart
         ✔ Container software-practices-metrics-tool  Started
      ```

### Steps to get developer uuid

1. Open the application & got to code review page.

2. Go to the `Author` column of the code review metrics table.

3. Hover over the any one of the author name to see the author name and their uuid

4. Click on the author name to copy the author name and uuid to the clipboard.

5. Copy and paste the name & uuid in `server-config.json` in specified format.

### Steps to get reviewer uuid

1. Open the application & got to code review page.

2. Check in votes history timeline or current votes timeline to open the dialog modal
   for reviewers.

3. Go to the `Reviewed By` column of the votes timeline table.

4. Hover over the any one of the reviewer name to see the name and their uuid.

5. Click on the reviewer name to copy the reviewer name and uuid to the clipboard.

6. Copy and paste the name & uuid in `server-config.json` in specified format.

### Note

1. Squads are useful when you are working on large repository with a high volume
   of pull requests or you are finding it difficult to search your team pull requests.

2. Squads are optional configuration.

3. In a squad, reviewers are not required fields, while at least one developer
   is mandatory. Refer below format.

   ```json
   squads:[
     {
        "squadName": "Squad_name",
        "developers": {
           "9e1413a9-2b7c-6556-b441-e1eabfed5d43": "Developer_name"
        }
     }
   ]
   ```

4. If you set reviewers for squads and select them in the application, only
   pull requests containing those reviewers will be filtered.

5. A reviewer is recognized as such for a pull request only if they've given any
   vote on it.

6. Ensure you enter same name for developers & reviewers section in the
   `server-config.json` which will be displayed in the dashboard to avoid confusion.

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
