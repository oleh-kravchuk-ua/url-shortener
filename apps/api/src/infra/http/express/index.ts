import express from "express";
import type { Express } from "express";

import { setupErrorHandler } from "$api/error-handler";
import { setupRouting } from "$api/routes";
import { setupMiddlewares } from "./middlewares";

export const createApp = (): Express => {
  const app = express();

  setupMiddlewares(app);
  setupRouting(app);
  setupErrorHandler(app);

  return app;
};
