#!/bin/sh
set -e

mkdir -p /app/data

if [ ! -f /app/data/posts.json ]; then
  echo "Initializing blog database from seed..."
  cp /app/data-seed/posts.json /app/data/posts.json
fi

echo "Starting server on PORT=${PORT:-8080} (0.0.0.0)"
exec node server/index.js
