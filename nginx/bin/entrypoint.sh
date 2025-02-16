#!/bin/sh

set -e

# Replace environment variables in config templates
envsubst '$$API_HOSTNAME $$API_PORT $$SSL_FILE_KEY $$SSL_FILE_CERT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
envsubst '$$SSL_FILE_KEY $$SSL_FILE_CERT' < /etc/nginx/conf.d/ssl.conf.template > /etc/nginx/conf.d/ssl.conf

exec "$@"