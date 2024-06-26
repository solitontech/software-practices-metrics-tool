# Compose file manual

```yaml
services:
  # List all the services (containers) under services

  server: # The service name for the container.
    container_name: container_name
    # The desired name for the Docker container.

    image: image-name:version
    # Specify the Docker image and its version/tag to use for the container.
    # Ex: software-practices-metrics-tool:1.0.0

    ports:
      - 3498:3498
      # Maps `host port: container port`.

    volumes:
      #Volumes are the preferred mechanism for persisting data generated by and used by Docker containers.

      - ./server-config.json:/user/app/server/src/configs/server-config.json

      # Here we are using volumes to retrieve configuration json data provided by user when the container is booting up.
```

Note:

- Please refer
  [docker compose documentation](https://docs.docker.com/get-started/08_using_compose/)
  for more information.

- Use [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml)
  extension for formatting yaml files.
