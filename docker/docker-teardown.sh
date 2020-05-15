# Docker teardown..
echo "Stopping and removing ALL docker containers"
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)

echo "Performing docker system prune"
docker system prune

echo "Removing all docker images"
docker rmi $(docker images -q)

echo "To rebuild via docker compose, run 'docker-compose up --build'"
