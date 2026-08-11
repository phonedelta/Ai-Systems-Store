#!/bin/sh
set -e

PORT="${PORT:-80}"
API_UPSTREAM="${API_UPSTREAM:-127.0.0.1:3005}"
BLOG_API_PORT="${BLOG_API_PORT:-3005}"
export PORT API_UPSTREAM BLOG_API_PORT

mkdir -p /app/data /run/nginx /var/log/nginx /var/cache/nginx /var/lib/nginx/tmp /etc/nginx/http.d

if [ ! -f /app/data/posts.json ]; then
  echo "Initializing blog database from seed..."
  cp /app/data-seed/posts.json /app/data/posts.json
fi

envsubst '${PORT} ${API_UPSTREAM}' \
  < /etc/nginx/templates/default.conf.template \
  > /etc/nginx/http.d/default.conf

echo "Starting Blog API on :${BLOG_API_PORT}"
node /app/server/index.js &
API_PID=$!

i=0
until wget -qO- "http://127.0.0.1:${BLOG_API_PORT}/api/health" >/dev/null 2>&1; do
  i=$((i + 1))
  if [ "$i" -gt 40 ]; then
    echo "API failed to start"
    kill "$API_PID" 2>/dev/null || true
    exit 1
  fi
  sleep 0.5
done

echo "Starting Nginx on :${PORT} (API upstream ${API_UPSTREAM})"
trap 'kill $API_PID 2>/dev/null || true' TERM INT
exec nginx -g 'daemon off;'
