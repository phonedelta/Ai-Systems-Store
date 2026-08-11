#!/bin/sh
set -e

mkdir -p /app/data
mkdir -p "${RAILWAY_VOLUME_MOUNT_PATH:-/data}/blog-images" 2>/dev/null || true

if [ ! -f /app/data/posts.json ]; then
  echo "Initializing blog database from seed..."
  cp /app/data-seed/posts.json /app/data/posts.json
fi

echo "Starting server on PORT=${PORT:-8080} (0.0.0.0)"
echo "Volume mount: ${RAILWAY_VOLUME_MOUNT_PATH:-/data}"
exec node server/index.js
