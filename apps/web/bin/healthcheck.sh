#!/bin/sh

set -e

PORT=${PORT:-3000}

# Make request silently, save response and status
response=$(curl -s -w "\n%{http_code}" --retry 5 --retry-delay 2 -f "http://127.0.0.1:${PORT}")

# Check the output with:
# ```sh
# docker inspect --format='{{json .State.Health}}' url-shortener-web | jq
#

set -x
echo "$response"
set +x

# Get status from last line
status=$(echo "$response" | tail -n1)

# Check HTTP status
[ "$status" = "200" ] || exit 1

# All checks passed
exit 0