# Docker commands

## Frequently used commands

1. Building the docker image

   ```bash
   docker build -t <image-name>:<version> .
   ```

2. Creating a docker container

   ```bash
   docker run -d --name <container-name> <image-name>:<version>
   ```

3. Listing docker containers

   ```bash
   docker ps -a
   ```

4. Listing active docker containers

   ```bash
   docker ps
   ```

5. Re-run or stop the container using terminal

   ```bash
   docker compose start
   ```

   ```bash
   docker compose stop
   ```

## Managing docker containers

1. Stopping a docker container

   ```bash
   docker stop <container-name>
   ```

2. Starting a docker container

   ```bash
   docker start <container-name>
   ```

3. Destroying a docker container

   ```bash
   docker rm <container-name>
   ```

4. Destroying a docker container (when compose.yaml file is used)

   ```bash
   docker compose down
   ```

## Additional Docker Tips

1. Viewing container logs

   ```bash
   docker logs <container-name>
   ```

2. Removing docker images

   ```bash
   docker image rm <image-name>:<version>
   ```
