#!/bin/sh

docker run \
  -d --rm \
  -p 8081:8081 \
  -v $(pwd):/app \
  --name mdserver \
  --entrypoint "/app/bin/startup.sh" \
  node