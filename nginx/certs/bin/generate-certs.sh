#!/bin/sh

SSL_DAYS=${SSL_DAYS:-365}
SSL_SUBJECT=${SSL_SUBJECT:-"/CN=localhost"}
SSL_FILE_KEY=${SSL_FILE_KEY:-"files/tls.key"}
SSL_FILE_CERT=${SSL_FILE_CERT:-"files/tls.crt"}

# Generate a self-signed certificate with a general subject
openssl req -x509 \
  -newkey rsa:2048 \
  -keyout "./${SSL_FILE_KEY}" \
  -out "./${SSL_FILE_CERT}" \
  -days ${SSL_DAYS} \
  -nodes \
  -subj "${SSL_SUBJECT}" > /dev/null 2>&1