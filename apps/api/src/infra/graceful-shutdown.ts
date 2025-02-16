import { promisify } from "node:util";

import { httpServer } from "$infra/http/server";
import { logger } from "$infra/logger";

import { orm } from "$infra/micro-orm";

const delay = promisify(setTimeout);

const PREFIX = "[exit]";

export const shutdown = async (signal?: string): Promise<void> => {
  logger.withPrefix(PREFIX).info(`Graceful shutdown has started${signal ? ` with a signal: ${signal}` : ""}`);

  try {
    await Promise.all([
      Promise.resolve(httpServer?.close()).then(() => {
        logger.withPrefix(PREFIX).info("Closed API (stop processing ingress)");
      }),
    ]);

    await delay(50);

    await Promise.all([
      orm?.close(true).then(() => {
        logger.withPrefix(PREFIX).info("DB connection has closed");
      }),
    ]);

    logger.withPrefix(PREFIX).info("The service has gracefully stopped");
    process.exit(0);
  } catch (shutdownError) {
    logger.withError(shutdownError).error("Error on graceful shutdown of the service");
    process.exit(1);
  } finally {
    logger.info("Gracefull shutdown has completed");
  }
};
