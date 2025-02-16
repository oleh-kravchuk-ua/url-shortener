import type { Express } from "express";

import { healthcheck } from "./helthcheck";
import { notFound } from "./not-found";
import { root } from "./root";

import { urlsRouter } from "./urls";

export const setupRouting = (app: Express) => {
  root(app);
  healthcheck(app);

  app.use("/api/urls", urlsRouter);

  notFound(app);
};
