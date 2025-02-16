#!/bin/sh
set -e

PORT=${PORT:-3000}

# Make request silently, save response and status
response=$(curl -s -w "\n%{http_code}" --retry 5 --retry-delay 2 -f "http://127.0.0.1:${PORT}/healthcheck/ready")

# Check the output with:
# ```sh
# docker inspect --format='{{json .State.Health}}' url-shortener-api | jq
#

set -x
echo "$response"
set +x

# Get status from last line
status=$(echo "$response" | tail -n1)
# Get JSON from all but last line
json=$(echo "$response" | sed '$d')

# Check HTTP status
[ "$status" = "200" ] || exit 1

# Check success field
echo "$json" | grep -q '"success":true' || exit 1

# All checks passed
exit 0