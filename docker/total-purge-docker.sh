#!/bin/bash
# This script removes pretty much ALL docker things.

echo "Are you sure that you want to purge all of the docker things?"
read -p "Containers, Images, and Data volumes deleted with 'Y' followed by [ENTER]: " confirmm

if [ "$confirmm" = "y" ] || [ "$confirmm" = "Y" ]; then
  echo "OK let's purge it all!"
  echo "Stopping and removing ALL docker containers"
  docker stop $(docker ps -a -q)
  docker rm $(docker ps -a -q)

  echo "Performing docker system prune"
  docker system prune

  echo "Removing all docker images"
  docker rmi $(docker images -q)

  echo "Purging ALL the Mysql / other data volumes"
  docker volume prune

  echo "To rebuild via docker compose, run 'docker-compose up --build'"
else
  echo "Exiting now and removing nothing."
fi