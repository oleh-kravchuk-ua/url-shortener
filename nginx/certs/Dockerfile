FROM alpine:latest

RUN apk update && \
    apk --no-cache add openssl

WORKDIR /certs

COPY bin/generate-certs.sh ./bin/

ARG SSL_DAYS=365
ARG SSL_SUBJECT=/CN=localhost
ARG SSL_FILE_KEY=./files/tls.key
ARG SSL_FILE_CERT=./files/tls.crt

ENV SSL_DAYS=${SSL_DAYS} \
    SSL_SUBJECT=${SSL_SUBJECT} \
    SSL_FILE_KEY=${SSL_FILE_KEY} \
    SSL_FILE_CERT=${SSL_FILE_CERT}

ENTRYPOINT ["sh", "./bin/generate-certs.sh"]