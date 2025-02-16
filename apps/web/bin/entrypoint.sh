#!/bin/sh

set -e

set -x

NODE_ENV=${NODE_ENV:-prd}
PORT=${PORT:-3000}

echo "Frontend APP starting in $NODE_ENV mode ..."

if [ "$NODE_ENV" = "prd" ] || [ "$NODE_ENV" = "prod" ] || [ "$NODE_ENV" = "production" ]; then
  npm run build

  # Use this way with an INGRESS proxy (NGinx or another solution)

else
  PORT=${PORT} npm start
fi

if [ $? -ne 0 ]; then
  echo "Frontend APP start failed"
  exit 1
fi

set +x
