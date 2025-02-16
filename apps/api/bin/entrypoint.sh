#!/bin/sh

set -e

set -x

NODE_ENV=${NODE_ENV:-prd}
echo "Backend APP starting in $NODE_ENV mode ..."

if [ "$NODE_ENV" = "prd" ] || [ "$NODE_ENV" = "prod" ] || [ "$NODE_ENV" = "production" ]; then
  npm run start:watch
else
  npm run start:watch
fi

if [ $? -ne 0 ]; then
  echo "Backend APP start failed"
  exit 1
fi

set +x
