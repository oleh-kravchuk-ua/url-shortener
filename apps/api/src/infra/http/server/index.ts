import http from "node:http";
import type { Server as HttpServer } from "node:http";

import type { Express } from "express";

import { PORT } from "$config/enviroment";
import { logger } from "$infra/logger";

import { KEEP_ALIVE_TIMEOUT, options } from "./config";

let httpServer: HttpServer | undefined;

export const startHttpServer = (app: Express): HttpServer => {
  const server = http.createServer(options, app);
  server.headersTimeout = KEEP_ALIVE_TIMEOUT + 5000;

  try {
    httpServer = server.listen(PORT);

    logger.info(`HTTP Server listening on port ${PORT}`);

    return httpServer;
  } catch (error) {
    logger.error("Failed to start HTTP-server");
    throw error;
  }
};

export { httpServer };
