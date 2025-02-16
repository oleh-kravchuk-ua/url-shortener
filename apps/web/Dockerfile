FROM node:23.6-alpine AS build

RUN apk add --no-cache curl

WORKDIR /app

COPY ./apps/web/package*.json ./apps/web/pnpm-lock.yaml ./
COPY ./apps/web/tsconfig*.json ./tsconfig.*.json ./

RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile && \
    npm un -g pnpm

COPY ./apps/web/src ./src
COPY ./apps/web/public ./public

ARG NODE_ENV=prd
ARG PORT=3010
ENV NODE_ENV=${NODE_ENV} PORT=${PORT}

ENTRYPOINT ["/bin/sh", "/docker-entrypoint/entrypoint.sh"]