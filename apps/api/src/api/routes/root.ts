import type { Express } from "express";

import * as HealthcheckController from "$controller/healthcheck";

import { getFnValidateRequest } from "$api/validation/request";

export const root = (app: Express) => {
  app.get("/", getFnValidateRequest("GET"), HealthcheckController.live);
};
