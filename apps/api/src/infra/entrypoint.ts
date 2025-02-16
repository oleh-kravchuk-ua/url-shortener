import { connectDB } from "$infra/micro-orm";

import { createApp } from "$infra/http/express";
import { startHttpServer } from "$infra/http/server";
import { logger } from "$logger";

async function bootstrap() {
  await Promise.all([
    connectDB(),
    // Another infra connections can be added here
  ]);

  const app = createApp();
  return startHttpServer(app);
}

bootstrap().catch((error) => {
  logger.withError(error).fatal("Failed to bootstrap application");

  process.exit(1);
});
