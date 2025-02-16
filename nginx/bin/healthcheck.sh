#!/bin/sh
set -e

# Make request silently, save response and status
curl -fk "https://localhost/healthcheck/live"