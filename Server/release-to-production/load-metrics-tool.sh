#!/bin/bash

echo -e "\nDocker image is loading..."

docker load -i software-practices-metrics-tool.tar
if [ $? -ne 0 ]; then
  echo -e "\nError during loading image."
  exit 1
fi

echo -e "\nDocker image loaded successfully."
echo -e "\nDocker container is creating..."

docker compose up -d
if [ $? -ne 0 ]; then
  echo -e "\nError during Docker build."
  exit 1
fi

echo -e "\nDocker container created successfully."
echo -e "\nMetrics tool is running in http://localhost:3000."