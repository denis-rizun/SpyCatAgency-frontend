#!/bin/sh

set -e
cd /app

if [ -f .env ]; then
  set -a
  . ./.env
  set +a
fi

echo "[NEXTJS]: Running..."
next start --hostname="0.0.0.0" --port="${INNER_FRONTEND_PORT}"

