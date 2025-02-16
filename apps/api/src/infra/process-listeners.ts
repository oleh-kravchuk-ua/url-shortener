import { shutdown } from "./graceful-shutdown";

import { logger } from "$infra/logger";
import { isProduction } from "./config/enviroment";

const unhandled = (eventName: string) => {
  process.on(eventName, (error: Error) => {
    logger.withPrefix(`[${eventName}]`).withError(error).error(eventName);
    if (isProduction) process.exit(1);
  });
};

["uncaughtException", "unhandledRejection"].forEach(unhandled);

const onSignalExit = (signal: string) =>
  process.on(signal, async () => {
    await shutdown(signal);

    logger.withPrefix(`[${signal}]`).info(`The service is stopped with a signal: ${signal} `);

    process.exit(0);
  });

["SIGINT", "SIGTERM"].forEach(onSignalExit); // SIGINT - `Ctrl-C`, SIGTERM - `kill -14`

const onWarning = (eventName: string) =>
  process.on(eventName, (warning: Error) => {
    logger.withPrefix(`[${eventName}]`).withError(warning).warn("Catched warning");
  });

["warning"].forEach(onWarning);

const onExit = (signal: string) =>
  process.on(signal, async () => {
    logger.withPrefix(`[${signal}]`).info(`The service node is exited. The signal '${signal}' is called`);
  });

["beforeExit", "exit"].forEach(onExit);
