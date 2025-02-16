FROM node:23.6-alpine

RUN apk add --no-cache curl

WORKDIR /app

ARG API_PORT=3000
ARG NODE_ENV=prd
ENV NODE_ENV=${NODE_ENV} API_PORT=${API_PORT}

# Copy package manifests
COPY ./apps/api/package.json ./apps/api/pnpm-lock.yaml ./
# Copy all tsconfig files in one layer
COPY ./apps/api/tsconfig.json ./tsconfig.*.json ./

# To speed up installation process of deps, pnpm is used instead of npm
RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile && \
    npm un -g pnpm && \
    sed -i 's|"extends": "../../tsconfig.base.json"|"extends": "./tsconfig.base.json"|' tsconfig.json

COPY ./apps/api/src ./src
# App entrypoint script to start the server (in case of PROD env)
COPY ./apps/api/index.js ./

EXPOSE ${API_PORT}

ENTRYPOINT ["/bin/sh", "/docker-entrypoint/entrypoint.sh"]