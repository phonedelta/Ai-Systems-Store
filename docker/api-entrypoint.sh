#!/bin/sh
set -e

mkdir -p /app/data

if [ ! -f /app/data/posts.json ]; then
  echo "Initializing blog database from seed..."
  cp /app/data-seed/posts.json /app/data/posts.json
fi

exec node server/index.js
