#!/bin/sh

docker pull localhost:4000/raketa/web_app:latest;
docker service update --image localhost:4000/raketa/web_app:latest raketa_web_app;
sh ./scripts/docker/prune-old.sh;
