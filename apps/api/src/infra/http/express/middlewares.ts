import type { Express } from "express";
import express from "express";

import helmet from "helmet";
import { cors } from "./cors";
import { morgan } from "./morgan";
import { rateLimiter } from "./rate-limiter";

export const setupMiddlewares = (app: Express) => {
  app.set("trust proxy", true);

  app.use(cors); // Before helmet
  app.use(helmet());

  app.use(morgan);

  app.use(rateLimiter);

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
};
